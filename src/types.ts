export interface Category {
  id: number;
  active?: boolean;
  name: string;
  parent_id?: null | number;
  offers_count?: number;
}

export interface Offer {
  id: number;
  active?: boolean;
  name: string;
  price: number;
  description: string;
  category_id?: null | number;
}

export interface CategoryUpdate {
  id?: number;
  active?: boolean;
  name?: string;
  parent_id?: null | number;
}

export interface OfferUpdate {
  id?: number;
  active?: boolean;
  name?: string;
  price?: number;
  description?: string;
  category_id?: null | number;
}

export type CategoryCreationParams = Pick<Category, 'active' | 'name' | 'parent_id'>;
export type CategoryUpdateParams = Pick<Category, 'id' | 'active' | 'name' | 'parent_id'>;

export type OfferCreationParams = Pick<Offer, 'active' | 'name' | 'price' | 'description' | 'category_id'>;
export type OfferUpdateParams = Pick<Offer, 'id' | 'active' | 'name' | 'price' | 'description' | 'category_id'>;

export interface ApiError {
  status: number;
  error: string;
}

export interface ApiSuccess {
  message: string;
}

export interface OfferInCategory {
  count: number;
  data: Offer[];
}
