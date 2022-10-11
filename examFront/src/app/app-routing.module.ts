

import { authInterceptorProviders } from './services/auth.interceptor';
import { ShoppingCartComponent } from './ecommerce/shopping-cart/shopping-cart.component';
import { ProductsComponent } from './ecommerce/products/products.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListProductComponent } from './pages/admin/list-product/list-product.component';
import { AddProduitComponent } from './pages/admin/add-produit/add-produit.component';
import { ProductResolveService } from './services/product-resolve.service';
import { AddNewProductComponent } from './pages/admin/add-new-product/add-new-product.component';
import { NormalGuard } from './services/normal.guard';
import { AdminGuard } from './services/admin.guard';

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
import { DisplayTagComponent } from './pages/display-tag/display-tag.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { User } from './models/Modal';
import { ShowCartComponent } from './pages/admin/show-cart/show-cart.component';


const routes: Routes = [
  { path:'',component:HomeComponent,pathMatch:'full'},
  {
  path: 'carts/:id',
  component: ShowCartComponent
},
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
  path: 'display-tag/:idTag',
  component: DisplayTagComponent
},
{
  path: 'sangle/product/:idProduct',
  component: SangleProductComponent
},
{
  path: 'puy/product/:name',
  component: SangleProductComponent
},
{
  path: 'signup/:id',
  component: SignupComponent
},
{
  path: 'profile/:id',
  component: ProfileComponent, children: [
    {
      path: 'categories/:idCategory',
      component: CategoriesComponent
    }
  ]

},

  { path:'add-proAr',component:AddProduitComponent,pathMatch:'full'},
  { path:'list-proAr',component:ListProductComponent,pathMatch:'full'},
  { path:'signup',component:SignupComponent,pathMatch:'full'},
  { path:'login',component:LoginComponent,pathMatch:'full'},
  { path:'admin',component:DashboardComponent,children:[
    {
      path:'',component:HomeComponent
    }, ] }
 
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
