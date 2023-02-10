import { Component } from '@angular/core';
import { Shipment } from 'src/app/models/shipment.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { take } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { Store } from '@ngrx/store';
import { clearShoppingCart } from 'src/app/store/cart.actions';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  shipment: Shipment = {
    date: '',
    cart: [],
    address: {
      line1: '',
      line2: '',
      city: '',
    },
    user: {
      name: '',
      phone: '',
      id: '',
    },
  };

  shipmentInvalid: boolean = true;
  hasOrderPlaced: boolean = false;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private store: Store<{ cart: Product[] }>
  ) {}

  handlePlaceOrder() {
    this.shipment.date = new Date().toLocaleString();
    this.authService.auth.user.pipe(take(1)).subscribe((user) => {
      if (!user) return;
      this.shipment.user.id = user.uid;
      this.orderService.placeOrder(this.shipment).then((res) => {
        this.store.dispatch(clearShoppingCart());
        this.hasOrderPlaced = true;
        this.shipmentInvalid = true;
      });
    });
  }
}
