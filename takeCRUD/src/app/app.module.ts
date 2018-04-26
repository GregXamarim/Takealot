import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { HttpModule } from '@angular/http'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router'
import {  HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { CustomerComponent } from './users/customer/customer.component';
import { LoginComponent } from './users/login/login.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { appRoutes } from './routes';
import { CustomerService } from './users/shared/customer.service';
import { PersonalDetailsComponent } from './users/personal-details/personal-details.component';
import { LoginNavComponent } from './login-nav/login-nav.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import { ListAdminComponent } from './admin/list-admin/list-admin.component';
import { DriverComponent } from './driver/driver.component';
import { AddDriverComponent } from './driver/add-driver/add-driver.component';
import { ListDriverComponent } from './driver/list-driver/list-driver.component';
import { SupplierComponent } from './supplier/supplier.component';
import { AddSupplierComponent } from './supplier/add-supplier/add-supplier.component';
import { ListSupplierComponent } from './supplier/list-supplier/list-supplier.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { CartComponent } from './cart/cart.component';
import { AddCartComponent } from './cart/add-cart/add-cart.component';
import { ListCartComponent } from './cart/list-cart/list-cart.component';
import { AddressComponent } from './address/address.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { EftComponent } from './eft/eft.component';
import { CreditComponent } from './credit/credit.component';
import { OrderComponent } from './order/order.component';
import { OrderItemDetailsComponent } from './order/order-item-details/order-item-details.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { ScheduleComponent } from './supplier/schedule/schedule.component';
import { InvoiceComponent } from './invoice/invoice.component';



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    CustomerComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    PersonalDetailsComponent,
    LoginNavComponent,
    AdminComponent,
    AddAdminComponent,
    ListAdminComponent,
    DriverComponent,
    AddDriverComponent,
    ListDriverComponent,
    SupplierComponent,
    AddSupplierComponent,
    ListSupplierComponent,
    ProductComponent,
    AddProductComponent,
    ListProductComponent,
    CartComponent,
    AddCartComponent,
    ListCartComponent,
    AddressComponent,
    CheckoutComponent,
    EftComponent,
    CreditComponent,
    OrderComponent,
    OrderItemDetailsComponent,
    OrderListComponent,
    ScheduleComponent,
    InvoiceComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
