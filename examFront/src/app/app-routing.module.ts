import { ProductResolveService } from './services/product-resolve.service';
import { ShowProductDetailComponent } from './pages/admin/show-product-detail/show-product-detail.component';
import { AddNewProductComponent } from './pages/admin/add-new-product/add-new-product.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NormalGuard } from './services/normal.guard';
import { AdminGuard } from './services/admin.guard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path:'',component:HomeComponent,pathMatch:'full'},
 
  { path:'signup',component:SignupComponent,pathMatch:'full'},
  { path:'login',component:LoginComponent,pathMatch:'full'},
  { path:'admin',component:DashboardComponent,canActivate:[AdminGuard],children:[
    {
      path:'',component:WelcomeComponent
    },

    {
      path:'profile',component:ProfileComponent
    },
    {
      path:'add-product',component:AddNewProductComponent,resolve:{
        product:ProductResolveService
      }
    },

    {
      path:'show-product',component:ShowProductDetailComponent
    },


  ] },
  { path:'user-dashboard',component:UserDashboardComponent,canActivate:[NormalGuard]},
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
