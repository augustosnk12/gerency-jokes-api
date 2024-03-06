import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JokesModule } from './jokes/jokes.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { AdminsModule } from './admins/admins.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    PrismaModule,
    JokesModule,
    UsersModule,
    CategoriesModule,
    AdminsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
