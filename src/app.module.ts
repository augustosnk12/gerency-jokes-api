import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JokesModule } from './jokes/jokes.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
@Module({
  imports: [PrismaModule, JokesModule, UsersModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
