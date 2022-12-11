import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProduct, Product} from "../model/product.model";
import {UUID} from "angular2-uuid";
import {ValidationErrors} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private products! : Array<Product>;
  constructor(private http: HttpClient) {

  }

  public findAll(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:8083/products");
  }

  public deleteProduct(product: Product) : Observable<boolean>{
    return this.http.delete<boolean>("http://localhost:8083/products/" + product.id);
  }
  public setPromotion(id:string): Observable<boolean>{
    let product = this.products.find(p=> p.id==id);
    if(product!=undefined){
      product.promotion=!product.promotion;
      return of(true);
    }
    else return throwError(()=> new Error("Product not found"));
  }
  public searchProduct(keyword:string,products:Array<Product>):Observable<Array<Product>>{
    let result = products.filter(p=>p.name.toLowerCase().includes(keyword.toLowerCase()));
    return of(result)
  }

  public addNewProduct(product : Product) : Observable<Product>{
    return this.http.post<Product>("http://localhost:8083/products",product);
  }

  public getProduct(id : string) : Observable<Product> {
    let product = this.http.get<Product>("http://localhost:8083/products/" + id)
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
    }
    else return "";
  }

  public updateProduct(product : Product) : Observable<Product> {
    return this.http.put<Product>("http://localhost:8083/products/" + product.id, product);
  }
}

