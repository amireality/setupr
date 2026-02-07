import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";

type TagName = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "button";

interface EditableTextProps {
  settingKey: string;
  defaultValue: string;
  children?: React.ReactNode;
  tagName?: TagName;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  settingKey,
  defaultValue,
  children,
  tagName: Tag = "span",
  className,
  multiline = false,
  placeholder = "Click to edit...",
}) => {
  const { isEditMode, addChange, getChange, pendingChanges } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Get current value: pending change > provided children/defaultValue
  const displayValue = getChange(settingKey) ?? (typeof children === "string" ? children : defaultValue);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setLocalValue(displayValue);
  }, [displayValue]);

  const handleStartEdit = () => {
    if (!isEditMode) return;
    setLocalValue(displayValue);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (localValue !== displayValue) {
      addChange(settingKey, localValue, defaultValue);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      setLocalValue(displayValue);
      setIsEditing(false);
    }
  };

  // Not in edit mode - render normally
  if (!isEditMode) {
    return <Tag className={className}>{children ?? defaultValue}</Tag>;
  }

  // In edit mode but not actively editing
  if (!isEditing) {
    const hasPendingChange = pendingChanges.has(settingKey);
    
    return (
      <Tag
        className={cn(
          className,
          "relative cursor-pointer group/editable transition-all duration-200",
          "hover:outline hover:outline-2 hover:outline-dashed hover:outline-primary/50 hover:outline-offset-2",
          "rounded-sm",
          hasPendingChange && "bg-primary/10 outline outline-1 outline-primary/30"
        )}
        onClick={handleStartEdit}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleStartEdit()}
      >
        {displayValue || <span className="text-muted-foreground italic">{placeholder}</span>}
        <span className="absolute -top-2 -right-2 opacity-0 group-hover/editable:opacity-100 transition-opacity">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground">
            <Pencil className="w-3 h-3" />
          </span>
        </span>
      </Tag>
    );
  }

  // Actively editing
  const inputClassName = cn(
    "w-full bg-background border border-primary rounded-md px-2 py-1",
    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
    "text-foreground",
    className
  );

  if (multiline) {
    return (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={cn(inputClassName, "min-h-[100px] resize-y")}
        placeholder={placeholder}
      />
    );
  }

  return (
    <input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      type="text"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={handleSave}
      onKeyDown={handleKeyDown}
      className={inputClassName}
      placeholder={placeholder}
    />
  );
};

export default EditableText;
