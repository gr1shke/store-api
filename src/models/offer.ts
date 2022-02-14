import db from '../db/database';
import { Offer, OfferCreationParams, OfferUpdate } from '../types';

export default class OfferModel {
  static getByCategory(categoryId: number | string): Promise<Offer[]> {
    return db<Offer>('offers').select('*').where('category_id', categoryId).where('active', true);
  }

  static get(): Promise<Offer[]> {
    return db<Offer>('offers').select('*').orderBy('category_id', 'asc');
  }

  static getById(id: number | string): Promise<Offer | any> {
    return db<Offer>('offers').select('*').where('id', id).first();
  }

  static getByName(name: string): Promise<Offer | any> {
    return db<Offer>('offers').select('*').where('name', name).first();
  }

  static create(data: OfferCreationParams): Promise<any | void> {
    return db<Offer>('offers').insert(data).returning('id');
  }

  static updateById(id: number | string, data: OfferUpdate): Promise<any> {
    return db<Offer>('offers').where('id', id).update(data, ['id']);
  }

  static deleteById(id: number | string): Promise<any> {
    return db<Offer>('offers').where('id', id).del(['id']);
  }
}
