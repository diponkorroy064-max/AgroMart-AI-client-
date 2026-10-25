export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "farmer" | "seller" | "admin";
  phone?: string;
  address?: string;
  avatar?: string;
  documentPdf?: string;
  documentName?: string;
  bio?: string;
  createdAt?: string | Date;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "farmer" | "seller" | "admin";
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  documentPdf?: string;
  documentName?: string;
  bio?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface AuthResponse {
  token: string;
  user: IUser;
}

export interface UpdateProfileResponse {
  message: string;
  user: IUser;
}

export interface IAuthContext {
  user: IUser | null;
  token: string | null;
  loading: boolean;

  login: (token: string, user: IUser) => void;
  logout: () => void;
  updateUser: (updatedUser: IUser) => void;
}
