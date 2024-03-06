import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminsService {
  constructor(private prisma: PrismaService) {}
  login(accessCode: string) {
    return this.prisma.adminAccessCode.findUnique({
      where: {
        accessCode,
      },
    });
  }

  create(createAdminDto: CreateAdminDto) {
    return this.prisma.adminAccessCode.create({
      data: { ...createAdminDto, status: 'available' },
    })
  }
}
