import { PartialType } from '@nestjs/mapped-types';
import { CreateJokeDto } from './create-joke.dto';
import { JokeStatus } from '@prisma/client';
import { IsEnum, IsNotIn } from 'class-validator';

export class UpdateJokeDto extends PartialType(CreateJokeDto) {
  @IsEnum(JokeStatus)
  @IsNotIn(['new'])
  status: JokeStatus;
}
