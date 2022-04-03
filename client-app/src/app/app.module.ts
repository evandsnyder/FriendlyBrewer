import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { MaterialModule } from './material/material.module';
import { RoutingModule } from './routing/routing.module';
import { LayoutComponent } from './layout/layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { HomeComponent } from './home/home.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NotFoundComponent,
    HeaderComponent,
    HomeComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
