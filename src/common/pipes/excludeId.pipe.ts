import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'

@Injectable()
export class ExcludeIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.id) {
      const { id, ...valueWithoutId } = value
      return valueWithoutId
    }
    return value
  }
}
