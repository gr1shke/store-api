import { Get, Post, Route, Tags, Example, Body, Put, Delete } from 'tsoa';

import { CategoryCreationParams, Category, ApiError, ApiSuccess, CategoryUpdateParams, CategoryUpdate } from '../types';
import CategoryModel from '../models/category';

@Route('/api/v1/categories')
@Tags('Category')
export default class CategoryController {
  @Example<Category[]>([
    {
      id: 15,
      name: 'Сетевое оборудование',
      parent_id: 3,
      offers_count: 4,
    },
    {
      id: 16,
      name: 'Маршрутизаторы',
      parent_id: 15,
      offers_count: 2,
    },
    {
      id: 17,
      name: 'Сетевые хранилища',
      parent_id: 15,
      offers_count: 2,
    },
  ])
  @Get('/')
  public async get(): Promise<Category[] | ApiError> {
    try {
      let result: Category[] = [];
      let rows: Category[] = await CategoryModel.getAllWithOffersCount();

      Object.keys(rows).forEach((category: any) => {
        // @ts-ignore
        rows[category]['offers_count'] = parseInt(rows[category]['offers_count']);
      });

      const countOffers = (id: number, rows: any, recursive: boolean = false): number => {
        let count: number = 0;
        const childCategories: any[] = rows.filter((category: Category) => {
          return category.parent_id == id;
        });

        childCategories.map((category: Category) => {
          count += countOffers(category.id, rows, true);
        });

        const currentCategory: Category = rows.find((category: Category) => {
          return category.id === id;
        });

        if (recursive || childCategories.length > 0) {
          count += currentCategory.offers_count ? currentCategory.offers_count : 0;
        }

        return count;
      };

      rows.map((category: Category) => {
        let currentCategory: Category = { ...category };

        if (currentCategory.offers_count) currentCategory.offers_count += countOffers(category.id, rows);

        result.push(currentCategory);
      });

      return result;
    } catch (error) {
      return <ApiError>{ status: 500, error: error };
    }
  }

  @Example<Category>({
    id: 15,
    active: false,
    name: 'Сетевое оборудование',
    parent_id: 3,
  })
  @Post()
  public async create(@Body() data: CategoryCreationParams): Promise<Category | ApiError> {
    if (!data) return { status: 400, error: 'Пустое тело запроса' };

    const { active, name, parent_id: parentId } = data;

    if (!name) return { status: 400, error: 'Не указано название категории' };

    try {
      const category = await CategoryModel.getByName(name);
      if (category && category.name) return { status: 400, error: 'Категория с таким названием уже существует' };

      const createdCategoryId: number = (
        await CategoryModel.create({
          name: name,
          active: typeof active !== 'undefined' ? active : true,
          parent_id: parentId ? parentId : null,
        })
      )[0].id;

      return await CategoryModel.getById(createdCategoryId);
    } catch (error) {
      return <ApiError>{ status: 500, error: error };
    }
  }

  @Put()
  public async update(@Body() data: CategoryUpdateParams): Promise<ApiSuccess | ApiError> {
    if (!data) return { status: 400, error: 'Пустое тело запроса' };

    const { id } = data;

    if (!id) return { status: 400, error: 'Не указан id категории' };

    try {
      const category = await CategoryModel.getById(id);

      if (category) {
        const updateData: CategoryUpdate = { ...data };
        delete updateData.id;

        await CategoryModel.updateById(id, updateData);
        return { message: 'Категория обновлена' };
      }

      return <ApiError>{ status: 400, error: 'Категория не найдена' };
    } catch (error) {
      return <ApiError>{ status: 500, error: error };
    }
  }

  @Delete('/{id}')
  public async delete(id: number | string): Promise<ApiSuccess | ApiError> {
    try {
      const category = await CategoryModel.getById(id);

      if (category) {
        await CategoryModel.deleteById(id);
        return { message: 'Категория удалена' };
      }

      return <ApiError>{ status: 400, error: 'Категория не найдена' };
    } catch (error) {
      return <ApiError>{ status: 500, error: error };
    }
  }
}
