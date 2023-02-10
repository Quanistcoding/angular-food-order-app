import { Component } from '@angular/core';
import { Shipment } from 'src/app/models/shipment.model';
import { OrderService } from 'src/app/services/order.service';

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

  shipmentInvalid: boolean = true;

  constructor(private orderService: OrderService) {}

  handlePlaceOrder() {
    console.log(this.shipment);
    // this.orderService.placeOrder(this.shipment);
  }
}
