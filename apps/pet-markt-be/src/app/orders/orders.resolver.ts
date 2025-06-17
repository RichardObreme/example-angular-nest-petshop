import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { DeleteOrderResp } from './dto/delete-order.resp';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.ordersService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'orders' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  updateOrder(
    @Args('updateOrderInput', { type: () => UpdateOrderInput })
    updateOrderInput: UpdateOrderInput
  ) {
    return this.ordersService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => DeleteOrderResp)
  removeUnpaid(@Args('id', { type: () => String }) id: string) {
    return this.ordersService.removeUnpaid(id);
  }
}
