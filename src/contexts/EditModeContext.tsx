import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useBulkUpdateSettings } from "@/hooks/useSiteSettings";
import { useToast } from "@/hooks/use-toast";

interface PendingChange {
  key: string;
  value: string;
  originalValue: string;
}

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (enabled: boolean) => void;
  pendingChanges: Map<string, PendingChange>;
  addChange: (key: string, value: string, originalValue: string) => void;
  removeChange: (key: string) => void;
  hasChanges: boolean;
  saveAllChanges: () => Promise<void>;
  discardAllChanges: () => void;
  isSaving: boolean;
  getChange: (key: string) => string | undefined;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (!context) {
    // Return a no-op context when not in provider (for public pages)
    return {
      isEditMode: false,
      toggleEditMode: () => {},
      setEditMode: () => {},
      pendingChanges: new Map(),
      addChange: () => {},
      removeChange: () => {},
      hasChanges: false,
      saveAllChanges: async () => {},
      discardAllChanges: () => {},
      isSaving: false,
      getChange: () => undefined,
    };
  }
  return context;
};

interface EditModeProviderProps {
  children: ReactNode;
}

export const EditModeProvider: React.FC<EditModeProviderProps> = ({ children }) => {
  const [isEditMode, setIsEditModeState] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Map<string, PendingChange>>(new Map());
  const [isSaving, setIsSaving] = useState(false);
  
  const bulkUpdate = useBulkUpdateSettings();
  const { toast } = useToast();

  const toggleEditMode = useCallback(() => {
    setIsEditModeState((prev) => !prev);
  }, []);

  const setEditMode = useCallback((enabled: boolean) => {
    setIsEditModeState(enabled);
  }, []);

  const addChange = useCallback((key: string, value: string, originalValue: string) => {
    setPendingChanges((prev) => {
      const next = new Map(prev);
      // If the new value equals the original, remove the change
      if (value === originalValue) {
        next.delete(key);
      } else {
        next.set(key, { key, value, originalValue });
      }
      return next;
    });
  }, []);

  const removeChange = useCallback((key: string) => {
    setPendingChanges((prev) => {
      const next = new Map(prev);
      next.delete(key);
      return next;
    });
  }, []);

  const getChange = useCallback((key: string): string | undefined => {
    return pendingChanges.get(key)?.value;
  }, [pendingChanges]);

  const hasChanges = pendingChanges.size > 0;

  const saveAllChanges = useCallback(async () => {
    if (pendingChanges.size === 0) return;
    
    setIsSaving(true);
    try {
      const updates = Array.from(pendingChanges.values()).map((change) => ({
        key: change.key,
        value: change.value,
      }));
      
      await bulkUpdate.mutateAsync(updates);
      setPendingChanges(new Map());
      toast({
        title: "Changes saved",
        description: `${updates.length} setting(s) updated successfully.`,
      });
    } catch (error: any) {
      toast({
        title: "Failed to save changes",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [pendingChanges, bulkUpdate, toast]);

  const discardAllChanges = useCallback(() => {
    setPendingChanges(new Map());
    toast({
      title: "Changes discarded",
      description: "All pending edits have been reverted.",
    });
  }, [toast]);

  return (
    <EditModeContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
        setEditMode,
        pendingChanges,
        addChange,
        removeChange,
        hasChanges,
        saveAllChanges,
        discardAllChanges,
        isSaving,
        getChange,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
};
