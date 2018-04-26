import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverService } from '../shared/driver.service';
import { ToastrService } from 'ngx-toastr';
import { Driver } from '../shared/driver.model';


@Component({
  selector: 'app-list-driver',
  templateUrl: './list-driver.component.html',
  styleUrls: ['./list-driver.component.css']
})
export class ListDriverComponent implements OnInit {

  constructor(private router: Router,private driverService : DriverService,private toastr : ToastrService) { }

  ngOnInit() {
    this.driverService.getDriverList();
  }
  showEdit(drvr : Driver){
    this.driverService.selectedDriver = Object.assign({},drvr);
    
  }
  onDelete(id: number){
    if(confirm('Are you sure you want to delete this Driver?')==true){
      this.driverService.DeleteDriver(id)
      .subscribe(x=>{
        this.driverService.getDriverList();
        this.toastr.warning("Deleted Successfully","Driver");
      })
    }
   
  }

}
