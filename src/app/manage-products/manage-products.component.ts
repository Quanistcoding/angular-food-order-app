import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit {
  products$: any;
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products$ = this.productService
      .getAll()
      .valueChanges({ idField: 'id' });
  }
}
