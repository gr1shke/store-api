import db from '../db/database';
import { Category, CategoryCreationParams, CategoryUpdate } from '../types';

export default class CategoryModel {
  static getAllWithOffersCount(): Promise<Category[]> {
    const categoryIdRef = db.ref('categories.id');
    const offersCount = db<Category>('offers')
      .count('*')
      .where('category_id', categoryIdRef)
      .where('active', true)
      .as('offers_count');
    return db<Category>('categories').select('*', offersCount).where('active', true);
  }

  static getById(id: number | string): Promise<Category | any> {
    return db<Category>('categories').select('*').where('id', id).first();
  }

  static getByName(name: string): Promise<Category | any> {
    return db<Category>('categories').select('*').where('name', name).first();
  }

  static create(data: CategoryCreationParams): Promise<any | void> {
    return db<Category>('categories').insert(data).returning('id');
  }

  static updateById(id: number | string, data: CategoryUpdate): Promise<any> {
    return db<Category>('categories').where('id', id).update(data, ['id']);
  }

  static deleteById(id: number | string): Promise<any> {
    return db<Category>('categories').where('id', id).del(['id']);
  }
}
