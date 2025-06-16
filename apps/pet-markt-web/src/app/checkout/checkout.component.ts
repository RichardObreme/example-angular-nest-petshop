import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStore } from '../stores/cart.store';
import { StripeService } from '../services/stripe.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  cartStore = inject(CartStore);
  stripeService = inject(StripeService);

  checkout() {
    this.stripeService.CreateCheckoutSession().subscribe(({ url }) => {
      location.href = url;
    });
  }
}
