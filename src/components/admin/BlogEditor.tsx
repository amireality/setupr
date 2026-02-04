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
import {
  useUpdateBlogPost,
  useCreateBlogPost,
  useAdminBlogCategories,
} from "@/hooks/useBlogAdmin";
import { useAdminAuthors } from "@/hooks/useAuthors";
import { useToast } from "@/hooks/use-toast";
import { Save, Eye, Pencil, X, ImageIcon } from "lucide-react";
import type { BlogPost } from "@/hooks/useBlogPosts";
import { renderMarkdown } from "@/lib/markdown";

interface BlogEditorProps {
  post: BlogPost | null;
  isCreating?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BlogEditor = ({
  post,
  isCreating = false,
  open,
  onOpenChange,
}: BlogEditorProps) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [readTimeMinutes, setReadTimeMinutes] = useState(5);
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [imageError, setImageError] = useState(false);

  const { data: categories } = useAdminBlogCategories();
  const { data: authors } = useAdminAuthors();
  const updatePost = useUpdateBlogPost();
  const createPost = useCreateBlogPost();
  const { toast } = useToast();

  // Reset form when post changes or dialog opens for create
  useEffect(() => {
    if (open) {
      if (post && !isCreating) {
        setTitle(post.title);
        setSlug(post.slug);
        setExcerpt(post.excerpt);
        setContent(post.content);
        setCategory(post.category);
        setAuthorName(post.author_name);
        setReadTimeMinutes(post.read_time_minutes);
        setFeaturedImageUrl(post.featured_image_url || "");
      } else if (isCreating) {
        // Reset for new post
        setTitle("");
        setSlug("");
        setExcerpt("");
        setContent("");
        setCategory(categories?.[0] || "Business Formation");
        setAuthorName(authors?.[0]?.name || "Amir Khan");
        setReadTimeMinutes(5);
        setFeaturedImageUrl("");
      }
      setImageError(false);
    }
  }, [post, isCreating, open, categories, authors]);

  // Auto-generate slug from title
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (isCreating) {
      const autoSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setSlug(autoSlug);
    }
  };

  // Auto-calculate read time from content
  useEffect(() => {
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const estimatedMinutes = Math.max(1, Math.ceil(wordCount / 200));
    setReadTimeMinutes(estimatedMinutes);
  }, [content]);

  const handleSave = async () => {
    if (!title || !slug || !content || !category || !authorName) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isCreating) {
        await createPost.mutateAsync({
          title,
          slug,
          excerpt,
          content,
          category,
          author_name: authorName,
          read_time_minutes: readTimeMinutes,
          featured_image_url: featuredImageUrl || null,
          is_published: false,
          published_at: null,
          sort_order: 0,
        });
        toast({ title: "Post created as draft" });
      } else if (post) {
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
      }
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Save failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const isPending = updatePost.isPending || createPost.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-5xl max-h-[95vh] h-[95vh] sm:h-auto sm:max-h-[90vh] overflow-hidden flex flex-col p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="w-5 h-5" />
            {isCreating ? "Create New Post" : "Edit Blog Post"}
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
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter post title..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="url-friendly-slug"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt (Meta Description) *</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                  placeholder="Brief description for SEO..."
                />
                <p className="text-xs text-muted-foreground">
                  {excerpt.length}/160 characters
                </p>
              </div>

              {/* Category & Author */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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
                  <Label htmlFor="authorName">Author *</Label>
                  <Select value={authorName} onValueChange={setAuthorName}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      {authors?.map((author) => (
                        <SelectItem key={author.id} value={author.name}>
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="readTime">Read Time (min)</Label>
                  <Input
                    id="readTime"
                    type="number"
                    min={1}
                    value={readTimeMinutes}
                    onChange={(e) =>
                      setReadTimeMinutes(parseInt(e.target.value) || 5)
                    }
                  />
                </div>
              </div>

              {/* Featured Image */}
              <div className="space-y-2">
                <Label htmlFor="featuredImage">Featured Image URL (optional)</Label>
                <Input
                  id="featuredImage"
                  placeholder="https://example.com/image.jpg"
                  value={featuredImageUrl}
                  onChange={(e) => {
                    setFeaturedImageUrl(e.target.value);
                    setImageError(false);
                  }}
                />
                {featuredImageUrl && (
                  <div className="mt-2">
                    {imageError ? (
                      <div className="flex items-center gap-2 text-sm text-destructive">
                        <ImageIcon className="w-4 h-4" />
                        Failed to load image
                      </div>
                    ) : (
                      <img
                        src={featuredImageUrl}
                        alt="Featured preview"
                        className="max-h-32 rounded-lg object-cover"
                        onError={() => setImageError(true)}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Content (Markdown) *</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={16}
                  className="font-mono text-sm"
                  placeholder="Write your blog post content using Markdown...

## Example Header

Regular paragraph with **bold** and *italic* text.

- Bullet point 1
- Bullet point 2

> A blockquote for emphasis

![Image alt text](https://example.com/image.jpg)

[Link text](https://example.com)
"
                />
                <p className="text-xs text-muted-foreground">
                  Supports: ## Headers, **bold**, *italic*, [links](url),
                  ![images](url), - lists, {">"} quotes, --- horizontal rules,
                  `code`, | tables |
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="flex-1 overflow-auto mt-4">
            <div className="prose prose-invert max-w-none">
              <h1 className="text-2xl font-bold mb-2">{title || "Untitled"}</h1>
              <p className="text-muted-foreground mb-6">
                {excerpt || "No excerpt provided"}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                <span>{authorName || "Unknown Author"}</span>
                <span>•</span>
                <span>{readTimeMinutes} min read</span>
                <span>•</span>
                <span className="text-primary">{category || "Uncategorized"}</span>
              </div>
              {featuredImageUrl && !imageError && (
                <img
                  src={featuredImageUrl}
                  alt="Featured"
                  className="w-full rounded-xl mb-8"
                />
              )}
              <div className="space-y-2">{renderMarkdown(content)}</div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            <Save className="w-4 h-4 mr-2" />
            {isPending
              ? "Saving..."
              : isCreating
              ? "Create Draft"
              : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
