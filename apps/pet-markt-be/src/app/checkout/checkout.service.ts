import { OrdersService } from './../orders/orders.service';
import { Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { Stripe } from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET;

if (!stripeSecret) {
  throw new Error('Missing stripe secret');
}

const stripe = new Stripe(stripeSecret);

@Injectable()
export class CheckoutService {
  constructor(private ordersService: OrdersService) {}

  async create(createCheckoutDto: CreateCheckoutDto) {
    const order = await this.ordersService.create({
      items: createCheckoutDto.items,
      totalAmount: createCheckoutDto.totalAmount,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: createCheckoutDto.items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/checkout/success?orderId=${order.id}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel?orderId=${order.id}`,
      metadata: {
        orderId: order.id,
      },
    });

    return {
      url: session.url,
      sessionId: session.id,
      orderId: order.id,
    };
  }

  findAll() {
    return `This action returns all checkout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkout`;
  }

  update(id: number, updateCheckoutDto: UpdateCheckoutDto) {
    return `This action updates a #${id} checkout`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkout`;
  }
}
