import { JokeStatus } from '@prisma/client';
import { IsNotEmpty, IsEnum, IsString } from 'class-validator';

export class CreateJokeDto {
  @IsNotEmpty()
  @IsString()
  joke: string;
  
  status: JokeStatus;
}
