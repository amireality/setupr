import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
          <div className="w-24 h-24 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6">
            <span className="text-4xl">⚠️</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Something went wrong</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            An unexpected error occurred while loading this page. Our team has been notified.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
