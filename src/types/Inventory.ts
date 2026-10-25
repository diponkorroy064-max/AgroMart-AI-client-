import { IProduct } from "./Product";

export type StockMovementType =
  | "initial"
  | "restock"
  | "adjustment"
  | "order_placed"
  | "order_cancelled"
  | "damaged"
  | "expired";

export interface IStockMovement {
  _id: string;
  productId: string;
  productName: string;
  sellerId: string;
  sellerName?: string;
  type: StockMovementType;
  quantityChange: number;
  previousStock: number;
  newStock: number;
  batchNumber?: string;
  reason?: string;
  orderId?: string;
  orderNumber?: string;
  performedBy: {
    userId: string;
    name: string;
    role: "seller" | "admin" | "farmer" | "system";
  };
  createdAt: string;
}

export interface InventoryItem extends IProduct {
  availableStock: number;
  reservedStock: number;
  lowStockThreshold: number;
  unit: string;
  batchNumber: string;
  warehouseLocation: string;
  stockStatus: "in_stock" | "low_stock" | "out_of_stock";
  isExpired: boolean;
  isExpiringSoon: boolean;
  seller?: {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
  };
}

export interface InventorySummary {
  totalProducts: number;
  totalStockUnits: number;
  totalStockValue: number;
  lowStockCount: number;
  outOfStockCount: number;
  expiredCount: number;
  expiringSoonCount: number;
}

export interface InventoryListResponse {
  success: boolean;
  summary: InventorySummary;
  items: InventoryItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface StockAdjustPayload {
  productId: string;
  type: "restock" | "adjustment" | "damaged" | "expired";
  quantityChange: number;
  reason?: string;
  batchNumber?: string;
  expiryDate?: string;
  warehouseLocation?: string;
}

export interface InventorySettingsPayload {
  lowStockThreshold?: number;
  batchNumber?: string;
  expiryDate?: string;
  mfgDate?: string;
  unit?: string;
  warehouseLocation?: string;
}

export interface InventoryAlertItem {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  lowStockThreshold: number;
  batchNumber?: string;
  expiryDate?: string;
  warehouseLocation?: string;
  severity: "critical" | "warning";
  message: string;
  daysLeft?: number;
}

export interface InventoryAlertsResponse {
  success: boolean;
  counts: {
    outOfStock: number;
    lowStock: number;
    expired: number;
    expiringSoon: number;
    totalAlerts: number;
  };
  outOfStockItems: InventoryAlertItem[];
  lowStockItems: InventoryAlertItem[];
  expiredItems: InventoryAlertItem[];
  expiringSoonItems: InventoryAlertItem[];
}

export interface CategoryBreakdown {
  category: string;
  productCount: number;
  totalUnits: number;
  valuation: number;
  valuationSharePercentage: string;
}

export interface InventoryReportResponse {
  success: boolean;
  reportDate: string;
  totalProducts: number;
  grandUnits: number;
  grandValuation: number;
  categoryBreakdown: CategoryBreakdown[];
  movementSummary: {
    restockedUnits: number;
    soldUnits: number;
    returnedUnits: number;
    damagedUnits: number;
  };
}
