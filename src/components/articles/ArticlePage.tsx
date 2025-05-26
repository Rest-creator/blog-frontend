
import { useParams } from "react-router-dom";
import { articles } from "@/lib/mockData";
import { BookmarkCheck, Heart, MessageSquare, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Article Not Found</h2>
          <p className="mt-2 text-muted-foreground">The article you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4">
      <article className="animate-fade-in">
        <div className="mb-6">
          <h1 className="mb-4 text-balance text-3xl font-bold sm:text-4xl">{article.title}</h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 overflow-hidden rounded-full">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{article.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(article.createdAt).toLocaleDateString()} · {article.readingTime} min read
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {article.coverImage && (
          <div className="mb-8 mt-4 overflow-hidden rounded-xl">
            <img
              src={article.coverImage}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        
        <div 
          className="article-content mb-8 prose dark:prose-invert prose-headings:font-semibold prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        <div className="mb-8 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{article.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <MessageSquare className="h-4 w-4" />
              <span>{article.comments}</span>
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <BookmarkCheck className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
