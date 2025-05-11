import { CreateOrderDto } from '@/shared/dto/order/create-order.dto';
import { UpdateOrderDto } from '@/shared/dto/order/update-order.dto';
import { PaginationDto } from '@/shared/dto/pagination/pagination.dto';
import { BadRequestException } from '@/shared/exception/bad-request.exception';
import { CartItemRepository } from '@/shared/repositories/cart-item.repository';
import { CartRepository } from '@/shared/repositories/cart.repository';
import { OrderRepository } from '@/shared/repositories/order.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly cartItemRepository: CartItemRepository,
    private readonly cartRepository: CartRepository,
  ) {}

  async create(user: UserJwtPayload, createOrderDto: CreateOrderDto) {
    const cartItems = await this.cartItemRepository.findMany(createOrderDto.cartItemIds);

    if (cartItems.length !== createOrderDto.cartItemIds.length) {
      throw new BadRequestException('modules.order.cartItemNotFound');
    }

    const items: CreateOrderItem[] = cartItems.map((cartItem) => ({
      quantity: cartItem.quantity,
      name: cartItem.variant.product.name,
      description: cartItem.variant.product.description ?? undefined,
      discount: cartItem.variant.product.discount,
      discountType: cartItem.variant.product.discountType,
      sku: cartItem.variant.sku,
      size: cartItem.variant.size,
      color: cartItem.variant.color,
      material: cartItem.variant.material,
      stock: cartItem.variant.stock,
      price: cartItem.variant.price,
    }));

    const order = await this.orderRepository.create(user.id, {
      ...createOrderDto,
      items,
    });

    await this.cartRepository.delete(user.id);

    return {
      id: order.id,
      createdAt: order.createdAt,
    };
  }

  async findAll(user: UserJwtPayload, query: PaginationDto) {
    const [orders, totalRecords] = await this.orderRepository.findAndCount(user.id, query);

    return {
      meta: {
        page: query.page,
        limit: query.limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / query.limit),
      },
      orders,
    };
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOneById(id);
    if (!order) {
      throw new BadRequestException('modules.order.orderNotExists');
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const isOrderExist = await this.findOne(id);

    if (!isOrderExist) {
      throw new BadRequestException('modules.order.orderNotExists');
    }

    const order = await this.orderRepository.update(id, updateOrderDto);

    return {
      id: order.id,
      updatedAt: order.updatedAt,
    };
  }

  async remove(id: string) {
    const isOrderExist = await this.findOne(id);

    if (!isOrderExist) {
      throw new BadRequestException('modules.order.orderNotExists');
    }

    const order = await this.orderRepository.delete(id);

    return {
      id: order.id,
      deletedAt: order.deletedAt,
    };
  }
}
