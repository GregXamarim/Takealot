import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DriverService } from '../shared/driver.service';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../admin/shared/admin.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css'],
  providers:[DriverService,AdminService]

})
export class AddDriverComponent implements OnInit {
  adminClaims : any;

  constructor(private adminService : AdminService,private router: Router,private driverService : DriverService,private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.adminService.GetAdminClaims().subscribe((data: any)=>{
      this.adminClaims = data;
    });
  }


  resetForm(form?:NgForm){
    if(form != null)
    form.reset();
    this.driverService.selectedDriver = {
      DriverID : 0,
      FirstName: '',
      LastName: '',
      Email: '',
      Password: ''
     
    }
  }
  onSubmit(form: NgForm){
    if(form.value.DriverID == 0){

    
    this.driverService.PostDriver(form.value)
    .subscribe(data => {
        this.resetForm(form);
        this.driverService.getDriverList();
        this.toastr.success('Registered Successfully','Driver');               
     });
    }else 
    {
   //Update
        this.driverService.PutDriver(form.value.DriverID, form.value).subscribe(data=> {
        this.resetForm(form);
       this.driverService.getDriverList();
       this.toastr.info('Updated Successfully!');
  });

    }

}
Logout(){
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}
}
