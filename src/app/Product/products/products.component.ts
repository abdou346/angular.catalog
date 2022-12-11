import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../model/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: 'products.component.html',
  styleUrls: ['products.component.css']
})
export class ProductsComponent implements OnInit {
  products! : Array<Product>;
  errorMessage! : string;
  searchFormGroup! : FormGroup;
  currentAction : string = "all";

  constructor(private productService : ProductsService,
              private formBuilder : FormBuilder,
              public authService : AuthenticationService,
              private router : Router
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.searchFormGroup = this.formBuilder.group({
      keyword : this.formBuilder.control(null)
    });
  }

  getAllProducts() : void {
    this.productService.findAll().subscribe((data) => {
      // @ts-ignore
      this.products = data["_embedded"]["products"];
    });
  }

  handleDeleteProduct(p: Product) {
    let conf = confirm("Are you sure?");
    if(!conf) return;
    this.productService.deleteProduct(p).subscribe({
      next : () => {
        this.getAllProducts();
      },
      error : err => {
        this.errorMessage = err;
      }
    });
  }

  handleSetPromotion(p: Product) {
    p.promotion = !p.promotion;
    this.productService.updateProduct(p).subscribe({
      next: () => {
      },
      error : err => {
        this.errorMessage = err;
      }
    });
  }

  handleSearchProducts() {
    this.currentAction = "search";
    let keyword = this.searchFormGroup.value.keyword;
    if (keyword==""){
      this.getAllProducts();
    } else {
      this.productService.searchProduct(keyword,this.products).subscribe({
        next:(data)=>{
          this.products = data;
        }
      });
    }
  }

  handleNewProduct() {
    this.router.navigateByUrl("/admin/newProduct").then( () => {
    });
  }

  handleEditProduct(p: Product) {
    this.router.navigateByUrl("/admin/editProduct/" + p.id).then( ()  =>{
    });
  }
}
