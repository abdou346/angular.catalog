import {Component, OnInit} from '@angular/core';

import {CustomerService} from "../../services/customer.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {Customer} from "../../model/customer.model";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{

  customers! : Array<Customer>;
  errorMessage! : string;
  searchFormGroup! : FormGroup;
  currentAction : string = "all";

  constructor(private customerService : CustomerService,
              private formBuilder : FormBuilder,
              public authService : AuthenticationService,
              private router : Router
  ) { }

  ngOnInit(): void {
    this.getAllCustomers();
    this.searchFormGroup = this.formBuilder.group({
      keyword : this.formBuilder.control(null)
    });
  }

  getAllCustomers() : void {
    this.customerService.findAll().subscribe((data) => {
      // @ts-ignore
      this.customers = data["_embedded"]["customers"];
    });
  }

  handleDeleteCustomer(c: Customer) {
    let conf = confirm("Are you sure?");
    if(!conf) return;
    this.customerService.deleteCustomer(c).subscribe({
      next : () => {
        this.getAllCustomers();
      },
      error : err => {
        this.errorMessage = err;
      }
    });
  }

  handleSearchCustomers() {
    this.currentAction = "search";
    let keyword = this.searchFormGroup.value.keyword;
    if (keyword==""){
      this.getAllCustomers();
    } else {
      this.customerService.searchCustomer(keyword,this.customers).subscribe({
        next:(data)=>{
          this.customers = data;
        }
      });
    }
  }

  handleNewCustomer() {
    this.router.navigateByUrl("/admin/newCustomer").then( () => {
    });
  }

  handleEditCustomer(c: Customer) {
    this.router.navigateByUrl("/admin/editCustomer/" + c.id).then( ()  =>{
    });
  }

}
