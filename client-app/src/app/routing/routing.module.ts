import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../error-pages/not-found/not-found.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  { path: 'recipes', loadChildren: () => import('../recipes/recipes.module').then(m => m.RecipesModule) },
  { path: 'authentication', loadChildren: () => import('.././authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
