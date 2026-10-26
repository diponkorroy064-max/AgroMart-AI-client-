import {
  ICategory,
  ISubcategory,
  CategoryFormData,
  SubcategoryFormData,
  CategoryStatus,
} from '@/types/Category';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = (customToken?: string) => {
  const token = customToken || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Fetch all categories with subcategories & product counts
 */
export const getCategories = async (
  params: {
    status?: string;
    search?: string;
  } = {},
  customToken?: string
): Promise<{ success: boolean; total: number; categories: ICategory[] }> => {
  const query = new URLSearchParams();
  if (params.status && params.status !== 'all') query.append('status', params.status);
  if (params.search && params.search.trim()) query.append('search', params.search.trim());

  const res = await fetch(`${API_URL}/categories?${query.toString()}`, {
    method: 'GET',
    headers: getAuthHeaders(customToken),
    cache: 'no-store',
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'ক্যাটাগরি তথ্য লোড করতে ব্যর্থ হয়েছে');
  }
  return data;
};

/**
 * Get single category by ID
 */
export const getCategoryById = async (id: string): Promise<{ success: boolean; category: ICategory }> => {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'ক্যাটাগরি খুঁজে পাওয়া যায়নি');
  }
  return data;
};

/**
 * Create a new category (Admin)
 */
export const createCategory = async (
  formData: CategoryFormData
): Promise<{ success: boolean; message: string; category: ICategory }> => {
  const res = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'ক্যাটাগরি তৈরি ব্যর্থ হয়েছে');
  }
  return data;
};

/**
 * Update a category (Admin)
 */
export const updateCategory = async (
  id: string,
  formData: Partial<CategoryFormData>
): Promise<{ success: boolean; message: string; category: ICategory }> => {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'ক্যাটাগরি আপডেট ব্যর্থ হয়েছে');
  }
  return data;
};

/**
 * Toggle category active/inactive status (Admin)
 */
export const toggleCategoryStatus = async (
  id: string,
  status: CategoryStatus
): Promise<{ success: boolean; message: string; status: CategoryStatus }> => {
  const res = await fetch(`${API_URL}/categories/${id}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে');
  }
  return data;
};

/**
 * Delete a category (Admin)
 */
export const deleteCategory = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'ক্যাটাগরি মুছে ফেলা সম্ভব হয়নি');
  }
  return data;
};

/**
 * Create a subcategory under parent category (Admin)
 */
export const createSubcategory = async (
  categoryId: string,
  formData: SubcategoryFormData
): Promise<{ success: boolean; message: string; subcategory: ISubcategory }> => {
  const res = await fetch(`${API_URL}/categories/${categoryId}/subcategories`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'সাব-ক্যাটাগরি তৈরি ব্যর্থ হয়েছে');
  }
  return data;
};

/**
 * Update a subcategory (Admin)
 */
export const updateSubcategory = async (
  subId: string,
  formData: Partial<SubcategoryFormData>
): Promise<{ success: boolean; message: string; subcategory: ISubcategory }> => {
  const res = await fetch(`${API_URL}/categories/subcategories/${subId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'সাব-ক্যাটাগরি আপডেট ব্যর্থ হয়েছে');
  }
  return data;
};

/**
 * Toggle subcategory status (Admin)
 */
export const toggleSubcategoryStatus = async (
  subId: string,
  status: CategoryStatus
): Promise<{ success: boolean; message: string; status: CategoryStatus }> => {
  const res = await fetch(`${API_URL}/categories/subcategories/${subId}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'সাব-ক্যাটাগরি স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে');
  }
  return data;
};

/**
 * Delete a subcategory (Admin)
 */
export const deleteSubcategory = async (
  subId: string
): Promise<{ success: boolean; message: string }> => {
  const res = await fetch(`${API_URL}/categories/subcategories/${subId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'সাব-ক্যাটাগরি মুছে ফেলা সম্ভব হয়নি');
  }
  return data;
};

/**
 * Reorder categories or subcategories (Admin)
 */
export const reorderCategories = async (
  items: { id: string; order: number }[],
  type: 'category' | 'subcategory' = 'category'
): Promise<{ success: boolean; message: string }> => {
  const res = await fetch(`${API_URL}/categories/reorder`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ items, type }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'ক্রম সাজানো সংরক্ষণ করা যায়নি');
  }
  return data;
};
