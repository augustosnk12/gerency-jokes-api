import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ApiKeyMiddleware } from 'src/middlewares/admin-middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService],
  imports: [PrismaModule],
})
export class AdminsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('/admins/create');
  }
}
