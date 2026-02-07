import React from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Save, X, Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditModeToolbarProps {
  className?: string;
}

export const EditModeToolbar: React.FC<EditModeToolbarProps> = ({ className }) => {
  const {
    isEditMode,
    toggleEditMode,
    hasChanges,
    saveAllChanges,
    discardAllChanges,
    isSaving,
    pendingChanges,
  } = useEditMode();

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "glass-card rounded-full px-4 py-2",
        "flex items-center gap-4 shadow-lg border border-border/50",
        "backdrop-blur-xl",
        className
      )}
    >
      {/* Edit Mode Toggle */}
      <div className="flex items-center gap-2">
        <Switch
          id="edit-mode"
          checked={isEditMode}
          onCheckedChange={toggleEditMode}
          className="data-[state=checked]:bg-primary"
        />
        <Label
          htmlFor="edit-mode"
          className="text-sm font-medium cursor-pointer flex items-center gap-1.5"
        >
          {isEditMode ? (
            <>
              <Eye className="w-4 h-4 text-primary" />
              <span>Edit Mode</span>
            </>
          ) : (
            <>
              <EyeOff className="w-4 h-4 text-muted-foreground" />
              <span>Preview</span>
            </>
          )}
        </Label>
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-border/50" />

      {/* Changes Counter */}
      {hasChanges && (
        <span className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{pendingChanges.size}</span>{" "}
          unsaved change{pendingChanges.size !== 1 ? "s" : ""}
        </span>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={discardAllChanges}
          disabled={!hasChanges || isSaving}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <X className="w-4 h-4 mr-1" />
          Discard
        </Button>
        
        <Button
          size="sm"
          onClick={saveAllChanges}
          disabled={!hasChanges || isSaving}
          className="gradient-accent"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-1" />
              Save All
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default EditModeToolbar;
