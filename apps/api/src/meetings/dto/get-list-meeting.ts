import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsInt } from 'class-validator';

export class GetListMeetingDto {
  @ApiProperty({ type: Number, required: false, example: 1 })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  page?: number;

  @ApiProperty({ type: Number, required: false, example: 10 })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  limit?: number;
}
