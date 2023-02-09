import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss'],
})
export class ProductsGridComponent implements OnInit, OnChanges {
  @Input() selectedCategory: string = '';
  products?: Product[];
  selectedProducts?: Product[];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService
      .getAll()
      .valueChanges({ idField: 'id' })
      .subscribe((products) => {
        this.products = products as Product[];
        this.selectedProducts = this.initiateProducts();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedProducts = this.initiateProducts();
  }

  public initiateProducts() {
    if (this.selectedCategory === 'All') return this.products;
    return this.products?.filter(
      (item) => item.category === this.selectedCategory
    );
  }
}
