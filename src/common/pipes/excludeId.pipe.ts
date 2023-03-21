import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ExcludeIdPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.id) {
      const { id, ...valueWithoutId } = value;
      return valueWithoutId;
    }
    return value;
  }
}
