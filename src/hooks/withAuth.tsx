"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles?: string[]
) => {
  const AuthComponent = (props: P) => {
    const { user, token } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!token) {
        router.push("/login");
      } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        router.push("/");
      }
    }, [token, user, router]);

    if (!token) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
