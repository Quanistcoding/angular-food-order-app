import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private firestore: AngularFirestore) {}
  getAll() {
    return this.firestore.collection('categories', (ref) =>
      ref.orderBy('name')
    );
  }
}
