import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IsUniquePhoneConstraint } from 'src/prisma-client-exception/validate-phone';

@Module({
  controllers: [UsersController],
  providers: [UsersService, IsUniquePhoneConstraint],
  imports: [PrismaModule],
})
export class UsersModule {}
