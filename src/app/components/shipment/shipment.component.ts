import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { take } from 'rxjs';
import { Shipment } from 'src/app/models/shipment.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
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

  @Input() shipmentInvalid: boolean = true;
  @Output() shipmentInvalidChange = new EventEmitter<boolean>();

  hasItemsInCart = false;

  constructor(
    private authService: AuthService,
    private store: Store<{ cart: Product[] }>
  ) {}

  ngOnInit() {
    this.authService
      .getUser()
      .pipe(take(1))
      .subscribe((user) => {
        this.shipment.user.name = user!.name || '';
        this.shipment.user.phone = user!.phone || '';
        this.shipment.user.id = user!.id || '';
      });

    this.store.select('cart').subscribe((cart) => {
      this.hasItemsInCart = cart.length !== 0;
    });
  }

  updateValidState(form: NgForm) {
    this.shipmentInvalidChange.emit(!form.valid! || !this.hasItemsInCart);
  }
}
