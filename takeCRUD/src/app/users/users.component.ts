import { Component, OnInit } from '@angular/core';
import {CustomerService} from './shared/customer.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers:[CustomerService]
})
export class UsersComponent implements OnInit {

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

}
