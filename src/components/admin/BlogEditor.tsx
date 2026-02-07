import { useState, useEffect, useCallback } from "react";
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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  useUpdateBlogPost,
  useCreateBlogPost,
  useAdminBlogCategories,
} from "@/hooks/useBlogAdmin";
import { useAdminAuthors } from "@/hooks/useAuthors";
import { useToast } from "@/hooks/use-toast";
import {
  Save,
  X,
  ImageIcon,
  Bold,
  Italic,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image,
  List,
  ListOrdered,
  Quote,
  Minus,
  Code,
  Table,
  Clock,
  User,
} from "lucide-react";
import type { BlogPost } from "@/hooks/useBlogPosts";
import { renderMarkdown } from "@/lib/markdown";
import BlogThumbnail from "@/components/blog/BlogThumbnail";

interface BlogEditorProps {
  post: BlogPost | null;
  isCreating?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Toolbar button helper
const ToolbarButton = ({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}) => (
  <Button
    type="button"
    variant="ghost"
    size="sm"
    onClick={onClick}
    className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
    title={label}
  >
    <Icon className="w-4 h-4" />
  </Button>
);

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

  // Insert markdown syntax at cursor
  const insertMarkdown = useCallback(
    (prefix: string, suffix: string = "", placeholder: string = "") => {
      const textarea = document.getElementById("content-editor") as HTMLTextAreaElement;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = content.substring(start, end) || placeholder;

      const newContent =
        content.substring(0, start) + prefix + selectedText + suffix + content.substring(end);

      setContent(newContent);

      // Restore cursor position
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = start + prefix.length + selectedText.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    },
    [content]
  );

  const toolbarActions = [
    { icon: Bold, label: "Bold", action: () => insertMarkdown("**", "**", "bold text") },
    { icon: Italic, label: "Italic", action: () => insertMarkdown("*", "*", "italic text") },
    { icon: Heading2, label: "Heading 2", action: () => insertMarkdown("\n## ", "", "Heading") },
    { icon: Heading3, label: "Heading 3", action: () => insertMarkdown("\n### ", "", "Subheading") },
    { icon: LinkIcon, label: "Link", action: () => insertMarkdown("[", "](url)", "link text") },
    { icon: Image, label: "Image", action: () => insertMarkdown("![", "](image-url)", "alt text") },
    { icon: List, label: "Bullet List", action: () => insertMarkdown("\n- ", "", "List item") },
    { icon: ListOrdered, label: "Numbered List", action: () => insertMarkdown("\n1. ", "", "List item") },
    { icon: Quote, label: "Blockquote", action: () => insertMarkdown("\n> ", "", "Quote") },
    { icon: Code, label: "Inline Code", action: () => insertMarkdown("`", "`", "code") },
    { icon: Minus, label: "Horizontal Rule", action: () => insertMarkdown("\n---\n", "") },
    {
      icon: Table,
      label: "Table",
      action: () =>
        insertMarkdown(
          "\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1 | Cell 2 |\n",
          ""
        ),
    },
  ];

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
      <DialogContent className="w-full max-w-[95vw] max-h-[95vh] h-[95vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b border-border/50">
          <DialogTitle className="flex items-center justify-between">
            <span>{isCreating ? "Create New Post" : "Edit Blog Post"}</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isPending} className="gradient-accent">
                <Save className="w-4 h-4 mr-2" />
                {isPending ? "Saving..." : isCreating ? "Create Draft" : "Save Changes"}
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Metadata Row */}
        <div className="px-6 py-3 border-b border-border/30 bg-card/50">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <div className="col-span-2">
              <Input
                placeholder="Post Title *"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="font-semibold"
              />
            </div>
            <div>
              <Input
                placeholder="url-slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="font-mono text-sm"
              />
            </div>
            <div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Category" />
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
            <div>
              <Select value={authorName} onValueChange={setAuthorName}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Author" />
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
            <div>
              <Input
                placeholder="Featured Image URL"
                value={featuredImageUrl}
                onChange={(e) => {
                  setFeaturedImageUrl(e.target.value);
                  setImageError(false);
                }}
                className="text-sm"
              />
            </div>
          </div>
          <div className="mt-2">
            <Textarea
              placeholder="Meta description / excerpt (160 chars recommended)"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="resize-none text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">{excerpt.length}/160 characters</p>
          </div>
        </div>

        {/* Side-by-Side Editor */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            {/* Editor Panel */}
            <ResizablePanel defaultSize={45} minSize={30}>
              <div className="h-full flex flex-col bg-card/30">
                {/* Toolbar */}
                <div className="px-3 py-2 border-b border-border/30 flex flex-wrap gap-1">
                  {toolbarActions.map((action) => (
                    <ToolbarButton
                      key={action.label}
                      icon={action.icon}
                      label={action.label}
                      onClick={action.action}
                    />
                  ))}
                </div>

                {/* Textarea */}
                <Textarea
                  id="content-editor"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="flex-1 resize-none font-mono text-sm border-0 rounded-none focus-visible:ring-0 bg-transparent"
                  placeholder="Write your blog post using Markdown...

## Example Header

Regular paragraph with **bold** and *italic* text.

- Bullet point 1
- Bullet point 2

> A blockquote for emphasis

![Image alt text](https://example.com/image.jpg)

[Link text](https://example.com)"
                />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Preview Panel */}
            <ResizablePanel defaultSize={55} minSize={35}>
              <div className="h-full overflow-auto bg-background p-6">
                {/* Preview Header - Matches BlogPost.tsx styling */}
                <div className="max-w-3xl mx-auto">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full border border-primary/20 mb-4">
                    {category || "Category"}
                  </span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display mb-6 leading-tight">
                    {title || "Untitled Post"}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      <span className="text-primary">{authorName || "Author"}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {readTimeMinutes} min read
                    </span>
                  </div>

                  {/* Featured Image Preview */}
                  <div className="mb-10">
                    {featuredImageUrl && !imageError ? (
                      <img
                        src={featuredImageUrl}
                        alt="Featured"
                        className="w-full aspect-video object-cover rounded-2xl"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <BlogThumbnail category={category} className="aspect-video rounded-2xl" />
                    )}
                  </div>

                  {/* Content Preview - Uses same renderer as BlogPost */}
                  <div className="prose prose-invert max-w-none">
                    {content ? (
                      renderMarkdown(content)
                    ) : (
                      <p className="text-muted-foreground italic">
                        Start typing in the editor to see a live preview...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
};
