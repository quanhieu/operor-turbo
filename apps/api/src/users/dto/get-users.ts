import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetListUserDto {
  @ApiProperty({ type: Number, required: false, example: 1 })
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  page: number;

  @ApiProperty({ type: Number, required: false, example: 10 })
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  limit: number;
}
