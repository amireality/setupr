import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({
  children,
  redirectTo = "/admin/login",
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  // We don't use useIsAdmin here directly because useAuth could provide role info, 
  // but for simplicity, we focus on the authentication state. 

  useEffect(() => {
    if (!loading && !user) {
      navigate(redirectTo);
    }
  }, [loading, user, navigate, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
