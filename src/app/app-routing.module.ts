import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./Product/products/products.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {CustomersComponent} from "./Customer/customers/customers.component";
import {AuthenticationGuard} from "./gard/authentication.guard";
import {NewProductComponent} from "./Product/new-product/new-product.component";
import {EditProductComponent} from "./Product/edit-product/edit-product.component";
import {EditCustomerComponent} from "./Customer/edit-customer/edit-customer.component";
import {NewCustomerComponent} from "./Customer/new-customer/new-customer.component";
import {BillsComponent} from "./bill/bills/bills.component";

const routes: Routes = [

  {path:"login",component:LoginComponent},
  {path:"",component:LoginComponent},
  {path:"admin",component:AdminTemplateComponent,canActivate:[AuthenticationGuard],
    children:[
      {path:"customers",component:CustomersComponent},
      {path:"products",component:ProductsComponent},
      {path:"newProduct",component:NewProductComponent},
      {path:"editProduct/:id",component:EditProductComponent},
      {path : "newCustomer", component : NewCustomerComponent},
      {path : "editCustomer/:id", component : EditCustomerComponent},
      {path : "bills", component : BillsComponent},
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
