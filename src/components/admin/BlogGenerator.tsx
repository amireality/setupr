import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGenerateBlogContent, useAdminBlogCategories } from "@/hooks/useBlogAdmin";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Loader2 } from "lucide-react";

interface BlogGeneratorProps {
  onSuccess?: () => void;
}

export const BlogGenerator = ({ onSuccess }: BlogGeneratorProps) => {
  const [category, setCategory] = useState("");
  const [topicFocus, setTopicFocus] = useState("");
  const [includeRegulatory, setIncludeRegulatory] = useState(true);
  const [includeSeo, setIncludeSeo] = useState(true);

  const { data: categories } = useAdminBlogCategories();
  const generateContent = useGenerateBlogContent();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!category) {
      toast({
        title: "Category required",
        description: "Please select a category for the blog post",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await generateContent.mutateAsync({
        category,
        topicFocus: topicFocus || undefined,
        includeRegulatory,
        includeSeo,
      });

      toast({
        title: "Draft created!",
        description: `"${result.post.title}" saved as draft. Review and publish when ready.`,
      });

      // Reset form
      setTopicFocus("");
      onSuccess?.();
    } catch (error: any) {
      toast({
        title: "Generation failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="w-5 h-5 text-primary" />
          Generate AI Content
        </CardTitle>
        <CardDescription>
          AI will research the topic and create a draft blog post for review
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
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
            <Label htmlFor="topicFocus">Topic Focus (optional)</Label>
            <Input
              id="topicFocus"
              placeholder="e.g., LLP vs OPC comparison"
              value={topicFocus}
              onChange={(e) => setTopicFocus(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="includeRegulatory"
              checked={includeRegulatory}
              onCheckedChange={(checked) => setIncludeRegulatory(checked as boolean)}
            />
            <Label htmlFor="includeRegulatory" className="text-sm font-normal cursor-pointer">
              Include latest regulatory updates
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="includeSeo"
              checked={includeSeo}
              onCheckedChange={(checked) => setIncludeSeo(checked as boolean)}
            />
            <Label htmlFor="includeSeo" className="text-sm font-normal cursor-pointer">
              SEO-optimized title & excerpt
            </Label>
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={generateContent.isPending || !category}
          className="gradient-accent w-full sm:w-auto"
        >
          {generateContent.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating (~30s)...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Content
            </>
          )}
        </Button>

        {generateContent.isPending && (
          <p className="text-sm text-muted-foreground">
            AI is researching and writing your post. This typically takes 15-30 seconds.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
