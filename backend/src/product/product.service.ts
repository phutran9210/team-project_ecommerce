import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { CategoryDto, ProductIdDto } from './dto/payloadProduct.dto';
import { Bucket } from '@google-cloud/storage';
import { Product } from './entities/product.entity';
import { ProductDetail } from './entities/product-detail.entity';
import { ProductImage } from './entities/product-image.entity';
import { ProductCoverImage } from './entities/product-cover-image.entity';
import { Category } from './entities/category.entity';
import * as stringSimilarity from 'string-similarity';
import * as moment from 'moment';

class ProductWithSimilarity extends Product {
  similarity?: number;
}

function convertDateFormat(dateString: any) {
  return moment(dateString).format('YYYY/MM/DD HH:mm:ss');
}

const PAGE_SIZE = 8;

@Injectable()
export class ProductService {
  constructor(
    @Inject('FIREBASE_BUCKET') private readonly bucket: Bucket,
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    @Inject('PRODUCT_DETAIL_REPOSITORY')
    private productDetailRepository: Repository<ProductDetail>,
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
    @Inject('PRODUCT_COVER_IMAGE_REPOSITORY')
    private productCoverImgRepository: Repository<ProductCoverImage>,
    @Inject('PRODUCT_IMAGE_REPOSITORY')
    private productImgRepository: Repository<ProductImage>,
  ) {}

  async uploadImagesToFirebase(
    req: Request,
    imageDescriptionFiles: Express.Multer.File[],
    primaryImgFiles: Express.Multer.File[],
    coverImgFiles: Express.Multer.File[],
    body: any,
  ) {
    const productInfo = JSON.parse(body.product);
    const productDetail = JSON.parse(body.detail);
    const productDetailArr = [productDetail];

    // convert sang timestamp
    if (productInfo.sale_time) {
      const sale_start = new Date(productInfo.sale_time[0]);
      const sale_end = new Date(productInfo.sale_time[1]);
      productInfo.sale_start = sale_start;
      productInfo.sale_end = sale_end;
    }

    // lấy category
    const categoriesObject = {
      category_name: productInfo.category_name,
    };
    const productCategoriArr = [categoriesObject];

    // xóa dữ liệu ko cần thiết
    delete productInfo.sale_time;
    delete productInfo.category_name;

    try {
      const imageDescriptionUrls = await this.uploadImages(
        imageDescriptionFiles,
      );
      const primaryImgUrls = await this.uploadImages(primaryImgFiles);
      const coverImgUrls = await this.uploadImages(coverImgFiles);

      const imageObjects = imageDescriptionUrls.map((url) => {
        const image = new ProductImage();
        image.image_url = url;
        return image;
      });

      const coverImageObjects = coverImgUrls.map((url) => {
        const coverImage = new ProductCoverImage();
        coverImage.image_url = url;
        return coverImage;
      });

      const newProduct = this.productRepository.create({
        ...productInfo,
        primary_img: primaryImgUrls[0],
        images: imageObjects,
        coverImages: coverImageObjects,
        details: productDetailArr,
        categories: productCategoriArr,
      });
      const addedProduct = await this.productRepository.save(newProduct);

      return { status: 201, newProduct: addedProduct };
    } catch (error) {
      console.error('Có lỗi xảy ra:', error);
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  async getByCategory(category: CategoryDto) {
    const products = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoin('category.product', 'product')
      .where('category.category_name = :categoryName', {
        categoryName: category.category,
      })
      .addSelect('product.product_id')
      .getMany();
    const productIds = products.map((item) => item.product.product_id);

    if (productIds.length === 0) {
      return {
        status: 403,
        message: 'No product in db',
      };
    }

    const results = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.details', 'details')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.categories', 'categories')
      .leftJoinAndSelect('product.coverImages', 'coverImages')
      .andWhere('product.product_id IN (:...productIds)', { productIds })
      .andWhere('product.disable_status != :disableStatus', {
        disableStatus: 1, // Sử dụng 1 thay vì true
      })
      .getMany();

    // Lọc ra các trường null trong details
    results.forEach((result) => {
      result.details.forEach((detail) => {
        for (const key in detail) {
          if (
            detail[key] === null ||
            key === 'product_id' ||
            key === 'detail_id'
          ) {
            delete detail[key];
          }
        }
      });
    });

    // viết lại images
    const modifiedResults = results.map((product) => {
      let updatedImages = [];
      let updatedCategories = [];
      let updatedCoverImages = [];

      if (product.images && Array.isArray(product.images)) {
        updatedImages = product.images.map((imageObj) => imageObj.image_url);
      }

      if (product.categories && Array.isArray(product.categories)) {
        updatedCategories = product.categories.map(
          (categoryObj) => categoryObj.category_name,
        );
      }

      if (product.coverImages && Array.isArray(product.coverImages)) {
        updatedCoverImages = product.coverImages.map(
          (imageObj) => imageObj.image_url,
        );
      }

      const dataResonse = {
        ...product,
        details: product.details[0],
        images: updatedImages,
        categories: updatedCategories,
        coverImages: updatedCoverImages,
      };

      return dataResonse;
    });

    return modifiedResults;
  }

  async getProductService(productId: ProductIdDto) {
    const results = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.details', 'details')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.categories', 'categories')
      .leftJoinAndSelect('product.coverImages', 'coverImages')
      .andWhere('product.product_id = :productId', {
        productId: productId.productId,
      })
      .andWhere('product.disable_status != :disableStatus', {
        disableStatus: 1, // Sử dụng 1 thay vì true
      })
      .getOne();

    results.details.forEach((detail) => {
      for (const key in detail) {
        if (
          detail[key] === null ||
          key === 'product_id' ||
          key === 'detail_id'
        ) {
          delete detail[key];
        }
      }
    });

    let updatedImages = [];
    let updatedCategories = [];
    let updatedCoverImages = [];

    if (results.images && Array.isArray(results.images)) {
      updatedImages = results.images.map((imageObj) => imageObj.image_url);
    }

    if (results.categories && Array.isArray(results.categories)) {
      updatedCategories = results.categories.map(
        (categoryObj) => categoryObj.category_name,
      );
    }

    if (results.coverImages && Array.isArray(results.coverImages)) {
      updatedCoverImages = results.coverImages.map(
        (imageObj) => imageObj.image_url,
      );

      const dataResponse = {
        ...results,
        details: results.details[0],
        images: updatedImages,
        categories: updatedCategories,
        coverImages: updatedCoverImages,
      };

      return dataResponse;
    }
  }

