import { createReducer, on } from '@ngrx/store';
import { Product } from '../models/product.model';
import { updateCart, clearShoppingCart } from './cart.actions';

const storageName = 'food-order-cart';

const cartString: string | null = localStorage.getItem(storageName);
let initialState: Product[];

try {
  initialState = cartString ? JSON.parse(cartString) : [];
} catch (error) {
  localStorage.removeItem(storageName);
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
      if (newAmount === 0) result.splice(index, 1);
      else result[index].amount! = newAmount < 0 ? 0 : newAmount;
    }

    updateLocalStorage(result);
    return result;
  }),
  on(clearShoppingCart, (state) => {
    localStorage.removeItem(storageName);
    return [];
  })
);

function updateLocalStorage(cart: Product[]) {
  localStorage.setItem(storageName, JSON.stringify(cart));
}
