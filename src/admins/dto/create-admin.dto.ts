import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @MaxLength(4)
  accessCode: string;
}
