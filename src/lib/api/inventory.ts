import {
  InventoryListResponse,
  StockAdjustPayload,
  InventorySettingsPayload,
  InventoryAlertsResponse,
  InventoryReportResponse,
  IStockMovement,
} from "@/types/Inventory";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getAuthHeaders = (customToken?: string) => {
  const token = customToken || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Get inventory items with summary, filters, search & pagination
 */
export const getInventory = async (
  params: {
    search?: string;
    category?: string;
    status?: string;
    sort?: string;
    page?: number;
    limit?: number;
    sellerId?: string;
  } = {},
  customToken?: string
): Promise<InventoryListResponse> => {
  const query = new URLSearchParams();
  if (params.search) query.append("search", params.search);
  if (params.category && params.category !== "All" && params.category !== "সকল ক্যাটাগরি") {
    query.append("category", params.category);
  }
  if (params.status && params.status !== "all") query.append("status", params.status);
  if (params.sort) query.append("sort", params.sort);
  if (params.page) query.append("page", String(params.page));
  if (params.limit) query.append("limit", String(params.limit));
  if (params.sellerId) query.append("sellerId", params.sellerId);

  const response = await fetch(`${API_URL}/inventory?${query.toString()}`, {
    method: "GET",
    headers: getAuthHeaders(customToken),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "ইনভেন্টরি ডেটা লোড করতে ব্যর্থ হয়েছে");
  }

  return response.json();
};

/**
 * Adjust product stock (restock, write-off damage, manual adjustment, expired)
 */
export const adjustStock = async (payload: StockAdjustPayload, customToken?: string) => {
  const response = await fetch(`${API_URL}/inventory/adjust`, {
    method: "POST",
    headers: getAuthHeaders(customToken),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "স্টক সমন্বয় করতে ব্যর্থ হয়েছে");
  }

  return response.json();
};

/**
 * Update inventory settings (threshold, batch, expiry, unit, warehouse)
 */
export const updateInventorySettings = async (
  productId: string,
  payload: InventorySettingsPayload,
  customToken?: string
) => {
  const response = await fetch(`${API_URL}/inventory/settings/${productId}`, {
    method: "PATCH",
    headers: getAuthHeaders(customToken),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "ইনভেন্টরি সেটিংস আপডেট করতে ব্যর্থ হয়েছে");
  }

  return response.json();
};

/**
 * Get stock movement audit logs
 */
export const getStockMovements = async (
  params: {
    productId?: string;
    type?: string;
    page?: number;
    limit?: number;
    sellerId?: string;
  } = {},
  customToken?: string
): Promise<{
  success: boolean;
  movements: IStockMovement[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}> => {
  const query = new URLSearchParams();
  if (params.productId) query.append("productId", params.productId);
  if (params.type && params.type !== "all") query.append("type", params.type);
  if (params.page) query.append("page", String(params.page));
  if (params.limit) query.append("limit", String(params.limit));
  if (params.sellerId) query.append("sellerId", params.sellerId);

  const response = await fetch(`${API_URL}/inventory/movements?${query.toString()}`, {
    method: "GET",
    headers: getAuthHeaders(customToken),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "মুভমেন্ট হিস্ট্রি লোড করতে ব্যর্থ হয়েছে");
  }

  return response.json();
};

/**
 * Get stock & expiry alerts
 */
export const getInventoryAlerts = async (customToken?: string): Promise<InventoryAlertsResponse> => {
  const response = await fetch(`${API_URL}/inventory/alerts`, {
    method: "GET",
    headers: getAuthHeaders(customToken),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "অ্যালার্ট লোড করতে ব্যর্থ হয়েছে");
  }

  return response.json();
};

/**
 * Get inventory valuation and movement reports
 */
export const getInventoryReport = async (customToken?: string): Promise<InventoryReportResponse> => {
  const response = await fetch(`${API_URL}/inventory/reports`, {
    method: "GET",
    headers: getAuthHeaders(customToken),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "রিপোর্ট লোড করতে ব্যর্থ হয়েছে");
  }

  return response.json();
};
