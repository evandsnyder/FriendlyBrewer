import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse/browse.component';
import { CraftComponent } from './craft/craft.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';



@NgModule({
  declarations: [
    BrowseComponent,
    CraftComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: BrowseComponent },
      { path: 'craft', component: CraftComponent, canActivate: [AuthGuard]}
    ])
  ]
})
export class RecipesModule { }
