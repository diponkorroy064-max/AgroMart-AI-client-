export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: "farmer" | "seller" | "admin";
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

export interface AuthResponse {
    token: string;
    user: IUser;
}

export interface IAuthContext {
    user: IUser | null;
    token: string | null;
    loading: boolean;

    login: (token: string, user: IUser) => void;
    logout: () => void;
}

