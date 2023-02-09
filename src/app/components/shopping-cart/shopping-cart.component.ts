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

  constructor(private store: Store<{ cart: Product[] }>) {}

  ngOnInit(): void {
    this.cart$ = this.store.select('cart');
  }

  addOne(product: Product) {
    this.store.dispatch(updateCart({ product, amount: 1 }));
  }

  removeOne(product: Product) {
    this.store.dispatch(updateCart({ product, amount: -1 }));
  }
}
