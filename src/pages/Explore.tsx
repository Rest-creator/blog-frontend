
import { useState } from 'react';
import { Search, Filter, BookmarkPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { articles } from '@/lib/mockData';
import { ArticleGrid } from '@/components/articles/ArticleGrid';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [filteredArticles, setFilteredArticles] = useState(articles);
  
  // Filter articles based on search term
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredArticles(articles);
      return;
    }
    
    const results = articles.filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      article.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredArticles(results);
  };
  
  // Sort articles based on selected criteria
  const handleSort = (value: string) => {
    setSortBy(value);
    
    let sorted = [...filteredArticles];
    
    switch (value) {
      case 'latest':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'popular':
        sorted.sort((a, b) => b.likes - a.likes);
        break;
      case 'az':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'reading-time-asc':
        sorted.sort((a, b) => a.readingTime - b.readingTime);
        break;
      case 'reading-time-desc':
        sorted.sort((a, b) => b.readingTime - a.readingTime);
        break;
      default:
        break;
    }
    
    setFilteredArticles(sorted);
  };
  
  // Submit search on Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Explore Articles</h1>
          <p className="text-muted-foreground">Discover interesting content from our writers</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-grow">
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pr-10"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-full"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Select value={sortBy} onValueChange={handleSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="az">A-Z</SelectItem>
              <SelectItem value="za">Z-A</SelectItem>
              <SelectItem value="reading-time-asc">Shortest Read</SelectItem>
              <SelectItem value="reading-time-desc">Longest Read</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Articles</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="programming">Programming</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {filteredArticles.length > 0 ? (
            <ArticleGrid articles={filteredArticles} />
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <BookmarkPlus className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter to find what you're looking for
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="technology">
          <ArticleGrid 
            articles={filteredArticles.filter(article => 
              article.tags.some(tag => tag.toLowerCase() === 'technology')
            )} 
          />
        </TabsContent>
        
        <TabsContent value="design">
          <ArticleGrid 
            articles={filteredArticles.filter(article => 
              article.tags.some(tag => tag.toLowerCase() === 'design')
            )} 
          />
        </TabsContent>
        
        <TabsContent value="programming">
          <ArticleGrid 
            articles={filteredArticles.filter(article => 
              article.tags.some(tag => tag.toLowerCase() === 'programming')
            )} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Explore;
