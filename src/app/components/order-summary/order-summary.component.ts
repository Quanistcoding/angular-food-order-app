import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  cart$?: Observable<Product[]>;
  total = 0;
  constructor(private store: Store<{ cart: Product[] }>) {}

  ngOnInit() {
    this.cart$ = this.store.select('cart');
    this.cart$.subscribe((cart) => {
      this.total = cart.reduce((e, c) => e + c.amount!, 0);
    });
  }
}
