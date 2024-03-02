import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
@ValidatorConstraint({ name: 'isUniqueCategory', async: true })
export class IsUniqueCategoryConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly categoryService: CategoriesService) {}

  async validate(category: string) {
    console.log({ category });
    if (category) {
      const categoryResponse =
        await this.categoryService.findByDescription(category);
      return !categoryResponse;
    } else return true;
  }

  defaultMessage() {
    return 'A categoria já está registrada. Tente outra.'; // Customize your error message here
  }
}
