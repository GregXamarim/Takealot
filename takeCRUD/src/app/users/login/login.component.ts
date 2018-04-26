import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {CustomerService} from '../shared/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userClaims: any;
 
  constructor(private customerService : CustomerService,private toastr : ToastrService,private router : Router) { }

  ngOnInit() {
   
  }
 onSubmit(Email,Password){
   this.customerService.userAuthentication(Email,Password).subscribe((data: any)=>{
    localStorage.setItem('token',data.access_token);

    if(Email.substr(-18) === 'admin@takealot.com'){
     this.router.navigate(['/admin']);
    }else if(Email.substr(-19) === 'driver@takealot.com'){
      this.router.navigate(['/driver']);
    }else if(Email.substr(-21) === 'supplier@takealot.com'){
      this.router.navigate(['/supplier']);
    }
    else{
    
         
     this.router.navigate(['/home']);
     this.toastr.success('LoggedOn Successfully','Login Customer');
        
    }
   
    
      

   },
  (err : HttpErrorResponse)=>{
    this.toastr.error('Incorrect Email Or Password');
  });
 }

}
