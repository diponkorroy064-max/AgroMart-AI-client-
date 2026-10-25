export type ProductStatus = 'pending' | 'approved' | 'rejected';

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  subcategory?: string;
  categoryId?: string;
  subcategoryId?: string;
  image?: string;
  status?: ProductStatus;
  farmer?: {
    _id: string;
    name: string;
    phone?: string;
  };
  farmerId?: string;
  seller?: {
    _id: string;
    name: string;
    phone?: string;
  };
  sellerId?: string;
  createdAt?: string;
  updatedAt?: string;

  // Inventory Management Fields
  reservedStock?: number;
  lowStockThreshold?: number;
  batchNumber?: string;
  expiryDate?: string;
  mfgDate?: string;
  unit?: string;
  warehouseLocation?: string;
  availableStock?: number;
  isExpired?: boolean;
  isExpiringSoon?: boolean;
  stockStatus?: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  subcategory?: string;
  categoryId?: string;
  subcategoryId?: string;
  image?: string;
  unit?: string;
  lowStockThreshold?: number;
  batchNumber?: string;
  expiryDate?: string;
  mfgDate?: string;
  warehouseLocation?: string;
}

export interface SellerProductStats {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
}
