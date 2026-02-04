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
  useAdminAuthors,
  useCreateAuthor,
  useUpdateAuthor,
  useDeleteAuthor,
  type Author,
} from "@/hooks/useAuthors";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Users, Save, X } from "lucide-react";

export const TeamManagement = () => {
  const { data: authors, isLoading } = useAdminAuthors();
  const createAuthor = useCreateAuthor();
  const updateAuthor = useUpdateAuthor();
  const deleteAuthor = useDeleteAuthor();
  const { toast } = useToast();

  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleOpenCreate = () => {
    setEditingAuthor(null);
    setIsCreating(true);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (author: Author) => {
    setEditingAuthor(author);
    setIsCreating(false);
    setIsDialogOpen(true);
  };

  const handleDelete = async (author: Author) => {
    if (!confirm(`Delete "${author.name}"? This cannot be undone.`)) return;

    try {
      await deleteAuthor.mutateAsync(author.id);
      toast({ title: "Team member deleted" });
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSave = async (formData: AuthorFormData) => {
    try {
      if (isCreating) {
        await createAuthor.mutateAsync(formData);
        toast({ title: "Team member created" });
      } else if (editingAuthor) {
        await updateAuthor.mutateAsync({ id: editingAuthor.id, ...formData });
        toast({ title: "Team member updated" });
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-muted-foreground" />
            Team Members ({authors?.length || 0})
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage authors and team members displayed on the website
          </p>
        </div>
        <Button size="sm" onClick={handleOpenCreate} className="gradient-accent">
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Team List */}
      {isLoading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading team members...
        </div>
      ) : authors?.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No team members yet. Add one above.
        </p>
      ) : (
        <div className="grid gap-3">
          {authors?.map((author) => (
            <div
              key={author.id}
              className="glass-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-display font-bold text-primary">
                    {author.avatar_initials}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-medium truncate">{author.name}</h4>
                    <Badge variant={author.is_active ? "default" : "secondary"}>
                      {author.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {author.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenEdit(author)}
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(author)}
                  title="Delete"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Dialog */}
      <AuthorEditorDialog
        author={editingAuthor}
        isCreating={isCreating}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSave}
        isPending={createAuthor.isPending || updateAuthor.isPending}
      />
    </div>
  );
};

// Form data type
interface AuthorFormData {
  slug: string;
  name: string;
  title: string;
  bio: string;
  avatar_initials: string;
  twitter_url: string | null;
  linkedin_url: string | null;
  is_active: boolean;
  sort_order: number;
}

interface AuthorEditorDialogProps {
  author: Author | null;
  isCreating: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: AuthorFormData) => void;
  isPending: boolean;
}

const AuthorEditorDialog = ({
  author,
  isCreating,
  open,
  onOpenChange,
  onSave,
  isPending,
}: AuthorEditorDialogProps) => {
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [avatarInitials, setAvatarInitials] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);

  // Reset form when author changes
  useState(() => {
    if (author) {
      setSlug(author.slug);
      setName(author.name);
      setTitle(author.title);
      setBio(author.bio);
      setAvatarInitials(author.avatar_initials);
      setTwitterUrl(author.twitter_url || "");
      setLinkedinUrl(author.linkedin_url || "");
      setIsActive(author.is_active);
      setSortOrder(author.sort_order);
    } else {
      setSlug("");
      setName("");
      setTitle("");
      setBio("");
      setAvatarInitials("");
      setTwitterUrl("");
      setLinkedinUrl("");
      setIsActive(true);
      setSortOrder(0);
    }
  });

  // Also reset when dialog opens with different data
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && author) {
      setSlug(author.slug);
      setName(author.name);
      setTitle(author.title);
      setBio(author.bio);
      setAvatarInitials(author.avatar_initials);
      setTwitterUrl(author.twitter_url || "");
      setLinkedinUrl(author.linkedin_url || "");
      setIsActive(author.is_active);
      setSortOrder(author.sort_order);
    } else if (newOpen && !author) {
      setSlug("");
      setName("");
      setTitle("");
      setBio("");
      setAvatarInitials("");
      setTwitterUrl("");
      setLinkedinUrl("");
      setIsActive(true);
      setSortOrder(0);
    }
    onOpenChange(newOpen);
  };

  // Auto-generate slug from name
  const handleNameChange = (newName: string) => {
    setName(newName);
    if (isCreating) {
      const autoSlug = newName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setSlug(autoSlug);
    }
    // Auto-generate initials
    const words = newName.trim().split(/\s+/);
    const initials = words
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || "")
      .join("");
    setAvatarInitials(initials);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      slug,
      name,
      title,
      bio,
      avatar_initials: avatarInitials,
      twitter_url: twitterUrl || null,
      linkedin_url: linkedinUrl || null,
      is_active: isActive,
      sort_order: sortOrder,
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {isCreating ? "Add Team Member" : "Edit Team Member"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name & Slug */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
                placeholder="Amir Khan"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                placeholder="amir-khan"
              />
            </div>
          </div>

          {/* Title & Initials */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Founder, Setupr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="initials">Avatar Initials</Label>
              <Input
                id="initials"
                value={avatarInitials}
                onChange={(e) => setAvatarInitials(e.target.value.toUpperCase())}
                maxLength={3}
                placeholder="AK"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio *</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
              rows={4}
              placeholder="Short bio about the team member..."
            />
          </div>

          {/* Social Links */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter URL</Label>
              <Input
                id="twitter"
                type="url"
                value={twitterUrl}
                onChange={(e) => setTwitterUrl(e.target.value)}
                placeholder="https://x.com/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>

          {/* Sort Order & Active */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Input
                id="sortOrder"
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="isActive">Active (visible on site)</Label>
            </div>
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
