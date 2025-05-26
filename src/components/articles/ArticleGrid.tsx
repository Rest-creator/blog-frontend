
import { ArticleCard } from "./ArticleCard";
import { Article } from "@/lib/mockData";

interface ArticleGridProps {
  articles: Article[];
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  // The first article is featured
  const [featured, ...rest] = articles;

  return (
    <div className="space-y-8">
      {featured && (
        <div className="mb-8">
          <ArticleCard article={featured} featured />
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
