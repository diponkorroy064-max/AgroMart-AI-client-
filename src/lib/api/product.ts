import { IProduct, ProductFormData } from "@/types/Product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const uploadProductImage = async (formData: FormData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/products/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to upload image');
  }

  return response.json();
};


export const getProducts = async (): Promise<IProduct[]> => {
  const response = await fetch(`${API_URL}/products/all`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};


export const getAllProducts = async ({ search = "", category = "", sort = "", minPrice = "", maxPrice = "", page = 1 }) => {

  const params = new URLSearchParams();

  if (search)
    params.append("search", search);

  if (category)
    params.append("category", category);

  if (sort)
    params.append("sort", sort);

  if (minPrice)
    params.append("minPrice", minPrice);

  if (maxPrice)
    params.append("maxPrice", maxPrice);

  params.append("page", String(page));

  params.append("limit", "12");

  const res = await fetch(
    `${API_URL}/products?${params}`
  );
  return res.json();
};



export const createProduct = async (productData: ProductFormData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create product');
  }

  return response.json();
};


export const getSellerProducts = async (): Promise<IProduct[]> => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/products/seller`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch seller products');
  }
  return response.json();
};


export const getProductById = async (productId: string): Promise<IProduct> => {
  const response = await fetch(`${API_URL}/products/${productId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
};


export const updateProduct = async (productId: string, productData: ProductFormData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update product');
  }

  return response.json();
};

export const deleteProduct = async (productId: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete product');
  }

  return response.json();
};

