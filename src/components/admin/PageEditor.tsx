import React, { ReactNode } from "react";
import { EditModeProvider, useEditMode } from "@/contexts/EditModeContext";
import { EditModeToolbar } from "@/components/admin/editable/EditModeToolbar";
import { useAuth, useIsAdmin } from "@/hooks/useAuth";

interface PageEditorWrapperProps {
  children: ReactNode;
}

/**
 * Wraps a page component with edit mode capabilities.
 * Only renders edit tools for authenticated admin users.
 */
export const PageEditorWrapper: React.FC<PageEditorWrapperProps> = ({ children }) => {
  const { user } = useAuth();
  const { data: isAdmin } = useIsAdmin(user?.id);

  // Non-admin users just see the page normally
  if (!isAdmin) {
    return <>{children}</>;
  }

  return (
    <EditModeProvider>
      {children}
      <EditModeToolbar />
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
