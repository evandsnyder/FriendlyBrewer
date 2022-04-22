import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
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
  private _loggedInUser?: User;

  constructor(private repository: RepositoryService, private _router: Router, private _auth: AuthenticationService) { }

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

    if (this._auth.isUserAuthenticated()) {
      let userSub: Subscription = this.repository.getData('users/me').subscribe({
        next: (r) => {
          this._loggedInUser = r as User;
        }
      });
    }
  }

  public onClick(id: string) {
    this._router.navigate([`recipes/${id}`]);
  }

  public toggleRecipeFavorite(id: string, event: Event) {
    event.stopPropagation();
    if (!this._auth.isUserAuthenticated()) {
      alert("You must be logged in to favorie a recipe!");
    }

    if(!this.isFavorited(id)){
      console.log("Favoriting recipe!");
      // Add this id to user's favorites
      // increment
    } else {
      console.log("Unfavoriting recipe!");
    }
  }

  public routeToProfile(id: string, event: Event) {
    event.stopPropagation();
    this._router.navigate([`profile/${id}`]);
  }

  public isFavorited(id: string): boolean {
    return this._auth.isUserAuthenticated() && this._loggedInUser?.favorites.some(r => r._id.$oid === id);
  }

  public getFavoritedIcon(id: string) {
    return this.isFavorited(id) ? 'star' : 'star_border';
  }
}
