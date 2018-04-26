import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private productService : ProductService,private toastr : ToastrService) { }

    ngOnInit() {
      this.resetForm();
    
    }
  
    resetForm(form? : NgForm) {
      if (form != null)
        form.reset();
      this.productService.selectedProduct = {
        ProductID : 0,
        ProdName : '',
        Quantity : null,
        minQuantity: null,
        Price : null,
        ProdImage : '',
        Category : ''
      }
    }
  
    fileUpload(file : HTMLInputElement){
      this.productService.selectedProduct.ProdImage = file.value.substr(12);
    }

    onSubmit(form : NgForm) {
      if(form.value.ProductID == 0)
      {
        this.productService.PostProduct(form.value)
        .subscribe( data => {
          this.resetForm(form);
          this.productService.getProductList();
          this.toastr.success('Product added successfully!');
        })
      } else {
        this.productService.PutProduct(form.value.ProductID, form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.productService.getProductList();
          this.toastr.info('Record Updated Successfully!');
        })
      }
    }

}
