import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { take } from 'rxjs';
@Component({
  selector: 'app-save-products',
  templateUrl: './save-product.component.html',
  styleUrls: ['./save-product.component.scss'],
})
export class SaveProductComponent implements OnInit {
  categories$: any;
  product: any = {};

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private Router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService
      .getAll()
      .valueChanges({ idField: 'id' });
    let id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.productService
        .findOne(id)
        .valueChanges()
        .pipe(take(1))
        .subscribe((p) => (this.product = p));
  }

  save(product: any) {
    this.Router.navigate(['/admin/products']);
  }
}
