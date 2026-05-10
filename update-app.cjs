const fs = require('fs');
const file = 'c:/Users/ajmat/OneDrive - Altered/setupr_website_lovable/setupr_lovable/setupr/src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace standard imports with lazy imports
content = content.replace(/import ([A-Z][a-zA-Z0-9_]*) from "\.\/pages\/([^"]+)";/g, 'const $1 = lazy(() => import("./pages/$2"));');

// Add lazy, Suspense to react import if not there, or create one
if (!content.includes('import { lazy, Suspense } from "react";')) {
  content = 'import { lazy, Suspense } from "react";\nimport { ErrorBoundary } from "./components/ErrorBoundary";\n' + content;
}

// Add the fallback component
const fallbackStr = `
const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <img 
      src="/setupr-logo-animated.gif" 
      alt="Loading..." 
      className="w-24 h-24 object-contain opacity-80" 
    />
  </div>
);
`;

content = content.replace('const AnimatedRoutes = () => {', fallbackStr + '\nconst AnimatedRoutes = () => {');

// Wrap Routes in Suspense and ErrorBoundary
content = content.replace('<Routes location={location}>', '<ErrorBoundary><Suspense fallback={<PageFallback />}><Routes location={location}>');
content = content.replace('</Routes>', '</Routes></Suspense></ErrorBoundary>');

fs.writeFileSync(file, content);
console.log('App.tsx updated');
