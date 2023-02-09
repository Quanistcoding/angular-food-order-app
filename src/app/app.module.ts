import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { LoginComponent } from './components/login/login.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { SaveProductComponent } from './components/save-product/save-product.component';
import { UserService } from './services/user.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ProductService } from './services/product.service';
import { ProductsGridComponent } from './components/products-grid/products-grid.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './store/cart.reducer';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ShoppingCartComponent,
    LoginComponent,
    MyOrdersComponent,
    ManageOrdersComponent,
    ManageProductsComponent,
    NotFoundComponent,
    SaveProductComponent,
    ProductsGridComponent,
    CategoriesListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyA8ezeT-skkdJpgn2lX8CByFzvYSiEf9oc',
      authDomain: 'food-order-59b6b.firebaseapp.com',
      projectId: 'food-order-59b6b',
      storageBucket: 'food-order-59b6b.appspot.com',
      messagingSenderId: '11030503831',
      appId: '1:11030503831:web:086d99d54548e1137c64d2',
      measurementId: 'G-7EMF5PKRHN',
    }),
    AngularFirestoreModule,
    FormsModule,
    StoreModule.forRoot(
      { cart: cartReducer },
      {
        runtimeChecks: {
          // strictStateImmutability and strictActionImmutability are enabled by default
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionWithinNgZone: true,
          strictActionTypeUniqueness: true,
          // if you want to change complexe objects and that we have. We need to disable these settings
          // change strictStateImmutability, strictActionImmutability
          strictStateImmutability: false, // set this to false
          strictActionImmutability: false,
        },
      }
    ),
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
    ProductService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
