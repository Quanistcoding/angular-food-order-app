import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: AngularFirestore) {}

  create(product: any) {
    this.firestore.collection('products').add(product);
  }

  getAll() {
    return this.firestore.collection('products');
  }
}
