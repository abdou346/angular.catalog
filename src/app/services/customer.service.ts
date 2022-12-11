import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {ValidationErrors} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Customer} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {



  constructor(private http: HttpClient) {

  }

  public findAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>("http://localhost:8082/customers");
  }
  public deleteCustomer(customer: Customer) : Observable<boolean>{
    return this.http.delete<boolean>("http://localhost:8082/customers/" + customer.id);
  }

  public searchCustomer(keyword:string,customers:Array<Customer>):Observable<Array<Customer>>{
    let result = customers.filter(p=>p.name.toLowerCase().includes(keyword.toLowerCase()));
    return of(result)
  }

  public addNewCustomer(customer : Customer) : Observable<Customer>{
    return this.http.post<Customer>("http://localhost:8082/customers",customer);
  }

  public getCustomer(id : number) : Observable<Customer> {
    let product = this.http.get<Customer>("http://localhost:8082/customers/" + id)
    if(product == undefined) return throwError(()=> new Error("Product not found"));
    return product;
  }

  public getErrorMessage(fieldName: string, errors: ValidationErrors) {
    if(errors['required']) {
      return fieldName + " is Required";
    } else if (errors['min']){
      return fieldName + " should have at least a value of "+ errors['min']['min'];
    } else if (errors['minlength']){
      return fieldName + " should have at least "+ errors['minlength']['requiredLength']+" Characters";
    } else if (errors['email']){
      return "Please enter a valid "+ fieldName;
    }
    else return "";
  }

  public updateCustomer(customer : Customer) : Observable<Customer> {
    return this.http.put<Customer>("http://localhost:8082/customers/" + customer.id, customer);
  }

}
