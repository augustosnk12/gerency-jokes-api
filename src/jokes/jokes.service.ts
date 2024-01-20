import { Injectable } from '@nestjs/common';
import { CreateJokeDto } from './dto/create-joke.dto';
import { UpdateJokeDto } from './dto/update-joke.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JokesService {
  constructor(private prisma: PrismaService) {}
  create(createJokeDto: CreateJokeDto) {
    return this.prisma.joke.create({
      data: { ...createJokeDto, status: 'new' },
    });
  }

  findAll() {
    return this.prisma.joke.findMany({});
  }

  findOne(id: number) {
    return this.prisma.joke.findUnique({ where: { id } });
  }

  update(id: number, updateJokeDto: UpdateJokeDto) {
    return this.prisma.joke.update({
      where: { id },
      data: updateJokeDto,
    })
  }

  remove(id: number) {
    return this.prisma.joke.delete({ where: { id } });
  }
}
