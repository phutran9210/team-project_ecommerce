import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FilterEmptyFieldsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'object') {
      throw new BadRequestException('Expected object type for body');
    }

    const filteredValue = Object.fromEntries(
      Object.entries(value).filter(
        ([key, val]) =>
          val !== null &&
          val !== undefined &&
          val !== '' &&
          val !== 'undefined',
      ),
    );

    return filteredValue;
  }
}
