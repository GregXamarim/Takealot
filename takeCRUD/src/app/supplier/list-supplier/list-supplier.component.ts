import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierService } from '../shared/supplier.service';
import { ToastrService } from 'ngx-toastr';
import { Supplier } from '../shared/supplier.model';

@Component({
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.css']
})
export class ListSupplierComponent implements OnInit {

  constructor(private router: Router,private supplierService : SupplierService,private toastr : ToastrService) { }

  ngOnInit() {
    this.supplierService.getSupplierList();
    console.log(this.supplierService.SupplierList);
  }
  showEdit(sup : Supplier){
    this.supplierService.selectedSupplier = Object.assign({},sup);
    
  }
  onDelete(id: number){
    if(confirm('Are you sure you want to delete this Driver?')==true){
      this.supplierService.DeleteSupplier(id)
      .subscribe(x=>{
        this.supplierService.getSupplierList();
        this.toastr.warning("Deleted Successfully","Driver");
      })
    }
   
  }

}

