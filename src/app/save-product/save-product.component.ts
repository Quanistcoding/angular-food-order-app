import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-save-products',
  templateUrl: './save-product.component.html',
  styleUrls: ['./save-product.component.scss'],
})
export class SaveProductComponent {
  categories$;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll().valueChanges({ idField: 'id' });
  }

  save(product: any) {
    console.log(product);
  }
}
