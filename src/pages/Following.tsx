
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserPlus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArticleGrid } from '@/components/articles/ArticleGrid';
import { articles } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

// Mock followed users
const mockFollowedUsers = [
  {
    id: '1',
    name: 'John Doe',
    username: 'john-doe',
    bio: 'Writer, tech enthusiast, and coffee lover.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '2',
    name: 'Jane Smith',
    username: 'jane-smith',
    bio: 'Product designer and UX specialist.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    username: 'robert-johnson',
    bio: 'Software engineer and open source contributor.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const Following = () => {
  const [followedUsers, setFollowedUsers] = useState(mockFollowedUsers);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Articles from followed users
  const followedArticles = articles.slice(0, 8);

  const handleUnfollow = (userId: string) => {
    setFollowedUsers(followedUsers.filter(user => user.id !== userId));
    toast({
      title: "Unfollowed",
      description: "You are no longer following this user",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Following</h1>
        <Button variant="outline" onClick={() => navigate('/explore')}>
          <UserPlus className="mr-2 h-4 w-4" />
          Discover People
        </Button>
      </div>

      <Tabs defaultValue="feed">
        <TabsList className="mb-6">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
        </TabsList>
        
        <TabsContent value="feed">
          {followedArticles.length > 0 ? (
            <ArticleGrid articles={followedArticles} />
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">Your feed is empty</h3>
              <p className="text-muted-foreground mb-4">
                Follow more people to populate your feed
              </p>
              <Button onClick={() => navigate('/explore')}>
                Explore People
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="people">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {followedUsers.map(user => (
              <Card key={user.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={user.image} 
                        alt={user.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold">{user.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">@{user.username}</p>
                      <p className="text-sm line-clamp-2">{user.bio}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/profile/${user.username}`)}
                    >
                      View Profile
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleUnfollow(user.id)}
                    >
                      Unfollow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Following;
