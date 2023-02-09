import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const updateCart = createAction(
  '[cart] update',
  props<{ product: Product; amount: number }>()
);
