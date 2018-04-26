import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierService } from '../shared/supplier.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { AdminService } from '../../admin/shared/admin.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css'],
  providers:[SupplierService,AdminService]
})
export class AddSupplierComponent implements OnInit {
  adminClaims : any;

  constructor(private adminService : AdminService,private router: Router,private supplierService : SupplierService,private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
   
    this.adminService.GetAdminClaims().subscribe((data: any)=>{
      this.adminClaims = data;
    });
    
  }


  resetForm(form?:NgForm){
    if(form != null)
    form.reset();
    this.supplierService.selectedSupplier = {
      SupplierID : 0,
      SupplierName: '',
      Email: '',
      Password: ''
     
    }
   
  }
  Logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  onSubmit(form: NgForm){
    if(form.value.SupplierID == 0){

    
    this.supplierService.PostSupplier(form.value)
    .subscribe(data => {
        this.resetForm(form);
        this.supplierService.getSupplierList();
      
        this.toastr.success('Registered Successfully','Driver');               
     });
    }else 
    {
   //Update
        this.supplierService.PutSupplier(form.value.SupplierID, form.value).subscribe(data=> {
        this.resetForm(form);
       this.supplierService.getSupplierList();
       this.toastr.info('Updated Successfully!');
  });

    }

}
}