import { JokeStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsEnum,
  IsString,
  IsUUID,
  IsNumber,
} from 'class-validator';

export class CreateJokeDto {
  @IsNotEmpty()
  @IsString()
  joke: string;

  status: JokeStatus;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
