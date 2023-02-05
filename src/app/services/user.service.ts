import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  getAll() {
    return this.firestore.collection('users');
  }

  findOne(id: string) {
    return this.firestore.doc('users/' + id);
  }

  findOneAndUpdate(id: string, data: any) {
    const userRef = this.firestore.doc('users/' + id);

    userRef.valueChanges().subscribe((user) => {
      if (user) userRef.update(data);
      else userRef.set(data);
    });
  }
}
