import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeComponent } from './me/me.component';
import { UserComponent } from './user/user.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes = [
  { path: 'me', component: MeComponent, canActivate: [AuthGuard] },
  { path: ':id', component: UserComponent }
];

@NgModule({
  declarations: [
    MeComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class ProfileModule { }
