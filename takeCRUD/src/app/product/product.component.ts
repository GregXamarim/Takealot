import { Component, OnInit } from '@angular/core';
import { ProductService } from './shared/product.service';
import { AdminService } from '../admin/shared/admin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[AdminService,ProductService]

})
export class ProductComponent implements OnInit {

  adminClaims: any;
  constructor(private router: Router,private adminService : AdminService,private productService : ProductService,private toastr : ToastrService) { }

  ngOnInit() {
    this.adminService.GetAdminClaims().subscribe((data: any)=>{
      this.adminClaims = data;
    });
    
  }
  Logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
