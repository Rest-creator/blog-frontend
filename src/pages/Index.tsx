
import { useState } from "react";
import { ArticleGrid } from "@/components/articles/ArticleGrid";
import { articles } from "@/lib/mockData";

const Index = () => {
  const [featuredArticles] = useState(articles);

  return (
    <div className="container animate-fade-in space-y-8 py-6">
      <section>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Discover</h1>
            <p className="text-muted-foreground">
              Explore the latest articles from our community
            </p>
          </div>
        </div>
      </section>

      <section>
        <ArticleGrid articles={featuredArticles} />
      </section>
    </div>
  );
};

export default Index;
