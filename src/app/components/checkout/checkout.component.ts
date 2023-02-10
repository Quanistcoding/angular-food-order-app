import { Component } from '@angular/core';
import { Shipment } from 'src/app/models/shipment.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  shipment: Shipment = {
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

  handlePlaceOrder() {
    console.log(this.shipment);
  }
}
