import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { take } from 'rxjs';
import { Shipment } from 'src/app/models/shipment.model';

import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss'],
})
export class ShipmentComponent implements OnInit {
  @Input() shipment: Shipment = {
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

  @Output() shipmentChange = new EventEmitter<Shipment>();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService
      .getUser()
      .pipe(take(1))
      .subscribe((user) => {
        this.shipment.user.name = user!.name || '';
        this.shipment.user.phone = user!.phone || '';
        this.shipment.user.id = user!.id || '';
      });
  }

  test() {
    console.log(this.shipment);
  }
}
