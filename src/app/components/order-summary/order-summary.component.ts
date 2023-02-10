import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  @Input() shipmentInvalid: boolean = true;
  @Output() onPlaceOrder = new EventEmitter<any>();
  cart$?: Observable<Product[]>;
  user$?: any;
  totalAmount = 0;
  totalPrice = 0;

  constructor(private store: Store<{ cart: Product[] }>) {}

  ngOnInit() {
    this.cart$ = this.store.select('cart');
    this.cart$.subscribe((cart) => {
      for (let p of cart) {
        this.totalAmount += p.amount!;
        this.totalPrice += p.amount! * p.price;
      }
    });
  }

  placeOrder() {
    this.onPlaceOrder.emit();
  }
}
