import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  useAdminBlogPosts,
  useDeleteBlogPost,
  useTogglePublishBlogPost,
} from "@/hooks/useBlogAdmin";
import { useToast } from "@/hooks/use-toast";
import { BlogEditor } from "./BlogEditor";
import {
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  FileText,
  Calendar,
  Loader2,
  Plus,
  ExternalLink,
} from "lucide-react";
import type { BlogPost } from "@/hooks/useBlogPosts";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export const BlogManagement = () => {
  const { data: posts, isLoading } = useAdminBlogPosts();
  const deletePost = useDeleteBlogPost();
  const togglePublish = useTogglePublishBlogPost();
  const { toast } = useToast();

  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;

    try {
      await deletePost.mutateAsync(post.id);
      toast({ title: "Post deleted" });
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    const newStatus = !post.is_published;
    const action = newStatus ? "publish" : "unpublish";

    if (!confirm(`${newStatus ? "Publish" : "Unpublish"} "${post.title}"?`)) return;

    try {
      await togglePublish.mutateAsync({ id: post.id, is_published: newStatus });
      toast({ title: `Post ${action}ed` });
    } catch (error: any) {
      toast({
        title: `${action} failed`,
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsCreating(false);
    setIsEditorOpen(true);
  };

  const handleCreateNew = () => {
    setEditingPost(null);
    setIsCreating(true);
    setIsEditorOpen(true);
  };

  const drafts = posts?.filter((p) => !p.is_published) || [];
  const published = posts?.filter((p) => p.is_published) || [];

  return (
    <div className="space-y-8">
      {/* Create New Post Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Create and manage blog posts manually
          </p>
        </div>
        <Button onClick={handleCreateNew} className="gradient-accent">
          <Plus className="w-4 h-4 mr-2" />
          Create New Post
        </Button>
      </div>

      {/* Drafts Section */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-muted-foreground" />
          Drafts ({drafts.length})
        </h3>

        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading posts...
          </div>
        ) : drafts.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No drafts. Click "Create New Post" to start writing.
          </p>
        ) : (
          <div className="grid gap-3">
            {drafts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onEdit={() => handleEdit(post)}
                onDelete={() => handleDelete(post)}
                onTogglePublish={() => handleTogglePublish(post)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Published Section */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary" />
          Published ({published.length})
        </h3>

        {published.length === 0 ? (
          <p className="text-muted-foreground text-sm">No published posts yet.</p>
        ) : (
          <div className="grid gap-3">
            {published.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onEdit={() => handleEdit(post)}
                onDelete={() => handleDelete(post)}
                onTogglePublish={() => handleTogglePublish(post)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Editor Dialog */}
      <BlogEditor
        post={editingPost}
        isCreating={isCreating}
        open={isEditorOpen}
        onOpenChange={setIsEditorOpen}
      />
    </div>
  );
};

interface PostCardProps {
  post: BlogPost;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePublish: () => void;
}

const PostCard = ({ post, onEdit, onDelete, onTogglePublish }: PostCardProps) => {
  return (
    <div className="glass-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-medium truncate">{post.title}</h4>
          <Badge variant={post.is_published ? "default" : "secondary"}>
            {post.is_published ? "Published" : "Draft"}
          </Badge>
          <Badge variant="outline">{post.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2 flex-wrap">
          <span>{post.author_name}</span>
          <span>•</span>
          <span>{post.read_time_minutes} min read</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {format(new Date(post.created_at), "MMM d, yyyy")}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0 self-end sm:self-start">
        {/* Preview Link (for published posts) */}
        {post.is_published && (
          <Button variant="ghost" size="sm" asChild title="View Live">
            <Link to={`/blog/${post.slug}`} target="_blank">
              <ExternalLink className="w-4 h-4" />
            </Link>
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={onEdit} title="Edit">
          <Pencil className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onTogglePublish}
          title={post.is_published ? "Unpublish" : "Publish"}
        >
          {post.is_published ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4 text-primary" />
          )}
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
