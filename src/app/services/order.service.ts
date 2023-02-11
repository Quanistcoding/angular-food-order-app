import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Shipment } from '../models/shipment.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private firestore: AngularFirestore) {}

  placeOrder(shipment: Shipment) {
    return this.firestore.collection('orders').add(shipment);
  }

  getOrdersWithUserId(id: string) {
    return this.firestore.collection('orders', (ref) =>
      ref.where('user.id', '==', id)
    );
  }

  getAllOrders() {
    return this.firestore.collection('orders');
  }
}
