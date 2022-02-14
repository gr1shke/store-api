import { Get, Post, Route, Tags, Example, Body, Put, Delete, Query } from 'tsoa';

import {
  ApiError,
  ApiSuccess,
  Offer,
  OfferCreationParams,
  OfferInCategory,
  OfferUpdate,
  OfferUpdateParams,
} from '../types';
import OfferModel from '../models/offer';

@Route('/api/v1/offers')
@Tags('Offer')
export default class OfferController {
  @Example<Offer[]>([
    {
      id: 20,
      name: 'Сетевое хранилище WD',
      price: 4000,
      description: 'Описание сетевого хранилища',
      category_id: 15,
    },
    {
      id: 21,
      name: 'Маршрутизатор D-Link',
      price: 2000,
      description: 'Описание маршрутизатора',
      category_id: 16,
    },
  ])
  @Get('/')
  public async get(@Query() categoryId: number | string | null = null): Promise<Offer[] | OfferInCategory | ApiError> {
    try {
      if (categoryId) {
        const offersInCategory: Offer[] = await OfferModel.getByCategory(categoryId);

        return <OfferInCategory>{ count: offersInCategory.length, data: offersInCategory };
      }

      return OfferModel.get();
    } catch (error) {
      return <ApiError>{ status: 500, error: error };
    }
  }

  @Example<Offer>({
    id: 20,
    name: 'Сетевое хранилище WD',
    price: 4000,
    description: 'Описание сетевого хранилища',
    category_id: 15,
  })
  @Post()
  public async create(@Body() data: OfferCreationParams): Promise<Offer | ApiError> {
    if (!data) return { status: 400, error: 'Пустое тело запроса' };

    const { active, name, price, description, category_id: categoryId } = data;

    if (!name) return { status: 400, error: 'Не указано название товара' };

    try {
      const category = await OfferModel.getByName(name);
      if (category && category.name) return { status: 400, error: 'Товар с таким названием уже существует' };

      const createdCategoryId: number = (
        await OfferModel.create({
          name: name,
          active: typeof active !== 'undefined' ? active : true,
          price: price ? price : 0,
          description: description ? description : '',
          category_id: categoryId ? categoryId : null,
        })
      )[0].id;

      return await OfferModel.getById(createdCategoryId);
    } catch (error) {
      return <ApiError>{ status: 500, error: error };
    }
  }

  @Put()
  public async update(@Body() data: OfferUpdateParams): Promise<ApiSuccess | ApiError> {
    if (!data) return { status: 400, error: 'Пустое тело запроса' };

    const { id } = data;

    if (!id) return { status: 400, error: 'Не указан id товара' };

    try {
      const category = await OfferModel.getById(id);

      if (category) {
        const updateData: OfferUpdate = { ...data };
        delete updateData.id;

        if (typeof updateData.category_id !== 'undefined') {
          updateData.category_id = null;
        }

        await OfferModel.updateById(id, updateData);
        return { message: 'Товар обновлен' };
      }

      return <ApiError>{ status: 400, error: 'Товар не найден' };
    } catch (error) {
      return <ApiError>{ status: 500, error: error };
    }
  }

  @Delete('/{id}')
  public async delete(id: number | string): Promise<ApiSuccess | ApiError> {
    try {
      const category = await OfferModel.getById(id);

      if (category) {
        await OfferModel.deleteById(id);
        return { message: 'Товар удален' };
      }

      return <ApiError>{ status: 400, error: 'Товар не найден' };
    } catch (error) {
      return <ApiError>{ status: 500, error: error };
    }
  }
}
