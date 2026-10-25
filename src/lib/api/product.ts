import { IProduct, ProductFormData, SellerProductStats } from "@/types/Product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Upload product image
 */
export const uploadProductImage = async (formData: FormData): Promise<{ image: string; url: string }> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const response = await fetch(`${API_URL}/products/upload`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "ছবি আপলোড করতে ব্যর্থ হয়েছে");
  }

  const data = await response.json();
  const imageUrl = data.image || data.url || "";
  return {
    image: imageUrl,
    url: imageUrl,
  };
};

/**
 * Get public products (simplified array)
 */
export const getProducts = async (): Promise<IProduct[]> => {
  const response = await fetch(`${API_URL}/products/all`);
  if (!response.ok) {
    throw new Error("পণ্য লোড করতে ব্যর্থ হয়েছে");
  }
  return response.json();
};

/**
 * Get public marketplace products with search, pagination, and filters
 */
export const getAllProducts = async ({
  search = "",
  category = "",
  subcategory = "",
  sort = "",
  minPrice = "",
  maxPrice = "",
  page = 1,
  limit = 15,
}: {
  search?: string;
  category?: string;
  subcategory?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: number;
  limit?: number;
} = {}) => {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (category) params.append("category", category);
  if (subcategory) params.append("subcategory", subcategory);
  if (sort) params.append("sort", sort);
  if (minPrice) params.append("minPrice", minPrice);
  if (maxPrice) params.append("maxPrice", maxPrice);
  params.append("page", String(page));
  params.append("limit", String(limit || 15));

  const res = await fetch(`${API_URL}/products?${params.toString()}`);
  if (!res.ok) {
    throw new Error("পণ্য লোড করতে ব্যর্থ হয়েছে");
  }
  return res.json();
};

/**
 * Get seller's products (Supports filter by status: 'approved' | 'pending' | 'rejected' | 'all')
 */
export const getSellerProducts = async (
  status?: string,
  search?: string
): Promise<{ products: IProduct[]; counts: SellerProductStats }> => {
  const params = new URLSearchParams();
  if (status && status !== "all") params.append("status", status);
  if (search && search.trim()) params.append("search", search.trim());

  const queryString = params.toString() ? `?${params.toString()}` : "";
  const response = await fetch(`${API_URL}/products/seller${queryString}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "বিক্রেতার পণ্য লোড করতে ব্যর্থ হয়েছে");
  }

  const data = await response.json();
  if (Array.isArray(data)) {
    return {
      products: data,
      counts: {
        total: data.length,
        approved: data.filter((p: IProduct) => p.status === "approved" || !p.status).length,
        pending: data.filter((p: IProduct) => p.status === "pending").length,
        rejected: data.filter((p: IProduct) => p.status === "rejected").length,
      },
    };
  }

  return {
    products: data.products || [],
    counts: data.counts || {
      total: data.products?.length || 0,
      approved: 0,
      pending: 0,
      rejected: 0,
    },
  };
};

/**
 * Get seller's admin-approved products directly
 */
export const getSellerApprovedProducts = async (): Promise<IProduct[]> => {
  const res = await getSellerProducts("approved");
  return res.products;
};

/**
 * Get single product by ID
 */
export const getProductById = async (productId: string): Promise<IProduct> => {
  const response = await fetch(`${API_URL}/products/${productId}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "পণ্য বিবরণ লোড করতে ব্যর্থ হয়েছে");
  }
  return response.json();
};

/**
 * Create a new product (Seller)
 */
export const createProduct = async (productData: ProductFormData) => {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "নতুন পণ্য যোগ করতে ব্যর্থ হয়েছে");
  }

  return response.json();
};

/**
 * Update product (Seller)
 */
export const updateProduct = async (
  productId: string,
  productData: Partial<ProductFormData>
) => {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "পণ্য আপডেট করতে ব্যর্থ হয়েছে");
  }

  return response.json();
};

/**
 * Delete product (Seller)
 */
export const deleteProduct = async (productId: string) => {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "পণ্য মুছে ফেলতে ব্যর্থ হয়েছে");
  }

  return response.json();
};
