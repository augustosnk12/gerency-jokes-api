import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: { ...createUserDto, id: uuidv4(), status: 'active' },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: uuidv4) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByPhone(phone: string) {
    return this.prisma.user.findUnique({ where: { phone } });
  }

  update(id: uuidv4, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: uuidv4) {
    return this.prisma.user.delete({ where: { id } });
  }
}
