import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { GetListUserDto } from './dto/get-users';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async findAll(query: GetListUserDto) {
    const { page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;

    const aggregatePipeline: any[] = [
      // {
      //   $match: {
      //     ...query,
      //   },
      // },
      {
        $lookup: {
          from: 'meetings',
          localField: '_id',
          foreignField: 'user_id',
          as: 'meetings',
          pipeline: [
            {
              $project: {
                start_day: 1,
                end_day: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          meeting_days: {
            $map: {
              input: '$meetings',
              as: 'meeting',
              in: {
                $concat: [
                  { $toString: '$$meeting.start_day' },
                  '-',
                  { $toString: '$$meeting.end_day' },
                ],
              },
            },
          },
        },
      },
      {
        $addFields: {
          total_days_without_meeting: {
            $subtract: [
              '$days',
              {
                $reduce: {
                  input: '$meetings',
                  initialValue: 0,
                  in: {
                    $add: [
                      '$$value',
                      {
                        $subtract: ['$$this.end_day', '$$this.start_day'],
                      },
                      {
                        $literal: 1,
                      },
                    ],
                  },
                },
              },
            ],
          },
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

    const data = await this.userModel
      .aggregate(aggregatePipeline, { allowDiskUse: true })
      .exec();

    return data;

    // if (limit === 0) {
    //   const result = await this.userModel.find({ ...query }).exec();

    //   return {
    //     docs: result,
    //     totalDocs: result.length,
    //     page,
    //     limit,
    //     totalPages: 1,
    //     prevPage: null,
    //     nextPage: null,
    //   };
    // }

    // const options = {
    //   page,
    //   limit,
    //   collation: {
    //     locale: 'en',
    //   },
    //   sort: {
    //     ['createdAt']: 'desc',
    //   },
    // };
    // return this.userModel.paginate({ deleted: false }, options);
  }

  findOne(id: string) {
    return this.userModel.findById(id).lean();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userModel
      .findOneAndUpdate(
        {
          _id: id,
        },
        {
          ...updateUserDto,
        },
        {
          new: true,
        },
      )
      .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
