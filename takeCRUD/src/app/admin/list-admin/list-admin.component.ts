import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../shared/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Admin } from '../shared/admin.model';


@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {

  constructor(private router: Router,private adminService : AdminService,private toastr : ToastrService) { }

  ngOnInit() {
    this.adminService.getAdminList();
  }
  showEdit(adm : Admin){
    this.adminService.selectedAdmin = Object.assign({},adm);
    
  }
  onDelete(id: number){
    if(confirm('Are you sure you want to delete this Admin?')==true){
      this.adminService.DeleteAdmin(id)
      .subscribe(x=>{
        this.adminService.getAdminList();
        this.toastr.warning("Deleted Successfully","Admin");
      })
    }
   
  }

}
