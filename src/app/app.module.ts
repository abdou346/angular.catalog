import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './Product/products/products.component';
import { CustomersComponent } from './Customer/customers/customers.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { NewProductComponent } from './Product/new-product/new-product.component';
import { EditProductComponent } from './Product/edit-product/edit-product.component';
import {HttpClientModule} from "@angular/common/http";
import {EditCustomerComponent} from "./Customer/edit-customer/edit-customer.component";
import {NewCustomerComponent} from "./Customer/new-customer/new-customer.component";
import {BillsComponent} from "./bill/bills/bills.component";

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CustomersComponent,
    LoginComponent,
    AdminTemplateComponent,
    NewProductComponent,
    EditProductComponent,
    EditCustomerComponent,
    NewCustomerComponent,
    BillsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
