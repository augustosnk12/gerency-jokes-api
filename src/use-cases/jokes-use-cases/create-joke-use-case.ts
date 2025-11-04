import { JokesRepository } from "@/repositories/jokes-repository";
import { CategoriesRepository } from "@/repositories/categories-repository";
import { Category, Joke, Prisma } from "@prisma/client";
import { mlService } from "@/services/ml-service";

interface CreateJokeUseCaseRequest {
  data: Prisma.JokeCreateInput;
}

interface CreateJokeUseCaseResponse {
  joke: Joke;
  predictedCategory?: string;
}

export class CreateJokeUseCase {
  constructor(
    private jokesRepository: JokesRepository,
    private categoriesRepository: CategoriesRepository
  ) {}

  private async findOrPredictCategory(
    categoryId?: string,
    jokeText?: string
  ): Promise<{ category: Category; predictedCategory?: string }> {
    if (categoryId) {
      const category = await this.categoriesRepository.findById(categoryId);
      if (!category) {
        throw new Error("Category not found");
      }
      return { category };
    }

    if (jokeText) {
      try {
        const predictedCategory = await mlService.predictJokeCategory(jokeText);
        const category =
          await this.categoriesRepository.findByName(predictedCategory);

        if (category) {
          return { category, predictedCategory };
        }
      } catch (error) {
        console.error("Failed to predict category:", error);
      }
    }

    throw new Error(
      "Category ID is required or could not predict a valid category"
    );
  }

  async execute({
    data,
  }: CreateJokeUseCaseRequest): Promise<CreateJokeUseCaseResponse> {
    const jokeText = [data.text, data.answer].filter(Boolean).join(" ").trim();
    const categoryId = data.category?.connect?.id;

    const { category, predictedCategory } = await this.findOrPredictCategory(
      categoryId,
      jokeText
    );

    const joke = await this.jokesRepository.create({
      ...data,
      category: {
        connect: { id: category.id },
      },
    });

    return {
      joke,
      ...(predictedCategory && { predictedCategory }),
    };
  }
}
