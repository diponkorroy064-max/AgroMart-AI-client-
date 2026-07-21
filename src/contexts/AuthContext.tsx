"use client";
import { IAuthContext, IUser } from "@/types/auth";
import React, { createContext, useContext, useEffect, useState, } from "react";


const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  // const [user, setUser] = useState<IUser | null>(() => {
  //   if (typeof window === "undefined") return null;
  //   const storedUser = localStorage.getItem("user");
  //   return storedUser ? JSON.parse(storedUser) : null;
  // });

  const [token, setToken] = useState<string | null>(null);
  // const [token, setToken] = useState<string | null>(() => {
  //   if (typeof window === "undefined") return null;
  //   return localStorage.getItem("token");
  // });

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);


  const login = (token: string, user: IUser) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

