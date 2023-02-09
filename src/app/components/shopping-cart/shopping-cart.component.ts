import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updateCart } from 'src/app/store/cart.actions';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cart$?: Observable<Product[]>;
  hasItems = false;
  totlaPrice = 0;
  constructor(private store: Store<{ cart: Product[] }>) {}

  ngOnInit(): void {
    this.cart$ = this.store.select('cart');
    this.cart$.subscribe((cart) => {
      this.totlaPrice = cart.reduce((s, c) => s + c.amount! * c.price, 0);
      this.hasItems = cart.length === 0 ? false : true;
    });
  }

  addOne(product: Product) {
    this.store.dispatch(updateCart({ product, amount: 1 }));
  }

  removeOne(product: Product) {
    this.store.dispatch(updateCart({ product, amount: -1 }));
  }
}
