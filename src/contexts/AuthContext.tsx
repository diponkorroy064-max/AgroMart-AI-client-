"use client";
import { IAuthContext, IUser } from "@/types/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "@/lib/api/auth";

const AuthContext = createContext<IAuthContext | null>(null);

function isJwtExpired(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;
    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) return false;
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
}

function setAuthCookie(token: string | null) {
  if (typeof document === "undefined") return;
  if (token) {
    document.cookie = `token=${encodeURIComponent(token)}; path=/; max-age=604800; SameSite=Lax`;
  } else {
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        if (isJwtExpired(storedToken)) {
          console.warn("সেশনের মেয়াদ শেষ হয়েছে, পুনরায় লগইন করুন।");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setAuthCookie(null);
          setToken(null);
          setUser(null);
        } else {
          setAuthCookie(storedToken);
          setToken(storedToken);
          const parsed = JSON.parse(storedUser);
          setUser(parsed);

          // Synchronize fresh user profile (including avatar) in background
          getMe(storedToken)
            .then((freshUser) => {
              if (freshUser && freshUser._id) {
                setUser(freshUser);
                try {
                  localStorage.setItem("user", JSON.stringify(freshUser));
                } catch {
                  // Safe fallback
                }
              }
            })
            .catch(() => {
              // Ignore background sync errors
            });
        }
      }
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (newToken: string, newUser: IUser) => {
    setAuthCookie(newToken);
    setToken(newToken);
    setUser(newUser);
    try {
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch {
      // LocalStorage quota or access error handled safely
    }
  };

  const logout = () => {
    setAuthCookie(null);
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch {
      // Ignore
    }
  };

  const updateUser = (updatedUser: IUser) => {
    setUser(updatedUser);
    try {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch {
      // LocalStorage error handled safely
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const defaultAuthContext: IAuthContext = {
  user: null,
  token: null,
  loading: false,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return defaultAuthContext;
  }
  return context;
};
