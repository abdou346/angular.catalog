import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../model/product.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId : string;
  product! : Product;
  productFormGroup! : FormGroup;

  constructor(private activatedRoute : ActivatedRoute,
              public productService : ProductsService,
              private formBuilder : FormBuilder,
              private router:Router
  ) {
    this.productId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe({
      next : (value) => {
        this.product = value;
        this.productFormGroup = this.formBuilder.group({
          name : this.formBuilder.control(this.product.name, [Validators.required, Validators.minLength(4)]),
          price : this.formBuilder.control(this.product.price, [Validators.required,Validators.min(200)]),
          quantity : this.formBuilder.control(this.product.quantity, [Validators.required]),

        });
      },
      error : (err) => {
        console.log(err)
      }
    })
  }

  handleUpdateProduct(){
    let retrievedProduct = this.productFormGroup.value;
    retrievedProduct.id = this.product.id;
    this.productService.updateProduct(retrievedProduct).subscribe({
      next : () => {
        alert("Product updated successfully")
        this.router.navigateByUrl("/admin/products").then( () => {})
      },
      error : err => {
        console.log(err)
      }
    })
  }
}
