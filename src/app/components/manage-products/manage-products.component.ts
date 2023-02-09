import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit, OnDestroy {
  products?: Product[];
  filteredProducts?: any[];
  subscription?: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.subscription = this.productService
      .getAll()
      .valueChanges({ idField: 'id' })
      .subscribe((products: any) => {
        this.filteredProducts = this.products = products;
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.filteredProducts?.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }
}
