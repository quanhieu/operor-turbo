import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from 'src/shared/schemas/base.schema';
import { Ref } from 'src/shared/schemas/mongoose.type';
import { User } from 'src/users/schemas/user.schema';

export type MeetingDocument = User & Document;

@Schema({ timestamps: true, collection: 'meetings' })
export class Meeting extends BaseSchema {
  @Prop({ required: true })
  start_day: number;

  @Prop({ required: true })
  end_day: number;

  @Prop({ required: true })
  user_id: Ref<User>;

  @Prop({ required: true })
  room_id: number;
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
