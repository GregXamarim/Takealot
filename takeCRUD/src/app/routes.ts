import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './users/login/login.component';
import { CustomerComponent } from './users/customer/customer.component';
import { PersonalDetailsComponent } from './users/personal-details/personal-details.component';
import { LoginNavComponent } from './login-nav/login-nav.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { DriverComponent } from './driver/driver.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ListCartComponent } from './cart/list-cart/list-cart.component';
import { AddCartComponent } from './cart/add-cart/add-cart.component';
import { AddressComponent } from './address/address.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { EftComponent } from './eft/eft.component';
import { CreditComponent } from './credit/credit.component';
import { OrderComponent } from './order/order.component';
import { OrderItemDetailsComponent } from './order/order-item-details/order-item-details.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { AddDriverComponent } from './driver/add-driver/add-driver.component';
import { AddSupplierComponent } from './supplier/add-supplier/add-supplier.component';
import { ScheduleComponent } from './supplier/schedule/schedule.component';
import { InvoiceComponent } from './invoice/invoice.component';


export const appRoutes : Routes =[
    {path: 'home', component: HomeComponent},
    {path: 'personal-details', component: PersonalDetailsComponent},
    {path: 'login-nav', component: LoginNavComponent,canActivate:[AuthGuard]},
   {path: 'admin', component: AdminComponent,canActivate:[AuthGuard]},
   {path: 'driver', component: DriverComponent,canActivate:[AuthGuard]},
   {path: 'add-driver', component: AddDriverComponent,canActivate:[AuthGuard]},
   {path: 'add-supplier', component: AddSupplierComponent,canActivate:[AuthGuard]},
   {path: 'supplier', component: SupplierComponent,canActivate:[AuthGuard]},
   {path: 'product', component: ProductComponent,canActivate:[AuthGuard]},
   {path: 'schedule', component: ScheduleComponent,canActivate:[AuthGuard]},
   {path: 'cart', component: CartComponent,canActivate:[AuthGuard]},
   {path: 'invoice', component: InvoiceComponent,canActivate:[AuthGuard]},  
   {
    path: 'listCart', component: ListCartComponent,canActivate:[AuthGuard]
   },
   {path: 'address', component: AddressComponent,canActivate:[AuthGuard]},
   {path: 'checkout', component: CheckoutComponent,canActivate:[AuthGuard]},
   {path: 'eft', component: EftComponent,canActivate:[AuthGuard]},
   {path: 'credit', component: CreditComponent,canActivate:[AuthGuard]},
   {path: 'order', component: OrderComponent,canActivate:[AuthGuard]},
   {path: 'orderItemDetails', component: OrderItemDetailsComponent,canActivate:[AuthGuard]},
   {path: 'adminOrderList', component: OrderListComponent,canActivate:[AuthGuard]},

    {
        path: 'customer', component: UsersComponent,
        children: [{path:'',component: CustomerComponent}]
    },
    {
        path: 'login', component: UsersComponent,
        children: [{path:'',component: LoginComponent}]
    },
    {path: '', redirectTo: '/home',pathMatch: 'full'}
]