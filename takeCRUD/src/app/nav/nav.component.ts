import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { CustomerService } from '../users/shared/customer.service';
import { Customer } from '../users/shared/customer.model';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers:[CustomerService]
})
export class NavComponent implements OnInit {
  constructor(private router: Router,private customerService : CustomerService) { }

  ngOnInit() {
    
  }


}
