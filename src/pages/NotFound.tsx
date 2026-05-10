import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center flex flex-col items-center">
        <img 
          src="/setupr-logo-animated.gif" 
          alt="Setupr Logo" 
          className="w-32 h-32 object-contain opacity-80 mb-6" 
        />
        <h1 className="mb-2 font-display text-4xl font-bold">404</h1>
        <p className="mb-2 text-xl font-semibold">Looks like this page isn't registered yet.</p>
        <p className="mb-8 text-muted-foreground">Oops! The page you're looking for doesn't exist or has been moved.</p>
        <a 
          href="/" 
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
