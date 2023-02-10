import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const updateCart = createAction(
  '[cart] Update',
  props<{ product: Product; amount: number }>()
);

export const clearShoppingCart = createAction('[cart] clear');
