import { ShoppingCartComponent } from './ecommerce/shopping-cart/shopping-cart.component';
import { ProductsComponent } from './ecommerce/products/products.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListProductComponent } from './pages/admin/list-product/list-product.component';
import { AddProduitComponent } from './pages/admin/add-produit/add-produit.component';
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
import { CommonModule } from '@angular/common';
import { DashboarddComponent } from './dashboardd/dashboardd.component';
import { SangleProductComponent } from './ecommerce/sangle-product/sangle-product.component';
import { DisplayCategoryComponent } from './pages/display-category/display-category.component';


const routes: Routes = [
  { path:'',component:HomeComponent,pathMatch:'full'},
  {  path: 'dashboard',
   component: DashboarddComponent,
},
{  path: 'affpro',
component: ProductsComponent,
},
{  path: 'shop',
component: ShoppingCartComponent,
},
{
  path: 'dsiplay-category/:idCategory',
  component: DisplayCategoryComponent
},
{  path: 'footer',
component: FooterComponent,
},
{
  path: 'sangle/product/:idProduct',
  component: SangleProductComponent
},
{
  path: 'puy/product/:name',
  component: SangleProductComponent
},

 { path:'add-proAr',component:AddProduitComponent,pathMatch:'full'},
  { path:'list-proAr',component:ListProductComponent,pathMatch:'full'},
  { path:'signup',component:SignupComponent,pathMatch:'full'},
  { path:'login',component:LoginComponent,pathMatch:'full'},
  { path:'admin',component:DashboardComponent,children:[
    {
      path:'',component:HomeComponent
    },

    {
      path:'profile',component:ProfileComponent
    },
    {
      path:'add-product',component:AddProduitComponent,resolve:{
        product:ProductResolveService
      }
    },

    {
      path:'show-product',component:ShowProductDetailComponent
    },


  ] },
  { path:'user-dashboard',component:UserDashboardComponent},
 
 
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
