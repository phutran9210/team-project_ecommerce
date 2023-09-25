import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DiscountForm } from './dto/create-discount.dto';
import { DiscountCode } from './entities/discount_code.entity';
import { DiscountCodeMapping } from './entities/discount_maping.entity';
import { Product } from '../product/entities/product.entity';
@Injectable()
export class DiscountService {
  constructor(
    @Inject('DISCOUNTCODE_REPOSITORY')
    private discoutCodeRepository: Repository<DiscountCode>,
    @Inject('DISCOUNTCODE_MAPPING_REPOSITORY')
    private discoutCodeMappingRepository: Repository<DiscountCodeMapping>,
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  async create(createDiscountDto: DiscountForm) {
    const existVoucher = await this.discoutCodeRepository
      .createQueryBuilder('voucher')
      .where('voucher.code_discount = :code_discount', {
        code_discount: createDiscountDto.code_discount,
      })
      .getOne();

    if (existVoucher) {
      throw new HttpException(
        'Voucher code already exists!',
        HttpStatus.CONFLICT,
      );
    }

    // Create a new DiscountCode entity
    const discountCode = this.discoutCodeRepository.create({
      code_discount: createDiscountDto.code_discount,
      discount_description: createDiscountDto.discount_description,
      discount_amount: createDiscountDto.discount_amount,
      start_date: new Date(createDiscountDto.start_date),
      end_date: new Date(createDiscountDto.end_date),
      use_limit: createDiscountDto.use_limit,
      discount_scope: createDiscountDto.discount_scope as 'product' | 'order',
    });

    const savedDiscountCode =
      await this.discoutCodeRepository.save(discountCode);

    if (
      createDiscountDto.selectedProductCategory &&
      createDiscountDto.selectedProductCategory.every((cat) =>
        ['earphones', 'headphones', 'accessories'].includes(cat),
      )
    ) {
      // Tìm tất cả sản phẩm có category_name thuộc mảng createDiscountDto.selectedProductCategory
      const productsWithSelectedCategories = await this.productRepository
        .createQueryBuilder('product')
        .innerJoin('product.categories', 'category')
        .where('category.category_name IN (:...categories)', {
          categories: createDiscountDto.selectedProductCategory,
        })
        .getMany();

      // Áp dụng mã giảm giá cho tất cả sản phẩm tìm thấy
      for (const product of productsWithSelectedCategories) {
        const discountCodeMapping = new DiscountCodeMapping();
        discountCodeMapping.discountCode = savedDiscountCode;
        discountCodeMapping.product = product;

        await this.discoutCodeMappingRepository.save(discountCodeMapping);
      }
    }

    if (createDiscountDto.selectedProductValues) {
      for (const productId of createDiscountDto.selectedProductValues) {
        const product = await this.productRepository.findOne({
          where: { product_id: productId },
        });

        if (!product) {
          throw new HttpException(
            `Product with ID ${productId} not found`,
            HttpStatus.NOT_FOUND,
          );
        }

        const discountCodeMapping = new DiscountCodeMapping();
        discountCodeMapping.discountCode = savedDiscountCode;
        discountCodeMapping.product = product;

        await this.discoutCodeMappingRepository.save(discountCodeMapping);
      }
    }

    return { status: 201, data: savedDiscountCode };
  }

  async findAll() {
    const results = await this.discoutCodeRepository
      .createQueryBuilder('discount')
      .leftJoinAndSelect(
        'discount.discountCodeMappings',
        'discountCodeMappings',
      )
      .leftJoin('discountCodeMappings.product', 'product')
      .addSelect([
        'product.product_id',
        'product.product_name',
        'product.primary_img',
      ])
      .getMany();
    return results;
  }

  findOne(id: number) {
    return `This action returns a #${id} discount`;
  }

  update(id: number, updateDiscountDto: any) {
    return `This action updates a #${id} discount`;
  }

  async remove(id: number) {
    const discountCode = await this.discoutCodeRepository.findOne({
      where: { discount_code_id: id },
      relations: ['discountCodeMappings'],
    });
    if (!discountCode) {
      throw new HttpException('Voucher not found', HttpStatus.NOT_FOUND);
    }
    if (
      discountCode.discountCodeMappings &&
      discountCode.discountCodeMappings.length > 0
    ) {
      await this.discoutCodeMappingRepository.remove(
        discountCode.discountCodeMappings,
      );
    }

    await this.discoutCodeRepository.remove(discountCode);
    return { status: 200, message: 'Success' };
  }
}
