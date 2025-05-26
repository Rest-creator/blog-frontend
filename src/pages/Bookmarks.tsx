
import { useState, useEffect } from 'react';
import { Bookmark, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ArticleGrid } from '@/components/articles/ArticleGrid';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { articles, Article } from '@/lib/mockData';

// Simulate bookmarked articles
const mockBookmarkedArticles = articles.slice(0, 4);

const Bookmarks = () => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Article[]>(mockBookmarkedArticles);
  const { toast } = useToast();
  const navigate = useNavigate();

  const removeBookmark = (id: string) => {
    setBookmarkedArticles(bookmarkedArticles.filter(article => article.id !== id));
    toast({
      title: "Bookmark removed",
      description: "Article has been removed from your bookmarks",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bookmarks</h1>
        <Button variant="outline" onClick={() => navigate('/explore')}>
          <Plus className="mr-2 h-4 w-4" />
          Discover more
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Bookmarks</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
          <TabsTrigger value="read">Read Later</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {bookmarkedArticles.length > 0 ? (
            <ArticleGrid articles={bookmarkedArticles} />
          ) : (
            <div className="text-center py-12">
              <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">No bookmarks yet</h3>
              <p className="text-muted-foreground mb-4">
                Start bookmarking articles you'd like to read later
              </p>
              <Button onClick={() => navigate('/explore')}>
                Explore Articles
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recent">
          <ArticleGrid articles={bookmarkedArticles.slice(0, 2)} />
        </TabsContent>
        
        <TabsContent value="read">
          <ArticleGrid articles={bookmarkedArticles.slice(1, 3)} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Bookmarks;
