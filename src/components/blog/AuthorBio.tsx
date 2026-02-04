import { Link } from "react-router-dom";
import { Twitter, Linkedin } from "lucide-react";
import { useAuthorByName } from "@/hooks/useAuthors";

interface AuthorBioProps {
  authorName: string;
  compact?: boolean;
}

const AuthorBio = ({ authorName, compact = false }: AuthorBioProps) => {
  const { data: author } = useAuthorByName(authorName);

  // Generate initials fallback
  const getInitials = (name: string) => {
    const words = name.trim().split(/\s+/);
    return words
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || "")
      .join("");
  };

  const initials = author?.avatar_initials || getInitials(authorName);
  const authorSlug = author?.slug || authorName.toLowerCase().replace(/\s+/g, "-");

  if (compact) {
    return (
      <div className="flex items-center gap-3 py-3 border-t border-border/30">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-display font-bold text-primary">
            {initials}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <Link
            to={`/team/${authorSlug}`}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            <span className="text-primary">{authorName}</span>
          </Link>
          <p className="text-xs text-muted-foreground truncate">Team, Setupr</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6 mt-8">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-display font-bold text-primary">
            {initials}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Written by
            </span>
          </div>
          <Link
            to={`/team/${authorSlug}`}
            className="text-lg font-display font-semibold hover:text-primary transition-colors inline-block mb-2"
          >
            <span className="text-primary">{authorName}</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            View more articles by {authorName} on the team page.
          </p>

          {/* Links */}
          <div className="flex items-center gap-2">
            <a
              href="https://x.com/setuprhq"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md bg-secondary/50 hover:bg-secondary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-3.5 h-3.5 text-muted-foreground" />
            </a>
            <a
              href="https://linkedin.com/company/setupr"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md bg-secondary/50 hover:bg-secondary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5 text-muted-foreground" />
            </a>
            <Link
              to={`/team/${authorSlug}`}
              className="text-xs text-primary hover:underline ml-2"
            >
              View all articles →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBio;
