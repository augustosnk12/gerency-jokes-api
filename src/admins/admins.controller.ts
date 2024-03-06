import {
  Controller,
  Post,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';

@Controller('admins')
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() { accessCode }: LoginDto) {
    const loginResponse = await this.adminsService.login(accessCode);

    if (!loginResponse) {
      throw new NotFoundException();
    }

    return {
      access_token: await this.jwtService.signAsync({ accessCode }),
    };
  }

  @Post('create')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }
}
