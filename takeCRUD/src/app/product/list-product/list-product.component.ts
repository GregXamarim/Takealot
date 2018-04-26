import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  constructor(private productService : ProductService, private toastr : ToastrService) { }
  
    ngOnInit() {
      this.productService.getProductList();
    }
  
    showEdit(product : Product) {
      this.productService.selectedProduct = Object.assign({}, product);
    }
  
    onDelete(id : number) {
      if (confirm('Are you sure to delete this record?') == true)
      {
        this.productService.DeleteProduct(id)
        .subscribe(x => {
          this.productService.getProductList();
          this.toastr.warning('Deleted Successfully!');
        })
      }
    }

}