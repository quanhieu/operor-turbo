import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from 'src/shared/schemas/base.schema';
import { isEmail } from 'class-validator';

export type UserDocument = User & Document;

@Schema({ timestamps: true, collection: 'users' })
export class User extends BaseSchema {
  @Prop({ type: String })
  first_name: string;

  @Prop({ type: String })
  last_name: string;

  @Prop({
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    validate: [isEmail, 'invalid email'],
  })
  email: string;

  @Prop({ type: String })
  gender: string;

  @Prop({ type: String })
  ip_address: string;

  @Prop({ type: Number })
  days: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
