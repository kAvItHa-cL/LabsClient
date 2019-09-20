import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FlashMessagesModule } from 'ngx-flash-messages';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PrototypeComponent } from './components/prototype/prototype.component';
import { PrototypeService } from './services/prototype.service';
import { LoginComponent } from './components/login/login.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { RequestLabComponent } from './components/request-lab/request-lab.component';
import { LoginService } from './services/login.service';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { ProductCatalogService } from './services/product-catalog.service';
import { ProductCatalogComponent } from './components/product-catalog/product-catalog.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    PrototypeComponent,
    LoginComponent,
    RequestLabComponent,
    ProductCatalogComponent,
    ProductCategoryComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    ButtonsModule,
    FlashMessagesModule,
    RouterModule .forRoot([

      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'product-category', component: ProductCategoryComponent },
      { path: 'requestLab', component: RequestLabComponent },
      { path: 'product-catalog/:id', component:  ProductCatalogComponent},
      { path: 'home', component: HomeComponent },
      { path: 'prototype', component: PrototypeComponent },
     
      { path: '**', redirectTo: 'login' }
  ])
  ],
  providers: [PrototypeService,LoginService,ProductCatalogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
