import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useAdminTestimonials,
  useCreateTestimonial,
  useUpdateTestimonial,
  useDeleteTestimonial,
  useToggleFeaturedTestimonial,
  type Testimonial,
} from "@/hooks/useTestimonialAdmin";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  MessageSquare,
  Star,
  StarOff,
  Save,
  X,
} from "lucide-react";

export const TestimonialManagement = () => {
  const { data: testimonials, isLoading } = useAdminTestimonials();
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();
  const toggleFeatured = useToggleFeaturedTestimonial();
  const { toast } = useToast();

  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleOpenCreate = () => {
    setEditingTestimonial(null);
    setIsCreating(true);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setIsCreating(false);
    setIsDialogOpen(true);
  };

  const handleDelete = async (testimonial: Testimonial) => {
    if (!confirm(`Delete testimonial from "${testimonial.client_name}"?`)) return;

    try {
      await deleteTestimonial.mutateAsync(testimonial.id);
      toast({ title: "Testimonial deleted" });
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = async (testimonial: Testimonial) => {
    try {
      await toggleFeatured.mutateAsync({
        id: testimonial.id,
        is_featured: !testimonial.is_featured,
      });
      toast({
        title: testimonial.is_featured ? "Unfeatured" : "Featured",
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSave = async (formData: TestimonialFormData) => {
    try {
      if (isCreating) {
        await createTestimonial.mutateAsync(formData);
        toast({ title: "Testimonial created" });
      } else if (editingTestimonial) {
        await updateTestimonial.mutateAsync({
          id: editingTestimonial.id,
          ...formData,
        });
        toast({ title: "Testimonial updated" });
      }
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Save failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const featured = testimonials?.filter((t) => t.is_featured) || [];
  const others = testimonials?.filter((t) => !t.is_featured) || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-muted-foreground" />
            Testimonials ({testimonials?.length || 0})
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage client testimonials displayed on the website
          </p>
        </div>
        <Button size="sm" onClick={handleOpenCreate} className="gradient-accent">
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading testimonials...
        </div>
      ) : testimonials?.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No testimonials yet. Add one above.
        </p>
      ) : (
        <>
          {/* Featured Section */}
          {featured.length > 0 && (
            <div>
              <h3 className="font-display text-sm font-medium mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-primary" />
                Featured ({featured.length})
              </h3>
              <div className="grid gap-3">
                {featured.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    onEdit={() => handleOpenEdit(testimonial)}
                    onDelete={() => handleDelete(testimonial)}
                    onToggleFeatured={() => handleToggleFeatured(testimonial)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Others Section */}
          {others.length > 0 && (
            <div>
              <h3 className="font-display text-sm font-medium mb-3 text-muted-foreground">
                Others ({others.length})
              </h3>
              <div className="grid gap-3">
                {others.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    onEdit={() => handleOpenEdit(testimonial)}
                    onDelete={() => handleDelete(testimonial)}
                    onToggleFeatured={() => handleToggleFeatured(testimonial)}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Editor Dialog */}
      <TestimonialEditorDialog
        testimonial={editingTestimonial}
        isCreating={isCreating}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSave}
        isPending={createTestimonial.isPending || updateTestimonial.isPending}
      />
    </div>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFeatured: () => void;
}

const TestimonialCard = ({
  testimonial,
  onEdit,
  onDelete,
  onToggleFeatured,
}: TestimonialCardProps) => {
  return (
    <div className="glass-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <h4 className="font-medium">{testimonial.client_name}</h4>
          <Badge variant="outline">{testimonial.business_type}</Badge>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-primary text-primary" />
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-1">
          "{testimonial.quote}"
        </p>
        <p className="text-xs text-muted-foreground">
          Service: {testimonial.service_used}
        </p>
      </div>

      <div className="flex items-center gap-1 shrink-0 self-end sm:self-start">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleFeatured}
          title={testimonial.is_featured ? "Unfeature" : "Feature"}
        >
          {testimonial.is_featured ? (
            <StarOff className="w-4 h-4" />
          ) : (
            <Star className="w-4 h-4 text-primary" />
          )}
        </Button>
        <Button variant="ghost" size="sm" onClick={onEdit} title="Edit">
          <Pencil className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          title="Delete"
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

// Form data type
interface TestimonialFormData {
  client_name: string;
  business_type: string;
  service_used: string;
  quote: string;
  rating: number;
  is_featured: boolean;
  sort_order: number;
}

interface TestimonialEditorDialogProps {
  testimonial: Testimonial | null;
  isCreating: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: TestimonialFormData) => void;
  isPending: boolean;
}

const TestimonialEditorDialog = ({
  testimonial,
  isCreating,
  open,
  onOpenChange,
  onSave,
  isPending,
}: TestimonialEditorDialogProps) => {
  const [clientName, setClientName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [serviceUsed, setServiceUsed] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);
  const [isFeatured, setIsFeatured] = useState(false);
  const [sortOrder, setSortOrder] = useState(0);

  // Reset form when dialog opens
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && testimonial) {
      setClientName(testimonial.client_name);
      setBusinessType(testimonial.business_type);
      setServiceUsed(testimonial.service_used);
      setQuote(testimonial.quote);
      setRating(testimonial.rating);
      setIsFeatured(testimonial.is_featured);
      setSortOrder(testimonial.sort_order);
    } else if (newOpen && !testimonial) {
      setClientName("");
      setBusinessType("");
      setServiceUsed("");
      setQuote("");
      setRating(5);
      setIsFeatured(false);
      setSortOrder(0);
    }
    onOpenChange(newOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      client_name: clientName,
      business_type: businessType,
      service_used: serviceUsed,
      quote,
      rating,
      is_featured: isFeatured,
      sort_order: sortOrder,
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {isCreating ? "Add Testimonial" : "Edit Testimonial"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Client Name & Business Type */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name *</Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
                placeholder="Rahul Sharma"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type *</Label>
              <Input
                id="businessType"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                required
                placeholder="Tech Startup"
              />
            </div>
          </div>

          {/* Service Used */}
          <div className="space-y-2">
            <Label htmlFor="serviceUsed">Service Used *</Label>
            <Input
              id="serviceUsed"
              value={serviceUsed}
              onChange={(e) => setServiceUsed(e.target.value)}
              required
              placeholder="Company Registration"
            />
          </div>

          {/* Quote */}
          <div className="space-y-2">
            <Label htmlFor="quote">Quote *</Label>
            <Textarea
              id="quote"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              required
              rows={4}
              placeholder="What the client said about the service..."
            />
          </div>

          {/* Rating & Sort Order */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input
                id="rating"
                type="number"
                min={1}
                max={5}
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value) || 5)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Input
                id="sortOrder"
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-3">
            <Switch
              id="isFeatured"
              checked={isFeatured}
              onCheckedChange={setIsFeatured}
            />
            <Label htmlFor="isFeatured">Featured on homepage</Label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              <Save className="w-4 h-4 mr-2" />
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
