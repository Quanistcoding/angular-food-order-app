import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { Observable, take } from 'rxjs';
import { Product } from '../models/product.model';
@Component({
  selector: 'app-save-products',
  templateUrl: './save-product.component.html',
  styleUrls: ['./save-product.component.scss'],
})
export class SaveProductComponent implements OnInit {
  product: any = {};
  id?: string | null;
  categories: any = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private Router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryService
      .getAll()
      .valueChanges({ idField: 'id' })
      .pipe(take(1))
      .subscribe((c) => {
        this.categories = c;
      });

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id)
      this.productService
        .findOne(this.id)
        .valueChanges()
        .pipe(take(1))
        .subscribe((p) => {
          this.product = p;
        });
  }

  save(product: any) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.Router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?') || !this.id)
      return;

    this.productService.delete(this.id);
    this.Router.navigate(['/admin/products']);
  }
}
