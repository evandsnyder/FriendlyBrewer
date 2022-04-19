import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Recipe } from 'src/app/_interfaces/recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  public recipe: Recipe;
  public _loaded: boolean = false;

  constructor(private _router: Router, private _repo: RepositoryService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    let routeSub = this._route.params.subscribe({
      next: params => {
        if (!params['id']){
          console.log("It seems we're having a hard time finding that recipe...")
          return;
        }
        let id = params['id'];
        let repoSub = this._repo.getData(`recipes/${id}`).subscribe({
          next: res => {
            this.recipe = res as Recipe;
            this._loaded = true;
          },
          complete: () =>{
            repoSub?.unsubscribe();
          }
        });
      },
      complete: () => {
        if (routeSub) routeSub.unsubscribe();
      }
    });
  }
}
