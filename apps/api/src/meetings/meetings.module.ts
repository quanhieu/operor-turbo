import { Module } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Meeting, MeetingSchema } from './schemas/meeting.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Meeting.name,
        schema: MeetingSchema,
      },
    ]),
  ],
  controllers: [MeetingsController],
  providers: [MeetingsService],
})
export class MeetingsModule {}
