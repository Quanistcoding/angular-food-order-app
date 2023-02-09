import { createReducer, on } from '@ngrx/store';
import { Product } from '../models/product.model';
import { updateCart } from './cart.actions';

const cartString: string | null = localStorage.getItem('food-order-cart');
let initialState: Product[];

try {
  initialState = cartString ? JSON.parse(cartString) : [];
} catch (error) {
  initialState = [];
}

export const cartReducer = createReducer(
  initialState,
  on(updateCart, (state, action) => {
    const { product, amount } = action;
    let result: Product[] = [...state];

    const index = result.findIndex((p) => p.id === product.id);

    if (index === -1) {
      result.push({ ...product, amount: 1 });
    } else {
      const newAmount = (result[index].amount! += amount);
      result[index].amount! = newAmount < 0 ? 0 : newAmount;
    }

    updateLocalStorage(result);
    return result;
  })
);

function updateLocalStorage(cart: Product[]) {
  localStorage.setItem('food-order-cart', JSON.stringify(cart));
}
