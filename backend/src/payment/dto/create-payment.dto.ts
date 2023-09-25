import {
  IsString,
  IsNumber,
  IsBoolean,
  IsArray,
  ArrayNotEmpty,
  IsNotEmpty,
  IsEmail,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderDetails {
  @IsNotEmpty()
  @IsString()
  product_id: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsString()
  engraving_content: string;

  @IsNotEmpty()
  @IsBoolean()
  engraving_checked: boolean;
}

export class Order {
  @IsNotEmpty()
  @IsString()
  receiver_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @IsNotEmpty()
  @IsString()
  payment_status: string;
}

export class Data {
  @Type(() => OrderDetails)
  @IsArray()
  @ArrayNotEmpty()
  order_details: OrderDetails[];

  @IsOptional()
  @IsString()
  voucher?: string;

  @Type(() => Order)
  @IsNotEmpty()
  @ValidateNested()
  order: Order;
}
