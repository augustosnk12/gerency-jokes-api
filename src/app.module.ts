import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JokesModule } from './jokes/jokes.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [PrismaModule, JokesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
