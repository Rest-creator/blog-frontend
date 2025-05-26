
import { Link } from "react-router-dom";
import { Article } from "@/lib/mockData";
import { BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <div 
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md",
        featured && "md:flex-row"
      )}
    >
      <div className={cn(
        "relative aspect-video w-full overflow-hidden",
        featured && "md:w-2/5"
      )}>
        <Link to={`/article/${article.id}`}>
          <img
            src={article.coverImage}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 rounded-full bg-background/80 backdrop-blur-sm"
          aria-label="Bookmark article"
        >
          <BookmarkCheck className="h-4 w-4" />
        </Button>
      </div>
      
      <div className={cn(
        "flex flex-1 flex-col p-4",
        featured && "md:p-6"
      )}>
        <div className="mb-2 flex items-center space-x-2">
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <Link to={`/profile/${article.author.id}`} className="text-sm font-medium hover:underline">
              {article.author.name}
            </Link>
            <p className="text-xs text-muted-foreground">
              {new Date(article.createdAt).toLocaleDateString()} · {article.readingTime} min read
            </p>
          </div>
        </div>
        
        <h3 className={cn(
          "line-clamp-2 text-balance font-semibold tracking-tight hover:underline",
          featured ? "text-xl" : "text-lg"
        )}>
          <Link to={`/article/${article.id}`}>{article.title}</Link>
        </h3>
        
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {article.excerpt}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Link
              key={tag}
              to={`/tag/${tag.toLowerCase().replace(" ", "-")}`}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              #{tag}
            </Link>
          ))}
        </div>
        
        <div className="mt-auto pt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>{article.likes} likes</span>
            <span>{article.comments} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
