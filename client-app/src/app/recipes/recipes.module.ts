import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse/browse.component';
import { CraftComponent } from './craft/craft.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeComponent } from './recipe/recipe.component';



@NgModule({
  declarations: [
    BrowseComponent,
    CraftComponent,
    RecipeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: BrowseComponent },
      { path: 'craft', component: CraftComponent, canActivate: [AuthGuard] },
      { path: ':id', component: RecipeComponent },
      { path: 'craft/:id', component: CraftComponent, canActivate: [AuthGuard] }
    ]),
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
})
export class RecipesModule { }
