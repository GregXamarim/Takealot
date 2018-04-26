import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin/shared/admin.service';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from './shared/supplier.service';
import { ProductService } from '../product/shared/product.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
  providers:[AdminService,SupplierService,ProductService]
})
export class SupplierComponent implements OnInit {
  supplierClaims: any;
  message:string;
  constructor(private productService : ProductService,private router: Router,private adminService : AdminService,private supplierService : SupplierService,private toastr : ToastrService) { }

  ngOnInit() {
    this.supplierService.GetAdminClaims().subscribe((data: any)=>{
      this.supplierClaims = data;
      localStorage.setItem("SupplierID",this.supplierClaims.SupplierID+'')
    });
    this.productService.getProductList();
  }
  Logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  calcQuantity(actualQ : number, minQuantity : number)
  {
      if (actualQ <= minQuantity)
      {
        this.message = "Stock is running out";
      }
      else if (actualQ > minQuantity)
      {
        this.message = "Good"
      }else if(actualQ == 0){
        
        this.message = "Stock is finished"
      }

      return this.message;
  }

}
