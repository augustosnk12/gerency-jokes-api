import { Module } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { JokesController } from './jokes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [JokesController],
  providers: [JokesService],
  imports: [PrismaModule],
})
export class JokesModule {}
