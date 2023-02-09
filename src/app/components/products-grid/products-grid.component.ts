import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Store } from '@ngrx/store';
import { updateCart } from 'src/app/store/cart.actions';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss'],
})
export class ProductsGridComponent implements OnInit, OnChanges {
  @Input() selectedCategory: string = '';
  products?: Product[];
  selectedProducts?: Product[];
  cart$?: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private store: Store<{ cart: Product[] }>
  ) {}

  ngOnInit() {
    const productsObservable = this.productService
      .getAll()
      .valueChanges({ idField: 'id' });

    const cartObservable = this.store.select('cart');

    combineLatest([productsObservable, cartObservable]).subscribe((values) => {
      const [products, cart] = values;

      const l = products.length;
      for (let i = 0; i < l; i++) {
        const currentProduct = products[i];
        const found = cart.find((p) => p.id === currentProduct.id);
        if (!found) (products[i] as Product).amount = 0;
        else (products[i] as Product).amount = found.amount;
      }

      this.products = products as Product[];
      this.selectedProducts = this.sortProducts();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedProducts = this.sortProducts();
  }

  addToCart(product: Product) {
    this.store.dispatch(updateCart({ product, amount: 1 }));
  }

  removeOneFromCart(product: Product) {
    this.store.dispatch(updateCart({ product, amount: -1 }));
  }

  public sortProducts() {
    if (this.selectedCategory === 'All') return this.products;
    return this.products?.filter(
      (item) => item.category === this.selectedCategory
    );
  }
}
