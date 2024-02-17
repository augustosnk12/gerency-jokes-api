import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
@ValidatorConstraint({ name: 'isUniquePhone', async: true })
export class IsUniquePhoneConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {}

  async validate(phone: string, args: ValidationArguments) {
    const user = await this.userService.findByPhone(phone);
    return !user; 
  }

  defaultMessage(args: ValidationArguments) {
    return 'O número informado já está registrado. Tente outro número.'; // Customize your error message here
  }
}
