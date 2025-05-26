
import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArticleGrid } from '@/components/articles/ArticleGrid';
import { articles } from '@/lib/mockData';

// Mock topics with categories
const topics = [
  { name: 'Technology', count: 1240, description: 'Latest trends and innovations in tech' },
  { name: 'Programming', count: 945, description: 'Coding tutorials, tips, and best practices' },
  { name: 'Design', count: 782, description: 'UI/UX design principles and inspiration' },
  { name: 'AI', count: 621, description: 'Artificial Intelligence and machine learning' },
  { name: 'Productivity', count: 513, description: 'Tips and strategies to improve efficiency' },
  { name: 'Data Science', count: 452, description: 'Data analysis and visualization techniques' },
  { name: 'Career', count: 326, description: 'Career advice and professional development' },
  { name: 'UX/UI', count: 298, description: 'User experience and interface design' },
];

const Topics = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Filter topics based on search term
  const filteredTopics = topics.filter(topic => 
    topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get articles for selected topic
  const topicArticles = selectedTopic 
    ? articles.filter(article => article.tags?.includes(selectedTopic))
    : [];

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Trending Topics</h1>
          <p className="text-muted-foreground">Discover popular topics and trending conversations</p>
        </div>
        <Input
          placeholder="Search topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {selectedTopic ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">{selectedTopic}</h2>
              <p className="text-muted-foreground">
                {topics.find(t => t.name === selectedTopic)?.description}
              </p>
            </div>
            <button 
              onClick={() => setSelectedTopic(null)}
              className="text-primary text-sm hover:underline"
            >
              Back to all topics
            </button>
          </div>
          
          <ArticleGrid articles={topicArticles} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map(topic => (
            <Card key={topic.name} className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => setSelectedTopic(topic.name)}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{topic.name}</h3>
                    <p className="text-muted-foreground mb-3">{topic.description}</p>
                    <p className="text-sm">{topic.count} articles</p>
                  </div>
                  {topic.count > 800 && (
                    <TrendingUp className="h-5 w-5 text-primary" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Topics;
