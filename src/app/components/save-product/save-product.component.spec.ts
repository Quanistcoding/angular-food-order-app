import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProductsComponent } from './save-products.component';

describe('SaveProductsComponent', () => {
  let component: SaveProductsComponent;
  let fixture: ComponentFixture<SaveProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
