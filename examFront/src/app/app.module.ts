import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {MatListModule} from '@angular/material/list';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { AddNewProductComponent } from './pages/admin/add-new-product/add-new-product.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { DragDirective } from './models/drag.directive';
import { ShowProductDetailComponent } from './pages/admin/show-product-detail/show-product-detail.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ShowProDialogComponent } from './pages/admin/show-pro-dialog/show-pro-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import {  ReactiveFormsModule } from '@angular/forms';
import { AddProduitComponent } from './pages/admin/add-produit/add-produit.component';
import { ListProductComponent } from './pages/admin/list-product/list-product.component';
import { MomentModule } from 'ngx-moment';
import { NgxPayPalModule } from 'ngx-paypal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustompipePipe } from './custompipe.pipe';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { ProductsComponent } from './ecommerce/products/products.component';
import { OrdersComponent } from './ecommerce/orders/orders.component';
import { SangleProductComponent } from './ecommerce/sangle-product/sangle-product.component';
import { ShoppingCartComponent } from './ecommerce/shopping-cart/shopping-cart.component';
import { DashboarddComponent } from './dashboardd/dashboardd.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { DisplayCategoryComponent } from './pages/display-category/display-category.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    AddNewProductComponent,
    DragDirective,
    ShowProductDetailComponent,
    ShowProDialogComponent,
    AddProduitComponent,
    ListProductComponent,
    CustompipePipe,
    EcommerceComponent,
    ProductsComponent,
    OrdersComponent,
    SangleProductComponent,
    ShoppingCartComponent,
    DashboarddComponent,
    DisplayCategoryComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule,
    MomentModule,
    NgxPayPalModule,
    FontAwesomeModule,
    CarouselModule,
    NgbModule,
    NoopAnimationsModule,
    MaterialModule,
  ],
  providers: [authInterceptorProviders,{ provide: MAT_DIALOG_DATA, useValue: {} ,},{ provide: APP_BASE_HREF, useValue: '' },
  { provide: MatDialogRef, useValue: {} },DatePipe],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class AppModule { }
