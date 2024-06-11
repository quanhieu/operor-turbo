import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { BaseSchema } from 'src/shared/schemas/base.schema';

export type MeetingDocument = Meeting & Document;

@Schema({ timestamps: true, collection: 'meetings' })
export class Meeting extends BaseSchema {
  @Prop({ type: Number })
  start_day: number;

  @Prop({ type: Number })
  end_day: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  user_id: string;

  @Prop({ type: Number })
  room_id: number;
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
