import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss'],
})
export class ProductsGridComponent implements OnInit {
  products$?: Observable<any[]>;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products$ = this.productService
      .getAll()
      .valueChanges({ idField: 'id' });
  }
}
