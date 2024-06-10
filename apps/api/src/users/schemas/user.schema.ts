import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from 'src/shared/schemas/base.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true, collection: 'users' })
export class User extends BaseSchema {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  ip_address: string;

  @Prop({ required: true })
  days: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
