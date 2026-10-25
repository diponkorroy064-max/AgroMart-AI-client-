export type CategoryStatus = 'active' | 'inactive';

export interface ISubcategory {
  _id: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  status: CategoryStatus;
  order: number;
  productCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  status: CategoryStatus;
  order: number;
  productCount?: number;
  subcategoryCount?: number;
  subcategories?: ISubcategory[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryFormData {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  status?: CategoryStatus;
  order?: number;
}

export interface SubcategoryFormData {
  categoryId: string;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  status?: CategoryStatus;
  order?: number;
}
