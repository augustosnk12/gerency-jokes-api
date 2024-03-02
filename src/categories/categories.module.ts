import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IsUniqueCategoryConstraint } from 'src/prisma-client-exception/validate-category-description';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, IsUniqueCategoryConstraint],
  imports: [PrismaModule],
})
export class CategoriesModule {}
