import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Recipe } from 'src/app/_interfaces/recipe.model';

@Component({
  selector: 'app-craft',
  templateUrl: './craft.component.html',
  styleUrls: ['./craft.component.scss'],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ]
})
export class CraftComponent implements OnInit {
  public craftForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean;

  public grains: FormArray;
  public hops: FormArray;
  public instructions: FormArray;
  public yeast: FormGroup;

  constructor(private _repository: RepositoryService, private formBuilder: FormBuilder, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    // IS THERE AN ID....????
    let routeSub = this._route.params.subscribe({
      next: params => {
        if (params['id']) console.log(params['id']);
        //
      },
      complete: () => {
        if (routeSub) routeSub.unsubscribe();
      }
    });

    this.craftForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      grains: new FormArray([
        new FormGroup({
          name: new FormControl(),
          amount: new FormControl()
        })
      ]),
      hops: new FormArray([
        new FormGroup({
          name: new FormControl(),
          phase: new FormControl(),
          time: new FormControl(),
          amount: new FormControl()
        })
      ]),
      instructions: new FormArray([new FormControl()]),
      yeast: new FormGroup({
        name: new FormControl(),
        targetTemp: new FormControl()
      }),
    });

    this.hops = this.craftForm.get('hops') as FormArray;
    this.grains = this.craftForm.get('grains') as FormArray;
    this.instructions = this.craftForm.get('instructions') as FormArray;
    this.yeast = this.craftForm.get('yeast') as FormGroup;
  }

  public loadRecipe(id: any): void {
    // gotta load this one from the server...
    // and then populate the recipe..
  }

  public addHop() {
    this.hops.push(
      new FormGroup({
        name: new FormControl(),
        phase: new FormControl(),
        time: new FormControl(),
        amount: new FormControl()
      })
    );
  }

  public addGrain() {
    this.grains.push(new FormGroup({
      name: new FormControl(),
      amount: new FormControl()
    }))
  }

  public addStep(): void {
    this.instructions.push(new FormControl());
  }

  public submitRecipe = () => {
    const newRecipe: Recipe = { ...(this.craftForm.value) };

    // need to remove null attributes..

    let sub: Subscription = this._repository.postData('recipes', JSON.stringify(newRecipe)).subscribe({
      next: (res: any) => {
        console.log(res);
        this._router.navigate(['/recipes']);
      },
      complete: () => {
        if(sub) sub.unsubscribe();
      }
    });
  }


  public cancel() {
    this._router.navigate(['/recipes'])
  }

}
