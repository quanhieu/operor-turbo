import { Prop } from '@nestjs/mongoose';

export class BaseSchema {
  @Prop()
  createdAt?: Date;
}
