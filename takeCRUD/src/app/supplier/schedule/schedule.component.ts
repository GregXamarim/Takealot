import { Component, OnInit } from '@angular/core';
import { ScheduleService } from './shared/schedule.service';
import { ToastrService } from 'ngx-toastr';
import { Schedule } from './shared/schedule.model';
import { NgForm } from '@angular/forms';
import { SupplierService } from '../shared/supplier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers:[ScheduleService,SupplierService]
})
export class ScheduleComponent implements OnInit {
  schedule : Schedule;
  supplierClaims: any;

  constructor(private scheduleService : ScheduleService, private toastr : ToastrService,private supplierService : SupplierService,private router: Router) { }

  ngOnInit() {
    this.resetForm();

    this.supplierService.GetAdminClaims().subscribe((data: any)=>{
      this.supplierClaims = data;
    });
  }
  resetForm(form?:NgForm){
    if(form != null)
    form.reset();
    this.schedule = {
      ScheduleID : 0,
      SupplierID :+localStorage.getItem("SupplierID"),
      SupplierName : '',
      ProdName : '',
      SupplierDate : '',
      ProdQuantity : null
      
    }
     
    }

  onSubmit(form : NgForm)
  {
    this.schedule = {
      ScheduleID : 0,
      SupplierID :+localStorage.getItem("SupplierID"),
      SupplierName : form.value.SupplierName,
      ProdName : form.value.ProdName,
      SupplierDate : form.value.SupplierDate,
      ProdQuantity : form.value.ProdQuantity
      
    }
    this.scheduleService.PostSchedule(this.schedule)
    .subscribe(data => {
        this.toastr.success("Notification Sent!");
    })
  }
  Logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
