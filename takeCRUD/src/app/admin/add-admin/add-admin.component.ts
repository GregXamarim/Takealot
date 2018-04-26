import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../shared/admin.service';
import { NgForm } from '@angular/forms';
import { Admin } from '../shared/admin.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  selectedAdmin : Admin;
  constructor(private router: Router,private adminService : AdminService,private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }


  resetForm(form?:NgForm){
    if(form != null)
    form.reset();
    this.adminService.selectedAdmin = {
      AdminID : 0,
      FirstName: '',
      LastName: '',
      Email: '',
      Password: ''
     
    }
  }
  onSubmit(form: NgForm){
    if(form.value.AdminID == 0){

    
    this.adminService.PostAdmin(form.value)
    .subscribe(data => {
        this.resetForm(form);
        this.adminService.getAdminList();
        this.toastr.success('Registered Successfully','Admin');               
     });
    }else 
    {
   //Update
        this.adminService.PutAdmin(form.value.AdminID, form.value).subscribe(data=> {
        this.resetForm(form);
       this.adminService.getAdminList();
       this.toastr.info('Updated Successfully!');
  });

    }
 
}



}
