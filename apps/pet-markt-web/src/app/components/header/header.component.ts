import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartStore } from '../../stores/cart.store';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  cartStore = inject(CartStore);
  previouscount = 0;
  isCartBouncing = signal(false);

  constructor() {
    effect(() => {
      const currentCount = this.cartStore.totalItems();

      if (currentCount && currentCount > this.previouscount) {
        this.isCartBouncing.set(true);

        setTimeout(() => {
          this.isCartBouncing.set(false);
        }, 1000);
      }

      this.previouscount = currentCount;
    });
  }
}
