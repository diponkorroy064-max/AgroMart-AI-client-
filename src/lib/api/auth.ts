import { IUser, LoginData, RegisterData, AuthResponse, UpdateProfileData, UpdateProfileResponse } from "@/types/auth";
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const getFileUrl = (url?: string): string => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "")
    : "http://localhost:5000";
  return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
};

export const registerUser = async ( userData: RegisterData ): Promise<AuthResponse> => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return res.json();
};

export const loginUser = async ( userData: LoginData): Promise<AuthResponse> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return res.json();
};

export const getMe = async (token: string): Promise<IUser> => {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return res.json();
};

export interface UploadFileResponse {
  url: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
}

export const uploadAuthFile = async (
  token: string,
  file: File
): Promise<UploadFileResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/auth/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    let errorMessage = "ফাইল আপলোড করতে ব্যর্থ হয়েছে";
    try {
      const err = await res.json();
      errorMessage = err.message || errorMessage;
    } catch {
      errorMessage = `সার্ভার আপলোড ত্রুটি (${res.status})`;
    }
    throw new Error(errorMessage);
  }

  return res.json();
};

export const updateUserProfile = async (
  token: string,
  profileData: UpdateProfileData
): Promise<UpdateProfileResponse> => {
  const res = await fetch(`${API_URL}/auth/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!res.ok) {
    let errorMessage = "প্রোফাইল আপডেট করতে ব্যর্থ হয়েছে";
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      errorMessage = `সার্ভার ত্রুটি (${res.status}): অনুগ্রহ করে পুনরায় চেষ্টা করুন`;
    }
    throw new Error(errorMessage);
  }

  return res.json();
};
