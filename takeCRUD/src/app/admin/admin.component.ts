import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './shared/admin.service';
import { NgForm } from '@angular/forms';
import { Admin } from './shared/admin.model';
import { ToastrService } from 'ngx-toastr';
import { DriverService } from '../driver/shared/driver.service';
import { SupplierService } from '../supplier/shared/supplier.service';
import { ScheduleService } from '../supplier/schedule/shared/schedule.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers:[AdminService,DriverService,SupplierService,ScheduleService]
})
export class AdminComponent implements OnInit {
  adminClaims : any;
  selectedAdmin : Admin;
  DriverClaims:any;
  supplierClaims:any;
  constructor(private scheduleService : ScheduleService,private driverService : DriverService,private router: Router,private adminService : AdminService,private toastr : ToastrService,private supplierService : SupplierService) { }

  ngOnInit() {
   
    this.adminService.GetAdminClaims().subscribe((data: any)=>{
      this.adminClaims = data;
    });
   this.driverService.getDriverList();
   this.supplierService.getSupplierList();
   this.scheduleService.getScheduletList();
  
}

  Logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  onDelete(id : number) {
    if (confirm('Are you sure to delete this record?') == true)
    {
      this.scheduleService.DeleteSchedule(id)
      .subscribe(x => {
        this.scheduleService.getScheduletList();
        this.toastr.warning('Deleted Successfully!');
      })
    }
  }

}
