import { IProduct } from "@/types/Product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface FavoriteToggleResponse {
  success: boolean;
  isFavorite: boolean;
  message: string;
}

// Toggle a product in/out of the user's favorites
export const toggleFavorite = async (
  productId: string,
  tokenParam?: string
): Promise<FavoriteToggleResponse> => {
  const token =
    tokenParam ||
    (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  if (!token) {
    throw new Error("অনুগ্রহ করে প্রথমে লগইন করুন");
  }

  const response = await fetch(`${API_URL}/favorites/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    throw new Error(data.message || "পছন্দের তালিকায় যোগ করতে ব্যর্থ হয়েছে");
  }

  return data;
};

// Check if a product is in user's favorites
export const checkIsFavorite = async (
  productId: string,
  tokenParam?: string
): Promise<boolean> => {
  const token =
    tokenParam ||
    (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  if (!token) {
    return false;
  }

  try {
    const response = await fetch(`${API_URL}/favorites/check/${productId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401 && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      return false;
    }

    const data = await response.json();
    return Boolean(data.isFavorite);
  } catch {
    return false;
  }
};

// Get all favorites for the logged in user
export const getMyFavorites = async (
  tokenParam?: string
): Promise<IProduct[]> => {
  const token =
    tokenParam ||
    (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  if (!token) {
    return [];
  }

  const response = await fetch(`${API_URL}/favorites`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    throw new Error(
      errorData.message || "পছন্দের পণ্যসমূহ লোড করতে ব্যর্থ হয়েছে"
    );
  }

  const data = await response.json();
  return data.favorites || [];
};

// Remove from favorites
export const removeFavorite = async (
  productId: string,
  tokenParam?: string
): Promise<FavoriteToggleResponse> => {
  const token =
    tokenParam ||
    (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  if (!token) {
    throw new Error("অনুগ্রহ করে প্রথমে লগইন করুন");
  }

  const response = await fetch(`${API_URL}/favorites/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    throw new Error(data.message || "পছন্দের তালিকা থেকে মুছতে ব্যর্থ হয়েছে");
  }

  return data;
};
