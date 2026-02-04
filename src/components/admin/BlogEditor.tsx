import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUpdateBlogPost, useAdminBlogCategories } from "@/hooks/useBlogAdmin";
import { useToast } from "@/hooks/use-toast";
import { Save, Eye, Pencil, X } from "lucide-react";
import type { BlogPost } from "@/hooks/useBlogPosts";

interface BlogEditorProps {
  post: BlogPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BlogEditor = ({ post, open, onOpenChange }: BlogEditorProps) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [readTimeMinutes, setReadTimeMinutes] = useState(5);
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");

  const { data: categories } = useAdminBlogCategories();
  const updatePost = useUpdateBlogPost();
  const { toast } = useToast();

  // Reset form when post changes
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSlug(post.slug);
      setExcerpt(post.excerpt);
      setContent(post.content);
      setCategory(post.category);
      setAuthorName(post.author_name);
      setReadTimeMinutes(post.read_time_minutes);
      setFeaturedImageUrl(post.featured_image_url || "");
    }
  }, [post]);

  const handleSave = async () => {
    if (!post) return;

    try {
      await updatePost.mutateAsync({
        id: post.id,
        title,
        slug,
        excerpt,
        content,
        category,
        author_name: authorName,
        read_time_minutes: readTimeMinutes,
        featured_image_url: featuredImageUrl || null,
      });

      toast({ title: "Post saved" });
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Save failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Simple markdown preview renderer
  const renderPreview = () => {
    let html = content
      // Headers
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-6 mb-2">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-8 mb-3">$1</h2>')
      // Bold
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Links
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary underline">$1</a>')
      // Blockquotes
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-primary/50 pl-4 my-4 italic text-muted-foreground">$1</blockquote>')
      // Lists
      .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4">$2</li>')
      // Paragraphs
      .split('\n\n')
      .map(p => p.startsWith('<') ? p : `<p class="mb-4">${p}</p>`)
      .join('');

    return html;
  };

  if (!post) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="w-5 h-5" />
            Edit Blog Post
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="edit" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="w-fit">
            <TabsTrigger value="edit" className="gap-2">
              <Pencil className="w-4 h-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="flex-1 overflow-auto mt-4">
            <div className="space-y-4">
              {/* Title & Slug */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt (Meta Description)</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                />
                <p className="text-xs text-muted-foreground">
                  {excerpt.length}/160 characters
                </p>
              </div>

              {/* Category & Author */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="authorName">Author</Label>
                  <Input
                    id="authorName"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="readTime">Read Time (min)</Label>
                  <Input
                    id="readTime"
                    type="number"
                    min={1}
                    value={readTimeMinutes}
                    onChange={(e) => setReadTimeMinutes(parseInt(e.target.value) || 5)}
                  />
                </div>
              </div>

              {/* Featured Image */}
              <div className="space-y-2">
                <Label htmlFor="featuredImage">Featured Image URL (optional)</Label>
                <Input
                  id="featuredImage"
                  placeholder="https://..."
                  value={featuredImageUrl}
                  onChange={(e) => setFeaturedImageUrl(e.target.value)}
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Content (Markdown)</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={20}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="flex-1 overflow-auto mt-4">
            <div className="prose prose-invert max-w-none">
              <h1 className="text-2xl font-bold mb-2">{title}</h1>
              <p className="text-muted-foreground mb-6">{excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                <span>{authorName}</span>
                <span>•</span>
                <span>{readTimeMinutes} min read</span>
                <span>•</span>
                <span className="text-primary">{category}</span>
              </div>
              <div
                className="space-y-2"
                dangerouslySetInnerHTML={{ __html: renderPreview() }}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={updatePost.isPending}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
