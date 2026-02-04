import { motion } from "framer-motion";
import { FileText, Edit, Eye, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { renderMarkdown } from "@/lib/markdown";
import { SiteSetting } from "@/hooks/useSiteSettings";

const legalDocuments = [
  { key: "terms_content", label: "Terms & Conditions", description: "Legal terms for using Setupr services" },
  { key: "privacy_content", label: "Privacy Policy", description: "How we handle user data" },
  { key: "refund_content", label: "Refund Policy", description: "Refund eligibility and process" },
];

interface LegalDocumentsSectionProps {
  settings: SiteSetting[];
  onSave: (key: string, value: string) => Promise<void>;
  isPending: boolean;
}

const LegalDocumentsSection = ({ settings, onSave, isPending }: LegalDocumentsSectionProps) => {
  const [editingDoc, setEditingDoc] = useState<{ key: string; label: string } | null>(null);
  const [editContent, setEditContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const getSetting = (key: string) => settings.find((s) => s.key === key)?.value || "";

  const handleEditDocument = (key: string, label: string) => {
    setEditContent(getSetting(key));
    setEditingDoc({ key, label });
    setShowPreview(false);
  };

  const handleSaveDocument = async () => {
    if (!editingDoc) return;
    await onSave(editingDoc.key, editContent);
    setEditingDoc(null);
  };

  return (
    <>
      <AccordionItem value="legal" className="border-border/50">
        <AccordionTrigger className="hover:no-underline px-4">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-semibold">Legal Documents</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <p className="text-sm text-muted-foreground mb-4">
            Edit the content of your legal pages. Uses Markdown formatting.
          </p>
          <div className="space-y-3">
            {legalDocuments.map((doc) => (
              <motion.div
                key={doc.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-primary" />
                    <h4 className="font-medium">{doc.label}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{doc.description}</p>
                  {getSetting(doc.key) && (
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      {getSetting(doc.key).length} characters
                    </p>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditDocument(doc.key, doc.label)}
                  className="flex-shrink-0"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </motion.div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Document Editor Dialog */}
      <Dialog open={!!editingDoc} onOpenChange={(open) => !open && setEditingDoc(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Edit {editingDoc?.label}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? "Edit" : "Preview"}
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto min-h-[400px]">
            {showPreview ? (
              <div className="prose prose-invert max-w-none p-4">
                {renderMarkdown(editContent)}
              </div>
            ) : (
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[400px] font-mono text-sm resize-none"
                placeholder="Enter content using Markdown..."
              />
            )}
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setEditingDoc(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveDocument} disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LegalDocumentsSection;
