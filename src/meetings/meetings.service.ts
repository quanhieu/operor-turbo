import { Injectable } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { GetListMeetingDto } from './dto/get-list-meeting';
import { Meeting, MeetingDocument } from './schemas/meeting.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectModel(Meeting.name)
    private readonly meetingModel: Model<MeetingDocument>,
  ) {}

  create(createMeetingDto: CreateMeetingDto) {
    return 'This action adds a new meeting' + createMeetingDto;
  }

  findAll(query: GetListMeetingDto) {
    const { page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;

    const aggregatePipeline: any[] = [
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $facet: {
          docs: [
            { $sort: { createdAt: -1 } },
            { $skip: +offset },
            { $limit: +limit },
          ],
          total: [{ $count: 'docs' }],
        },
      },
      {
        $project: {
          docs: 1,
          totalDocs: { $first: '$total.docs' },
        },
      },
    ];

    const data = this.meetingModel
      .aggregate(aggregatePipeline, { allowDiskUse: true })
      .exec();

    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} meeting`;
  }

  update(id: number, updateMeetingDto: UpdateMeetingDto) {
    return `This action updates a #${id} meeting` + updateMeetingDto;
  }

  remove(id: number) {
    return `This action removes a #${id} meeting`;
  }
}
