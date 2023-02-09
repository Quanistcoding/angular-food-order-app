import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit {
  @Input() selectedCategory: string = 'Bread';
  @Output() onSelect = new EventEmitter();

  categories$?: Observable<any[]>;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService
      .getAll()
      .valueChanges({ idField: 'id' });
  }

  select(category: string) {
    this.selectedCategory = category;
    this.onSelect.emit(category);
  }
}
