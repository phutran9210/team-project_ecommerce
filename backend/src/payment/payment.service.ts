import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { Repository, In, Equal } from 'typeorm';
import { Data } from './dto/create-payment.dto';
import {} from './dto/update-payment.dto';
import { DiscountCode } from '../discount/entities/discount_code.entity';
import { DiscountCodeMapping } from '../discount/entities/discount_maping.entity';
import { Product } from '../product/entities/product.entity';
import { Order } from '../payment/entities/orders.entity';
import { OrderDetail } from '../payment/entities/order_details.entity';
import { Guest } from '../auth/entities/guest.entity';
import { TokenUser } from '../auth/interface/response';
import { CartDetail } from '../carts/entities/cart-detail.entity';

const PAGE_SIZE = 8;

@Injectable()
export class PaymentService {
  constructor(
    @Inject('DISCOUNTCODE_REPOSITORY')
    private discoutCodeRepository: Repository<DiscountCode>,
    @Inject('DISCOUNTCODE_MAPPING_REPOSITORY')
    private discoutCodeMappingRepository: Repository<DiscountCodeMapping>,
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    @Inject('CART_DETAILS_REPOSITORY')
    private cartDetailRepository: Repository<CartDetail>,
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
    @Inject('ORDER_DETAIL_REPOSITORY')
    private orderDetailRepository: Repository<OrderDetail>,
    @Inject('GUEST_REPOSITORY')
    private guestRepository: Repository<Guest>,
  ) {}