  // tìm theo tên trường trong product
  async getProperties(properties: string, valueOfProperties: string | number) {
    const condition = {};
    condition[properties] = valueOfProperties;

    const results = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.details', 'details')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.categories', 'categories')
      .leftJoinAndSelect('product.coverImages', 'coverImages')
      .andWhere(`product.${properties} = :valueOfProperties`, {
        valueOfProperties,
      })
      .andWhere('product.disable_status != :disableStatus', {
        disableStatus: 1,
      })
      .getMany();
    results.forEach((result) => {
      result.details.forEach((detail) => {
        for (const key in detail) {
          if (
            detail[key] === null ||
            key === 'product_id' ||
            key === 'detail_id'
          ) {
            delete detail[key];
          }
        }
      });
    });
    const modifiedResults = results.map((product) => {
      let updatedImages = [];
      let updatedCategories = [];
      let updatedCoverImages = [];

      if (product.images && Array.isArray(product.images)) {
        updatedImages = product.images.map((imageObj) => imageObj.image_url);
      }

      if (product.categories && Array.isArray(product.categories)) {
        updatedCategories = product.categories.map(
          (categoryObj) => categoryObj.category_name,
        );
      }

      if (product.coverImages && Array.isArray(product.coverImages)) {
        updatedCoverImages = product.coverImages.map(
          (imageObj) => imageObj.image_url,
        );
      }

      const dataResonse = {
        ...product,
        details: product.details[0],
        images: updatedImages,
        categories: updatedCategories,
        coverImages: updatedCoverImages,
      };

      return dataResonse;
    });
    return modifiedResults;
  }

  private async uploadImages(images: Express.Multer.File[]) {
    const imageUploadPromises = images.map((file) => {
      const filename = `${Date.now()}-${file.originalname}`;
      const fileUpload = this.bucket.file(filename);
      const fileBuffer = file.buffer;

      return new Promise<string>((resolve, reject) => {
        fileUpload
          .createWriteStream({
            metadata: {
              contentType: file.mimetype,
              cacheControl: 'public, max-age=31536000',
            },
            public: true,
          })
          .on('error', (error) => reject(error))
          .on('finish', () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
              this.bucket.name
            }/o/${encodeURI(filename)}?alt=media`;
            resolve(publicUrl);
          })
          .end(fileBuffer);
      });
    });

    return Promise.all(imageUploadPromises);
  }

  async searchService(searchDto: string) {
    const searchTerm = searchDto.toLowerCase().trim();

    const query = this.productRepository
      .createQueryBuilder('product')
      .select([
        'product.product_id',
        'product.product_name',
        'product.product_description',
        'product.product_type',
        'product.primary_img',
        'product.onSale',
        'product.price',
        'product.engraving', //trả thêm trường
      ])
      .leftJoin(
        'product_details',
        'details',
        'product.product_id = details.product_id',
      )
      .leftJoin('product.categories', 'category')
      .addSelect('category.category_name');

    // Tìm kiếm trong bảng products
    const productFields = ['product_name', 'product_description'];
    productFields.forEach((field) => {
      query.orWhere(`LOWER(product.${field}) LIKE :searchTerm`, {
        searchTerm: `%${searchTerm}%`,
      });
    });

    // Tìm kiếm trong bảng product_details
    const detailFields = [
      'parent_categories',
      'product_type',
      'product_description',
      'price',
      'quantity',
      'sale',
      'product_status',
      'image_description',
      'model',
      'dimensions',
      'drivers',
      'weight',
      'engraving',
      'impedance',
      'battery_life',
      'analog_headphone',
      'product_connection',
      'wired_digital_headphone',
      'cables',
      'ear_coupling',
      'talk_microphones',
      'anc_microphones',
      'atena',
      'ear_pads',
      'bluetooth_profile',
      'voice_assistant',
      'sale_time',
      'active_noise_cancelling',
      'ambient_listening_modes',
      'audio_format',
      'charging_case_battery_life',
      'charging_case_time_cable',
      'charging_case_time_wireless',
      'connectivity_between',
      'connectivity_distance',
      'earphone_battery_life',
      'earphone_charge_time',
      'material',
      'microphone_type',
      'sport_earphones',
      'waterproof_level',
      'max_output',
      'input',
      'in_the_box',
      'compatibility',
      'power_supply',
    ];
    detailFields.forEach((field) => {
      query.orWhere(`LOWER(details.${field}) LIKE :searchTerm`, {
        searchTerm: `%${searchTerm}%`,
      });
    });
    const rawResults = await query.getMany();

    const results = rawResults.map((product) => {
      const category_name =
        product.categories && product.categories[0]
          ? product.categories[0].category_name
          : null;
      delete product.categories;
      return {
        ...product,
        category_name: category_name,
      };
    });

    // const tranformResult = (await query.getMany()) as ProductWithSimilarity[];

    // tranformResult.forEach((product) => {
    //   product.similarity = stringSimilarity.compareTwoStrings(
    //     payload,
    //     product.product_name,
    //   );
    // });

    // tranformResult.sort((a, b) => b.similarity - a.similarity);

    return results;
  }

  // tìm sản phẩm để xác định voucher
  async findForProduct(payload: any) {
    const searchTerm = payload.toLowerCase().trim();
    const query = this.productRepository
      .createQueryBuilder('product')
      .select(['product.product_id', 'product.product_name'])
      .where(`LOWER(product.product_name) LIKE :searchTerm`, {
        searchTerm: `%${searchTerm}%`,
      });
    // .getMany();
    const tranformResult = (await query.getMany()) as ProductWithSimilarity[];

    tranformResult.forEach((product) => {
      product.similarity = stringSimilarity.compareTwoStrings(
        payload,
        product.product_name,
      );
    });

    tranformResult.sort((a, b) => b.similarity - a.similarity);

    return tranformResult;
  }

  async getAllProductByPage(page: number) {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.details', 'details')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.coverImages', 'coverImages')
      .leftJoinAndSelect('product.categories', 'categories')
      .skip((page - 1) * PAGE_SIZE)
      .take(PAGE_SIZE)
      .getMany();

    const productsPage = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.details', 'details')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.coverImages', 'coverImages')
      .leftJoinAndSelect('product.categories', 'categories')

      .getCount();

    return { status: 200, result: products, totalPages: productsPage };
  }

  //edit product admin
  async findProductEdit(productId: string) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.details', 'details')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.coverImages', 'coverImages')
      .leftJoinAndSelect('product.categories', 'categories')
      .where('product.product_id =:productId', { productId: productId })
      .getOne();

    return product;
  }

  //update product
  async updateProduct(product_id: string, payload: any) {
    const product = await this.productRepository.findOne({
      where: { product_id: product_id },
    });
    if (!product) {
      throw new HttpException('Product not found!', HttpStatus.NOT_FOUND);
    }

    for (let key in product) {
      if (payload.productInfo.hasOwnProperty(key)) {
        product[key] = payload.productInfo[key];
      } else {
        if (key !== 'product_id' && typeof product[key] !== 'function') {
          product[key] = null;
        }
      }
    }
    product.primary_img = payload.primaryImage[0];
    const savedProduct = await this.productRepository.save(product);

    const productDetails = await this.productDetailRepository.find({
      where: { product_id: product_id },
    });

    for (const detail of productDetails) {
      for (let key in detail) {
        if (payload.productDetails.hasOwnProperty(key)) {
          detail[key] = payload.productDetails[key];
        } else {
          if (
            key !== 'product_id' &&
            key !== 'detail_id' &&
            typeof detail[key] !== 'function'
          ) {
            detail[key] = null;
          }
        }
      }
      const savedProductDetail =
        await this.productDetailRepository.save(detail);

      const coverImage = await this.productCoverImgRepository
        .createQueryBuilder('product_cover_images')
        .where('product_cover_images.product_id = :productId', {
          productId: product_id,
        })
        .getMany();
      coverImage[0].image_url = payload.coverImages[0];
      const savedCoverImage =
        await this.productCoverImgRepository.save(coverImage);

      const images = await this.productImgRepository
        .createQueryBuilder('images')
        .where('images.product_id =:product_id', { product_id: product_id })
        .getMany();

      await this.productImgRepository.remove(images);
      const newImages = payload.descriptionImages.map((url) => {
        const newImage = new ProductImage();
        newImage.image_url = url;
        newImage.product = product;
        return newImage;
      });

      const savedImage = await this.productImgRepository.save(newImages);

      const category = await this.categoryRepository
        .createQueryBuilder('category')
        .where('category.product_id =:product_id', { product_id: product_id })
        .getMany();
      category[0].category_name = payload.productInfo.category_name;
      const savedCategoty = await this.categoryRepository.save(category);

      const convertStartSale = convertDateFormat(savedProduct.sale_start);
      const convertEndSale = convertDateFormat(savedProduct.sale_end);

      const result = {
        ...savedProduct,
        sale_start: convertStartSale,
        sale_end: convertEndSale,
        categories: savedCategoty,
        coverImages: [savedCoverImage],
        images: savedImage,
        details: [savedProductDetail],
      };

      return { status: 200, result: result };
    }
  }

  async searchAdminProduct(payload: any) {
    const searchTerm = payload.toLowerCase().trim();
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.details', 'details')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.coverImages', 'coverImages')
      .leftJoinAndSelect('product.categories', 'categories')
      .andWhere(`LOWER(product.product_name) LIKE :searchTerm`, {
        searchTerm: `%${searchTerm}%`,
      })
      .orWhere(`LOWER(product.product_description) LIKE :searchTerm`, {
        searchTerm: `%${searchTerm}%`,
      });
    // .getMany();

    const tranformResult = (await query.getMany()) as ProductWithSimilarity[];

    tranformResult.forEach((product) => {
      product.similarity = stringSimilarity.compareTwoStrings(
        payload,
        product.product_name,
      );
    });

    tranformResult.sort((a, b) => b.similarity - a.similarity);

    return tranformResult;
  }

  // data analyst dashboard
  async getAnalyst() {
    const quantityEarphone = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'categories')
      .where('categories.category_name =:category_name', {
        category_name: 'earphones',
      })
      .getCount();
    const quantityHeadphone = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'categories')
      .where('categories.category_name =:category_name', {
        category_name: 'headphones',
      })
      .getCount();

    const quantityAccessories = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'categories')
      .where('categories.category_name =:category_name', {
        category_name: 'accessories',
      })
      .getCount();

    const result = [quantityEarphone, quantityHeadphone, quantityAccessories];

    return { status: 200, result: result };
  }
}
