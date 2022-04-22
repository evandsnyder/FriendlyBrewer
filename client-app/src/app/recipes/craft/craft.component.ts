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

  public _loaded: boolean = false;
  public recipeId: string = '';
  constructor(private _repository: RepositoryService, private formBuilder: FormBuilder, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    // IS THERE AN ID....????
    let routeSub = this._route.params.subscribe({
      next: params => {
        if (params['id']) {
          this.recipeId = params['id'];
          let recSub = this._repository.getData(`recipes/${params['id']}`).subscribe({
            next: (res) => {
              let recipe = res as Recipe;
              this.craftForm = new FormGroup({
                name: new FormControl(recipe.name),
                description: new FormControl(recipe.description),
                grains: new FormArray(recipe.grains.map((grain) => {
                  return new FormGroup({
                    name: new FormControl(grain.name),
                    amount: new FormControl(grain.amount)
                  });
                })),
                hops: new FormArray(recipe.hops.map((hop) => {
                  return new FormGroup({
                    name: new FormControl(hop.name),
                    phase: new FormControl(hop.phase),
                    time: new FormControl(hop.time),
                    amount: new FormControl(hop.amount)
                  })
                })),
                instructions: new FormArray(recipe.instructions.map((step) => { return new FormControl(step) })),
                yeast: new FormGroup({
                  name: new FormControl(recipe.yeast.name),
                  targetTemp: new FormControl(recipe.yeast.targetTemp)
                }),
              });
              this.hops = this.craftForm.get('hops') as FormArray;
              this.grains = this.craftForm.get('grains') as FormArray;
              this.instructions = this.craftForm.get('instructions') as FormArray;
              this.yeast = this.craftForm.get('yeast') as FormGroup;
              this._loaded = true;
            },
            complete: () => {
              recSub?.unsubscribe();
            }
          });
        }
        else {
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
          this._loaded = true;
        }
      },
      complete: () => {
        routeSub?.unsubscribe();
      }
    });
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
    let destination = 'recipes';
    if (this.recipeId !== '') {
      destination = `recipes/${this.recipeId}`;
    }

    let sub: Subscription = this._repository.postData(destination, JSON.stringify(newRecipe)).subscribe({
      next: (res: any) => {
        console.log(res);
        this._router.navigate(['/recipes']);
      },
      complete: () => {
        if (sub) sub.unsubscribe();
      }
    });
  }


  public cancel() {
    this._router.navigate(['/recipes'])
  }

}
