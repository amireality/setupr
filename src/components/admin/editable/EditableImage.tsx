import React, { useState } from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import { cn } from "@/lib/utils";
import { ImageIcon, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditableImageProps {
  settingKey: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  settingKey,
  defaultSrc,
  alt,
  className,
  containerClassName,
}) => {
  const { isEditMode, addChange, getChange, pendingChanges } = useEditMode();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [previewError, setPreviewError] = useState(false);

  // Get current value: pending change > defaultSrc
  const currentSrc = getChange(settingKey) ?? defaultSrc;
  const hasPendingChange = pendingChanges.has(settingKey);

  const handleOpenDialog = () => {
    setNewUrl(currentSrc);
    setPreviewError(false);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (newUrl && newUrl !== currentSrc) {
      addChange(settingKey, newUrl, defaultSrc);
    }
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setNewUrl("");
    setPreviewError(false);
    setIsDialogOpen(false);
  };

  // Not in edit mode - render normally
  if (!isEditMode) {
    return (
      <img
        src={currentSrc}
        alt={alt}
        className={className}
      />
    );
  }

  return (
    <>
      <div
        className={cn(
          "relative group/editable-img cursor-pointer",
          containerClassName
        )}
        onClick={handleOpenDialog}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleOpenDialog()}
      >
        <img
          src={currentSrc}
          alt={alt}
          className={cn(
            className,
            "transition-all duration-200",
            hasPendingChange && "ring-2 ring-primary ring-offset-2"
          )}
        />
        
        {/* Replace overlay */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover/editable-img:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
          <div className="flex flex-col items-center gap-2 text-foreground">
            <ImageIcon className="w-8 h-8" />
            <span className="text-sm font-medium">Replace Image</span>
          </div>
        </div>

        {/* Pending change indicator */}
        {hasPendingChange && (
          <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-primary animate-pulse" />
        )}
      </div>

      {/* Image URL Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Replace Image
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Image URL</label>
              <Input
                value={newUrl}
                onChange={(e) => {
                  setNewUrl(e.target.value);
                  setPreviewError(false);
                }}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Preview */}
            {newUrl && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Preview</label>
                <div className="relative aspect-video bg-secondary rounded-lg overflow-hidden">
                  {previewError ? (
                    <div className="absolute inset-0 flex items-center justify-center text-destructive">
                      <div className="text-center">
                        <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Failed to load image</p>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={newUrl}
                      alt="Preview"
                      className="w-full h-full object-contain"
                      onError={() => setPreviewError(true)}
                    />
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={!newUrl || previewError}
              >
                <Check className="w-4 h-4 mr-2" />
                Apply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditableImage;
