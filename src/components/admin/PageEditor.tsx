import React, { ReactNode, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { EditModeProvider, useEditMode } from "@/contexts/EditModeContext";
import { EditModeToolbar } from "@/components/admin/editable/EditModeToolbar";
import { useAuth, useIsAdmin } from "@/hooks/useAuth";

interface PageEditorWrapperProps {
  children: ReactNode;
}

/**
 * Inner component that handles edit mode URL parameter
 */
const EditModeHandler: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const { setEditMode, isEditMode } = useEditMode();

  // Enable edit mode if ?editMode=true is in URL
  useEffect(() => {
    if (searchParams.get("editMode") === "true") {
      setEditMode(true);
    }
  }, [searchParams, setEditMode]);

  return (
    <>
      {children}
      <EditModeToolbar />
      {/* Show visual indicator when edit mode is active */}
      {isEditMode && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-primary/90 text-primary-foreground text-center py-2 text-sm font-medium">
          🎨 Edit Mode Active — Click any highlighted text to edit, then save your changes
        </div>
      )}
    </>
  );
};

/**
 * Wraps a page component with edit mode capabilities.
 * Only renders edit tools for authenticated admin users.
 */
export const PageEditorWrapper: React.FC<PageEditorWrapperProps> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { data: isAdmin, isLoading: checkingAdmin } = useIsAdmin(user?.id);

  // While checking auth, just render children normally
  if (authLoading || checkingAdmin) {
    return <>{children}</>;
  }

  // Non-admin users just see the page normally
  if (!isAdmin) {
    return <>{children}</>;
  }

  // Admin users get the full edit mode experience
  return (
    <EditModeProvider>
      <EditModeHandler>{children}</EditModeHandler>
    </EditModeProvider>
  );
};

interface PageEditorProps {
  children: ReactNode;
  pageName: string;
}

/**
 * Full page editor with header controls.
 * Used in the admin dashboard for visual page editing.
 */
export const PageEditor: React.FC<PageEditorProps> = ({ children, pageName }) => {
  const { isEditMode } = useEditMode();

  return (
    <div className="relative">
      {/* Page indicator banner */}
      <div className="bg-card/50 border-b border-border/50 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            Editing: <span className="text-primary">{pageName}</span>
          </span>
          {isEditMode && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
              Click any text to edit
            </span>
          )}
        </div>
      </div>

      {/* Page content with potential edit overlays */}
      <div className={isEditMode ? "ring-1 ring-primary/20 ring-inset" : ""}>
        {children}
      </div>
    </div>
  );
};

export default PageEditorWrapper;
