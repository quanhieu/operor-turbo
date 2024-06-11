import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateMeetingDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNumber()
  @IsNotEmpty()
  start_day: number;

  @IsNumber()
  @IsNotEmpty()
  end_day: number;

  @IsNumber()
  @IsNotEmpty()
  room_id: number;
}
