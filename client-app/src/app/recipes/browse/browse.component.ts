import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Recipe } from 'src/app/_interfaces/recipe.model';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  public _loading: boolean = true;
  public recipes: Recipe[];

  constructor(private repository: RepositoryService) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  public loadRecipes = () => {
    let address: string = 'recipes'
    this.repository.getData(address).subscribe(res => {
      this.recipes = res as Recipe[];
      this._loading = false
    })
  }
}
