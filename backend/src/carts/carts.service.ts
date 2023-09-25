import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { CartDetail } from './entities/cart-detail.entity';
import { Guest } from '../auth/entities/guest.entity';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class CartsService {
  constructor(
    @Inject('CART_REPOSITORY')
    private cartRepository: Repository<Cart>,
    @Inject('CART_DETAILS_REPOSITORY')
    private cartDetailRepository: Repository<CartDetail>,
    @Inject('GUEST_REPOSITORY')
    private guestRepository: Repository<Guest>,
  ) {}

  async findCartUser(userId: string) {
    const cart = await this.cartRepository
      .createQueryBuilder('cart')
      .select('cart.cart_id')
      .innerJoin('cart.guest', 'guest')
      .where('guest.guest_id = :guestId', { guestId: userId })
      .getOne();

    if (!cart) {
      // Tạo mới cart
      const newCart = new Cart();
      const guest = await this.guestRepository.findOne({
        where: { guest_id: userId },
      });
      newCart.guest = guest;
      const savedCart = await this.cartRepository.save(newCart);

      return {
        message: 'Create cart success',
        cart_id: savedCart.cart_id,
        status: 201,
      };
    }
    const returnItems = await this.cartDetailRepository
      .createQueryBuilder('cartDetail')
      .leftJoin('cartDetail.product', 'product')
      .addSelect([
        'product.product_id',
        'product.product_name',
        'product.product_description',
        'product.product_type',
        'product.primary_img',
        'product.price',
        'product.onSale',
        'product.sale_start',
        'product.sale_end',
      ])
      .where('cartDetail.cart_id = :cart_id', {
        cart_id: cart.cart_id,
      })
      .getMany();
    const transformedData = returnItems.map((item) => {
      const { product, ...rest } = item;
      return { ...rest, ...product };
    });

    if (transformedData.length === 0) {
      return {
        cart_id: cart.cart_id,
        status: 404,
        data: [],
      };
    }

    return {
      cart_id: cart.cart_id,
      status: 200,
      data: transformedData,
    };
  }

  async update(idCart: string, updateCartDto: UpdateCartDto) {
    const cart_detail = await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.cartDetails', 'cartDetails')
      .where('cart.cart_id = :idCart', { idCart: idCart })
      .leftJoin('cartDetails.product', 'product')
      .addSelect(['product.product_id'])
      .getOne();
    console.log(cart_detail);

    if (!cart_detail) {
      throw new HttpException('No cart found', HttpStatus.NOT_FOUND);
    }
    let cartdetail_id = '';

    if (
      cart_detail.cartDetails.length === 0 ||
      !cart_detail.cartDetails.some(
        (cart) =>
          cart.product.product_id === updateCartDto.product_id &&
          cart.engraving_checked === updateCartDto.engraving_checked &&
          cart.engraving_content === updateCartDto.engraving_content,
      )
    ) {
      const newCartDetail = new CartDetail();
      newCartDetail.cart_id = parseInt(idCart);
      newCartDetail.product = {
        product_id: updateCartDto.product_id,
      } as Product;
      newCartDetail.quantity = updateCartDto.quantity;
      newCartDetail.engraving_content = updateCartDto.engraving_content;
      newCartDetail.engraving_checked = updateCartDto.engraving_checked;

      const addedCartDetail =
        await this.cartDetailRepository.save(newCartDetail);
      cartdetail_id = addedCartDetail.cart_detail_id;
    } else {
      throw new HttpException('Duplicate', HttpStatus.FORBIDDEN);
    }

    const returnItem = await this.cartDetailRepository
      .createQueryBuilder('cartDetail')
      .leftJoinAndSelect('cartDetail.product', 'product')
      .where('cartDetail.cart_detail_id = :cart_detail_id', {
        cart_detail_id: cartdetail_id,
      })
      .andWhere('product.product_id = :product_id', {
        product_id: updateCartDto.product_id,
      })
      .select([
        'cartDetail',
        'product.product_id',
        'product.product_name',
        'product.product_description',
        'product.product_type',
        'product.primary_img',
        'product.price',
        'product.onSale',
        'product.sale_start',
        'product.sale_end',
      ])
      .getOne();

    const productDetail = returnItem.product;
    const returnResult = {
      ...returnItem,
      ...productDetail,
    };
    delete returnResult.product;
    return returnResult;
  }

  //update sản phẩm trong cart
  async updateItemCart(cardId: string, itemId: string, updateItemDto: any) {
    const item = await this.cartDetailRepository.findOne({
      where: { cart_detail_id: updateItemDto.cart_detail_id },
      relations: ['product'],
    });
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }

    if (updateItemDto.action === 'remove') {
      await this.cartDetailRepository.remove(item);
      return {
        status: 200,
        message: 'Item removed from cart',
      };
    }

    let newQuantity = item.quantity;

    if (updateItemDto.change === 1) {
      newQuantity += 1;
    } else if (updateItemDto.change === -1) {
      newQuantity -= 1;
      if (newQuantity <= 0) {
        await this.cartDetailRepository.remove(item);
        return {
          status: 200,
          message: 'Item removed from cart',
        };
      }
    } else {
      throw new HttpException('Invalid change value', HttpStatus.BAD_REQUEST);
    }

    if (newQuantity > item.product.quantity) {
      throw new HttpException('Not enough stock', HttpStatus.BAD_REQUEST);
    }

    item.quantity = newQuantity;
    const addedResult = await this.cartDetailRepository.save(item);

    return {
      status: 200,
      quantity: addedResult.quantity,
    };
  }
}
