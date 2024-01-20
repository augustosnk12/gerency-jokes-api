import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JokesModule } from './jokes/jokes.module';

@Module({
  imports: [PrismaModule, JokesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
