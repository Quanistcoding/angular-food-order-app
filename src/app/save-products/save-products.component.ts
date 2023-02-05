import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-save-products',
  templateUrl: './save-products.component.html',
  styleUrls: ['./save-products.component.scss'],
})
export class SaveProductsComponent {
  categories$;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll().valueChanges({ idField: 'id' });
  }

  save(product: any) {
    console.log(product);
  }
}
