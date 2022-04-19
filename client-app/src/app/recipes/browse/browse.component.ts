import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Recipe } from 'src/app/_interfaces/recipe.model';
import { User } from 'src/app/_interfaces/user.model';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  public _loading: boolean = true;
  public recipes: Recipe[];

  constructor(private repository: RepositoryService, private _router: Router) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  public loadRecipes = () => {
    let address: string = 'recipes'
    let repoSubscription: Subscription = this.repository.getData(address).subscribe({
      next: res => {
        console.log(res);
        this.recipes = res as Recipe[];
        this.recipes.forEach(recipe => {
          let sub: Subscription = this.repository.getData(`users/${recipe.created_by.$oid}`).subscribe({
            next: (response: any) => {
              recipe.created_by = response as User;
            },
            complete: () => {
              if (sub) sub.unsubscribe();
            }
          });
        });
      },
      complete: () => {
        if (repoSubscription) repoSubscription.unsubscribe();
        this._loading = false
      }
    })
  }

  public onClick(id: string) {
    console.log(`Rerouting to : ${id}`);
  }

  public toggleRecipeFavorite(id: string){
    console.log("Favoriting/Unfavoriting Recipe");
  }

  public routeToProfile(id: string){
    console.log(`routing to: profile/${id}`)
    this._router.navigate([`profile/${id}`]);
  }
}
