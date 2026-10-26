import { IProduct, ProductStatus } from "@/types/Product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getAuthHeaders = (customToken?: string) => {
  const token = customToken || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export interface AdminDashboardStats {
  users: {
    total: number;
    farmers: number;
    sellers: number;
    admins: number;
  };
  products: {
    total: number;
    approved: number;
    pending: number;
    rejected: number;
  };
  orders: {
    total: number;
    pending: number;
    delivered: number;
    revenue: number;
  };
}

export interface AdminStatsResponse {
  success: boolean;
  stats: AdminDashboardStats;
  recentPendingProducts: IProduct[];
  recentOrders: any[];
}

/**
 * Get aggregated platform statistics for Admin Dashboard
 */
export const getAdminStats = async (token?: string): Promise<AdminStatsResponse> => {
  const response = await fetch(`${API_URL}/admin/stats`, {
    headers: getAuthHeaders(token),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "অ্যাডমিন পরিসংখ্যান লোড করতে ব্যর্থ হয়েছে");
  }

  return response.json();
};

/**
 * Get admin products for review
 */
export const getAdminProducts = async (
  status?: string,
  search?: string,
  token?: string
): Promise<{ products: IProduct[]; total: number }> => {
  const params = new URLSearchParams();
  if (status && status !== "all") params.append("status", status);
  if (search && search.trim()) params.append("search", search.trim());

  const response = await fetch(`${API_URL}/admin/products?${params.toString()}`, {
    headers: getAuthHeaders(token),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "অ্যাডমিন পণ্য তালিকা লোড করতে ব্যর্থ হয়েছে");
  }

  return response.json();
};

/**
 * Approve or reject a product
 */
export const updateProductStatusByAdmin = async (
  productId: string,
  status: ProductStatus,
  token?: string
) => {
  const response = await fetch(`${API_URL}/admin/products/${productId}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(token),
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "পণ্য স্ট্যাটাস আপডেট করতে ব্যর্থ হয়েছে");
  }

  return response.json();
};

/**
 * Get all users across platform
 */
export const getAdminUsers = async (token?: string) => {
  const response = await fetch(`${API_URL}/admin/users`, {
    headers: getAuthHeaders(token),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "ব্যবহারকারী তালিকা লোড করতে ব্যর্থ হয়েছে");
  }

  return response.json();
};

/**
 * Update user role by admin
 */
export const updateUserRoleByAdmin = async (userId: string, role: string, token?: string) => {
  const response = await fetch(`${API_URL}/admin/users/${userId}/role`, {
    method: "PATCH",
    headers: getAuthHeaders(token),
    body: JSON.stringify({ role }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "ব্যবহারকারীর ভূমিকা পরিবর্তন করতে ব্যর্থ হয়েছে");
  }

  return response.json();
};

/**
 * Remove/delete a user by admin
 */
export const deleteUserByAdmin = async (userId: string, token?: string) => {
  const response = await fetch(`${API_URL}/admin/users/${userId}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "ব্যবহারকারী মুছে ফেলতে ব্যর্থ হয়েছে");
  }

  return response.json();
};

/**
 * Get all orders across marketplace
 */
export const getAdminOrders = async (status?: string, search?: string, token?: string) => {
  const params = new URLSearchParams();
  if (status && status !== "all") params.append("status", status);
  if (search && search.trim()) params.append("search", search.trim());

  const response = await fetch(`${API_URL}/admin/orders?${params.toString()}`, {
    headers: getAuthHeaders(token),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "অর্ডার তালিকা লোড করতে ব্যর্থ হয়েছে");
  }

  return response.json();
};
