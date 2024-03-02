import { IsNotEmpty, MaxLength, Validate } from 'class-validator';
import { IsUniqueCategoryConstraint } from 'src/prisma-client-exception/validate-category-description';

export class CreateCategoryDto {
  @IsNotEmpty()
  @MaxLength(30)
  @Validate(IsUniqueCategoryConstraint)
  description: string;
}
