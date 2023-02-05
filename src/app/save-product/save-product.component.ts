import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-save-products',
  templateUrl: './save-product.component.html',
  styleUrls: ['./save-product.component.scss'],
})
export class SaveProductComponent {
  categories$;

  constructor(categoryService: CategoryService, private Router: Router) {
    this.categories$ = categoryService.getAll().valueChanges({ idField: 'id' });
  }

  save(product: any) {
    console.log(product);
    this.Router.navigate(['/admin/products']);
  }
}
