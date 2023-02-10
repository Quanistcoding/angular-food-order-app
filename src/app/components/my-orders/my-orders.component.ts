import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, of } from 'rxjs';
import { Shipment } from 'src/app/models/shipment.model';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';

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
    this.orders$ = this.authService.auth.user.pipe(
      switchMap((user) => {
        if (!user) return of(null);
        return this.orderService.getOrders(user.uid).valueChanges();
      })
    ) as Observable<Shipment[] | null>;
  }
}
