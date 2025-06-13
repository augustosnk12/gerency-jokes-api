import { expect, describe, it, beforeEach } from 'vitest'

import {InMemoryCategoryRepository} from "@/repositories/in-memory/in-memory-category-repository";
import {CreateCategoryUseCase} from "@/use-cases/categories-use-cases/create-category-use-case";

let categoriesRepository:InMemoryCategoryRepository
let sut: CreateCategoryUseCase

describe('Create Category Use Case', () => {
    beforeEach(() => {
        categoriesRepository = new InMemoryCategoryRepository()
        sut = new CreateCategoryUseCase(categoriesRepository)
    })

    it('should be able to create a category', async () => {
        const {category} = await sut.execute({name: 'Category 1', description: 'Dark Humor'})
        expect(category.id).toEqual(expect.any(String))
    })
})