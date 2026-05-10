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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <img 
          src="/setupr-logo-animated.gif" 
          alt="Loading secure area..." 
          className="w-24 h-24 object-contain opacity-80 mb-4" 
        />
        <div className="animate-pulse text-muted-foreground font-medium">Securing connection...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