  async check(code: string, createPaymentDto: any) {
    const existVoucher = await this.discoutCodeRepository.findOne({
      where: { code_discount: code },
    });
    if (!existVoucher) {
      return new HttpException('Voucher not found!', HttpStatus.NOT_FOUND);
    }
    if (existVoucher.discount_scope === 'order') {
      return { status: 200, message: 'Voucher is valid.', data: existVoucher };
    }

    const currentTime = Date.now();
    if (
      existVoucher.end_date &&
      currentTime > existVoucher.end_date.getTime()
    ) {
      throw new HttpException('Voucher has expired!', HttpStatus.BAD_REQUEST);
    }

    if (existVoucher.use_limit === 0) {
      throw new HttpException(
        'Voucher has run out of uses!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const productIds = createPaymentDto.map((item) => item.product_id);

    const discountMappings = await this.discoutCodeMappingRepository.find({
      where: {
        discountCode: {
          discount_code_id: Equal(existVoucher.discount_code_id),
        },
        product: { product_id: In(productIds) },
      },
      relations: ['product'],
    });

    const mappedProductIds = discountMappings.map(
      (mapping) => mapping.product.product_id,
    );

    const allProductsAreMapped = productIds.some((productId) =>
      mappedProductIds.includes(productId),
    );

    if (allProductsAreMapped) {
      return { status: 200, message: 'Voucher is valid.', data: existVoucher };
    } else {
      throw new HttpException(
        'Invalid voucher for the selected products!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //CHECKOUT:
  // async checkout(req: Request, cardId: number, payloadCheckout: Data) {
  //   const guest_id = (req.user as Partial<TokenUser>).sub;

  //   const existVoucher = await this.discoutCodeRepository.findOne({
  //     where: { code_discount: payloadCheckout.voucher },
  //   });

  //   if (existVoucher && existVoucher.discount_scope === 'order') {
  //     const productIds = payloadCheckout.order_details.map(
  //       (item) => item.product_id,
  //     );

  //     const products = await this.productRepository.findBy({
  //       product_id: In(productIds),
  //     });

  //     for (const detail of payloadCheckout.order_details) {
  //       const product = products.find(
  //         (p) => p.product_id === detail.product_id,
  //       );
  //       if (!product || product.quantity < detail.quantity) {
  //         throw new HttpException(
  //           `${product.product_name} not enough`,
  //           HttpStatus.BAD_REQUEST,
  //         );
  //       }
  //     }

  //     const guestEntity = await this.guestRepository.findOne({
  //       where: { guest_id: guest_id },
  //     });
  //     if (!guestEntity) {
  //       throw new HttpException('Guest not found!', HttpStatus.NOT_FOUND);
  //     }

  //     const order = this.orderRepository.create({
  //       ...payloadCheckout.order,
  //       guest: guestEntity,
  //     });
  //     const savedOrder = await this.orderRepository.save(order);
  //     const savedOrderDetails = [];
  //     // Tạo và lưu OrderDetails
  //     for (const detail of payloadCheckout.order_details) {
  //       const product = products.find(
  //         (p) => p.product_id === detail.product_id,
  //       );
  //       const orderDetail = this.orderDetailRepository.create({
  //         ...detail,
  //         order: savedOrder, // Liên kết với Order vừa được lưu
  //         total_price: product.price * detail.quantity,
  //         discounted_price: product.price - (product.onSale || 0),
  //       });
  //       const orderedDetail =
  //         await this.orderDetailRepository.save(orderDetail);
  //       savedOrderDetails.push(orderedDetail);
  //     }

  //     return {
  //       message: 'Order placed successfully!',
  //       order: savedOrder,
  //       orderDetails: savedOrderDetails,
  //       voucher: existVoucher,
  //     };
  //   }

  //   const currentTime = Date.now();
  //   if (
  //     existVoucher &&
  //     existVoucher.end_date &&
  //     currentTime > existVoucher.end_date.getTime()
  //   ) {
  //     throw new HttpException('Voucher has expired!', HttpStatus.BAD_REQUEST);
  //   }

  //   if (existVoucher && existVoucher.use_limit === 0) {
  //     throw new HttpException(
  //       'Voucher has run out of uses!',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   const productIds = payloadCheckout.order_details.map(
  //     (item) => item.product_id,
  //   );
  //   if (existVoucher) {
  //     const discountMappings = await this.discoutCodeMappingRepository.find({
  //       where: {
  //         discountCode: {
  //           discount_code_id: Equal(existVoucher.discount_code_id),
  //         },
  //         product: { product_id: In(productIds) },
  //       },
  //       relations: ['product'],
  //     });

  //     const mappedProductIds = discountMappings.map(
  //       (mapping) => mapping.product.product_id,
  //     );

  //     const allProductsAreMapped = productIds.some((productId) =>
  //       mappedProductIds.includes(productId),
  //     );

  //     if (!allProductsAreMapped) {
  //       throw new HttpException(
  //         'Invalid voucher for the selected products!',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //   }

  //   const products = await this.productRepository.findBy({
  //     product_id: In(productIds),
  //   });

  //   for (const detail of payloadCheckout.order_details) {
  //     const product = products.find((p) => p.product_id === detail.product_id);
  //     if (!product || product.quantity < detail.quantity) {
  //       throw new HttpException(
  //         `${product.product_name} not enough`,
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //   }

  //   const guestEntity = await this.guestRepository.findOne({
  //     where: { guest_id: guest_id },
  //   });
  //   if (!guestEntity) {
  //     throw new HttpException('Guest not found!', HttpStatus.NOT_FOUND);
  //   }

  //   const order = this.orderRepository.create({
  //     ...payloadCheckout.order,
  //     guest: guestEntity,
  //   });
  //   const savedOrder = await this.orderRepository.save(order);
  //   const { guest, ...orderResult } = savedOrder;

  //   // const savedOrderDetails = [];
  //   // Tạo và lưu OrderDetails
  //   for (const detail of payloadCheckout.order_details) {

  //     const product = products.find((p) => p.product_id === detail.product_id);

  //     let totalPrice = product.price * detail.quantity;
  // if (detail.engraving_checked) {
  //   totalPrice += 30;
  // }
  //     const orderDetail = this.orderDetailRepository.create({
  //       ...detail,
  //       order: savedOrder,
  //       total_price: totalPrice,
  //       discounted_price:
  //         (product.price - (product.price * product.onSale) / 100) *
  //         detail.quantity,
  //     });
  //     await this.orderDetailRepository.save(orderDetail);
  //   }

  //   const savedOrderDetails = await this.orderDetailRepository
  //     .createQueryBuilder('orderDetail')
  //     .select([
  //       'orderDetail.discounted_price',
  //       'orderDetail.engraving_checked',
  //       'orderDetail.engraving_content',
  //       'orderDetail.order_detail_id',
  //       'orderDetail.quantity',
  //       'orderDetail.total_price',
  //     ])
  //     .where('orderDetail.order_id =:order_id ', {
  //       order_id: savedOrder.order_id,
  //     })
  //     .leftJoin('orderDetail.product', 'product')
  //     .addSelect([
  //       'product.product_id',
  //       'product.product_name',
  //       'product.primary_img',
  //       'product.product_description',
  //       'product.onSale',
  //     ])
  //     .getMany();

  //   const totalPrices = savedOrderDetails.reduce(
  //     (acc, item) => acc + item.total_price,
  //     0,
  //   );
  //   const totalDiscountedPrices = savedOrderDetails.reduce(
  //     (acc, item) => acc + item.discounted_price,
  //     0,
  //   );
  //   const totalPrice = {
  //     totalPrices: totalPrices,
  //     totalDiscountedPrices: totalDiscountedPrices,
  //   };
  //   // return savedOrderDetails;

  //   return {
  //     message: 'Order placed successfully!',
  //     order: orderResult,
  //     orderDetails: savedOrderDetails,
  //     voucher: existVoucher,
  //     totalPrice: totalPrice,
  //   };
  // }

  async checkout(req: Request, cardId: number, payloadCheckout: Data) {
    const guest_id = (req.user as Partial<TokenUser>).sub;

    const existVoucher = await this.discoutCodeRepository.findOne({
      where: { code_discount: payloadCheckout.voucher },
    });

    const productIds = payloadCheckout.order_details.map(
      (item) => item.product_id,
    );
    const products = await this.productRepository.findBy({
      product_id: In(productIds),
    });

    for (const detail of payloadCheckout.order_details) {
      const product = products.find((p) => p.product_id === detail.product_id);
      if (!product || product.quantity < detail.quantity) {
        throw new HttpException(
          `${product.product_name} not enough`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (existVoucher) {
      if (existVoucher.use_limit === 0) {
        throw new HttpException(
          'The number of uses has expired',
          HttpStatus.BAD_REQUEST,
        );
      }
      const currentTime = Date.now();
      if (
        existVoucher.end_date &&
        currentTime > existVoucher.end_date.getTime()
      ) {
        throw new HttpException('Voucher has expired!', HttpStatus.BAD_REQUEST);
      }

      if (existVoucher.use_limit === 0) {
        throw new HttpException(
          'Voucher has run out of uses!',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (existVoucher && existVoucher.discount_scope === 'product') {
      const discountMappings = await this.discoutCodeMappingRepository.find({
        where: {
          discountCode: {
            discount_code_id: Equal(existVoucher.discount_code_id),
          },
          product: { product_id: In(productIds) },
        },
        relations: ['product'],
      });
      const mappedProductIds = discountMappings.map(
        (mapping) => mapping.product.product_id,
      );
      const allProductsAreMapped = productIds.some((productId) =>
        mappedProductIds.includes(productId),
      );
      if (!allProductsAreMapped) {
        throw new HttpException(
          'Invalid voucher for the selected products!',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const guestEntity = await this.guestRepository.findOne({
      where: { guest_id },
    });
    if (!guestEntity) {
      throw new HttpException('Guest not found!', HttpStatus.NOT_FOUND);
    }

    const order = this.orderRepository.create({
      ...payloadCheckout.order,
      guest: guestEntity,
    });

    const savedOrder = await this.orderRepository.save(order);

    for (const detail of payloadCheckout.order_details) {
      const product = products.find((p) => p.product_id === detail.product_id);

      const totalPrice = product.price * detail.quantity;
      let discounted_price =
        (product.price - (product.price * product.onSale) / 100) *
        detail.quantity;

      if (detail.engraving_checked) {
        discounted_price += 30;
      }

      const orderDetail = this.orderDetailRepository.create({
        ...detail,
        order: savedOrder,
        total_price: totalPrice,
        discounted_price: discounted_price,
      });
      await this.orderDetailRepository.save(orderDetail);

      const cartDetail = await this.cartDetailRepository.findOne({
        where: { cart_id: product.cart_id },
      });
      if (cartDetail) {
        await this.cartDetailRepository.remove(cartDetail);
      }

      product.quantity -= detail.quantity;
      await this.productRepository.save(product);

      if (existVoucher && existVoucher.use_limit) {
        existVoucher.use_limit -= 1;
        await this.discoutCodeRepository.save(existVoucher);
      }
    }

    const savedOrderDetails = await this.getOrderDetails(savedOrder.order_id);
    const totalPrice = this.calculateTotalPrice(savedOrderDetails);

    return {
      message: 'Order placed successfully!',
      order: savedOrder,
      orderDetails: savedOrderDetails,
      voucher: existVoucher,
      totalPrice: totalPrice,
    };
  }

  async findOne(order_id: number) {
    const orderResult = this.orderRepository
      .createQueryBuilder('order')
      .where({ order_id: order_id })
      .leftJoinAndSelect('order.orderDetails', 'orderDetails')
      .leftJoin('orderDetails.product', 'product')
      .addSelect([
        'product.product_id',
        'product.product_name',
        'product.primary_img',
      ])
      .getOne();
    return orderResult;
  }

  async findAll(order_id?: number, page?: number, tagValue?: string) {
    if (order_id) {
      const query = this.orderRepository.createQueryBuilder('order');

      const order = await query
        .leftJoinAndSelect('order.orderDetails', 'orderDetails')
        .leftJoin('orderDetails.product', 'product')
        .addSelect([
          'product.product_id',
          'product.product_name',
          'product.primary_img',
        ])
        .where('order.order_id = :order_id', { order_id })
        .getMany();

      return order ? { status: 200, result: order, totalPages: 1 } : null;
    }

    if (tagValue) {
      const query = this.orderRepository.createQueryBuilder('order');

      const totalCount = await query
        .leftJoinAndSelect('order.orderDetails', 'orderDetails')
        .leftJoin('orderDetails.product', 'product')
        .where('order.order_status = :tagValue', { tagValue })
        .getCount();

      const query2 = this.orderRepository.createQueryBuilder('order');

      const orderResults = await query2
        .leftJoinAndSelect('order.orderDetails', 'orderDetails')
        .leftJoin('orderDetails.product', 'product')
        .where('order.order_status = :tagValue', { tagValue }) // Thêm điều kiện where
        .addSelect([
          'product.product_id',
          'product.product_name',
          'product.primary_img',
        ])
        .skip((page - 1) * PAGE_SIZE)
        .take(PAGE_SIZE)
        .getMany();

      return { status: 200, result: orderResults, totalPages: totalCount };
    }
    const query = this.orderRepository.createQueryBuilder('order');

    const totalItems = await query.getCount();

    const orderResults = await query
      .leftJoinAndSelect('order.orderDetails', 'orderDetails')
      .leftJoin('orderDetails.product', 'product')
      .addSelect([
        'product.product_id',
        'product.product_name',
        'product.primary_img',
        'product.onSale',
      ])
      .addSelect(
        "CASE WHEN order.order_status = 'pending' THEN 1 ELSE 2 END",
        'statusPriority',
      )
      .orderBy('statusPriority', 'ASC')
      .addOrderBy('order.order_status', 'ASC')
      .addOrderBy('order.order_date', 'DESC')
      .skip((page - 1) * PAGE_SIZE)
      .take(PAGE_SIZE)
      .getMany();

    return { status: 200, result: orderResults, totalPages: totalItems };
  }

  async update(id: number, updatePaymentDto: any) {
    const orderResult = await this.orderRepository.findOne({
      where: { order_id: id },
    });
    if (!orderResult) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    if (updatePaymentDto.order_status) {
      if (!orderResult.delivery_status) {
        orderResult.order_status = updatePaymentDto.order_status;
        const saveOrder = await this.orderRepository.save(orderResult);
        return {
          status: 200,
          result: saveOrder.order_status,
        };
      }
      throw new HttpException('Invalid method', HttpStatus.METHOD_NOT_ALLOWED);
    }

    if (updatePaymentDto.deliveryStatus) {
      if (
        orderResult.order_status === 'confirmed' &&
        updatePaymentDto.deliveryStatus === 'Confirming'
      ) {
        orderResult.delivery_status = updatePaymentDto.deliveryStatus;
        const saveOrder = await this.orderRepository.save(orderResult);
        return {
          status: 200,
          result: saveOrder.delivery_status,
        };
      }
      throw new HttpException('Invalid method', HttpStatus.METHOD_NOT_ALLOWED);
    }

    return new HttpException('!____!', HttpStatus.I_AM_A_TEAPOT);
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }

  //helper
  private async getOrderDetails(order_id: number) {
    return await this.orderDetailRepository
      .createQueryBuilder('orderDetail')
      .select([
        'orderDetail.discounted_price',
        'orderDetail.engraving_checked',
        'orderDetail.engraving_content',
        'orderDetail.order_detail_id',
        'orderDetail.quantity',
        'orderDetail.total_price',
      ])
      .where('orderDetail.order_id =:order_id', { order_id })
      .leftJoin('orderDetail.product', 'product')
      .addSelect([
        'product.product_id',
        'product.product_name',
        'product.primary_img',
        'product.product_description',
        'product.onSale',
      ])
      .getMany();
  }

  private calculateTotalPrice(orderDetails: any[]) {
    const totalPrices = orderDetails.reduce(
      (acc, item) => acc + item.total_price,
      0,
    );
    const totalDiscountedPrices = orderDetails.reduce(
      (acc, item) => acc + item.discounted_price,
      0,
    );
    return {
      totalPrices,
      totalDiscountedPrices,
    };
  }

  async getOrderAnalyst() {
    const confirmStatus = await this.orderRepository
      .createQueryBuilder('order')
      .where('order.order_status =:order_status', {
        order_status: 'confirmed',
      })
      .getCount();
    const pendingStatus = await this.orderRepository
      .createQueryBuilder('order')
      .where('order.order_status =:order_status', {
        order_status: 'pending',
      })
      .getCount();
    const waitStatus = await this.orderRepository
      .createQueryBuilder('order')
      .where('order.order_status =:order_status', {
        order_status: 'Wait for confirmation',
      })
      .getCount();

    const confirmDelevery = await this.orderRepository
      .createQueryBuilder('order')
      .where('order.delivery_status =:delivery_status', {
        delivery_status: 'Confirming',
      })
      .getCount();

    const unconfirmDelevery = await this.orderRepository
      .createQueryBuilder('order')
      .where('order.delivery_status IS NULL')
      .getCount();

    const statusOrder = [pendingStatus, confirmStatus, waitStatus];
    const statusDelevery = [unconfirmDelevery, confirmDelevery];

    return {
      status: 200,
      statusOrder: statusOrder,
      statusDelevery: statusDelevery,
    };
  }
}

//helper
