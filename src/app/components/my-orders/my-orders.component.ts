import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, switchMap, of, map } from 'rxjs';
import { Shipment } from 'src/app/models/shipment.model';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  orders$?: Observable<Shipment[] | null>;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.orders$ = this.authService.auth.user
      .pipe(
        switchMap((user) => {
          if (!user) return of(null);
          return this.orderService
            .getOrdersWithUserId(user.uid)
            .valueChanges({ idField: 'id' });
        })
      )
      .pipe(
        map((orders) =>
          orders!.map((order: any) => {
            order.totalPrice = order.cart.reduce(
              (e: number, c: Product) => e + c.price * c.amount!,
              0
            );
            return order;
          })
        )
      ) as Observable<Shipment[] | null>;
  }
}
