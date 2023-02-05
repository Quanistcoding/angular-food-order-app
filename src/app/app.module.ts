import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { SaveProductsComponent } from './save-products/save-products.component';
import { UserService } from './services/user.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
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
    SaveProductsComponent,
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
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
