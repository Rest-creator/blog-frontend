
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Mock popular authors
const popularAuthors = [
  {
    id: '1',
    name: 'Tendai Mutasa',
    username: 'tendai-mutasa',
    bio: 'Writer, tech enthusiast, and coffee lover. Sharing thoughts on technology and design.',
    followers: 1240,
    articles: 24,
    isFollowing: false,
    image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '2',
    name: 'Chiedza Moyo',
    username: 'chiedza-moyo',
    bio: 'Product designer and user experience specialist. Writing about UX, design systems and accessibility.',
    followers: 2350,
    articles: 36,
    isFollowing: true,
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '3',
    name: 'Tafadzwa Nyamande',
    username: 'tafadzwa-nyamande',
    bio: 'Software engineer and open source contributor. Writing about JavaScript, React, and web development.',
    followers: 1830,
    articles: 42,
    isFollowing: false,
    image: 'https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '4',
    name: 'Rumbidzai Zamba',
    username: 'rumbidzai-zamba',
    bio: 'Data scientist and machine learning enthusiast. Exploring the intersection of AI and healthcare.',
    followers: 945,
    articles: 18,
    isFollowing: false,
    image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '5',
    name: 'Tatenda Mhaka',
    username: 'tatenda-mhaka',
    bio: 'Frontend developer and design system specialist. Passionate about accessibility and user-centric design.',
    followers: 780,
    articles: 15,
    isFollowing: true,
    image: 'https://images.unsplash.com/photo-1507152832244-10d45c7eda57?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '6',
    name: 'Nyasha Chikowore',
    username: 'nyasha-chikowore',
    bio: 'Full-stack developer and tech educator. Building tools that help people learn and grow.',
    followers: 1120,
    articles: 28,
    isFollowing: false,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const Authors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [authors, setAuthors] = useState(popularAuthors);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Filter authors based on search term
  const filteredAuthors = authors.filter(author => 
    author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    author.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFollowToggle = (authorId: string) => {
    setAuthors(authors.map(author => {
      if (author.id === authorId) {
        const isNowFollowing = !author.isFollowing;
        
        toast({
          title: isNowFollowing ? "Followed" : "Unfollowed",
          description: isNowFollowing 
            ? `You are now following ${author.name}` 
            : `You unfollowed ${author.name}`,
        });
        
        return {
          ...author,
          isFollowing: isNowFollowing,
          followers: isNowFollowing ? author.followers + 1 : author.followers - 1
        };
      }
      return author;
    }));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Popular Authors</h1>
          <p className="text-muted-foreground">Discover influential writers and thought leaders</p>
        </div>
        <Input
          placeholder="Search authors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <Tabs defaultValue="popular">
        <TabsList className="mb-6">
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="new">New Authors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="popular">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuthors.map(author => (
              <Card key={author.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={author.image} 
                        alt={author.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold">{author.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">@{author.username}</p>
                      <p className="text-sm line-clamp-2 mb-2">{author.bio}</p>
                      <div className="flex text-sm text-muted-foreground">
                        <span className="mr-3">{author.followers} followers</span>
                        <span>{author.articles} articles</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/profile/${author.username}`)}
                    >
                      View Profile
                    </Button>
                    <Button 
                      size="sm" 
                      variant={author.isFollowing ? "ghost" : "default"}
                      onClick={() => handleFollowToggle(author.id)}
                    >
                      {author.isFollowing ? "Following" : "Follow"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recommended">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuthors.slice(1, 4).map(author => (
              <Card key={author.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  {/* Same card content as above */}
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={author.image} 
                        alt={author.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold">{author.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">@{author.username}</p>
                      <p className="text-sm line-clamp-2 mb-2">{author.bio}</p>
                      <div className="flex text-sm text-muted-foreground">
                        <span className="mr-3">{author.followers} followers</span>
                        <span>{author.articles} articles</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/profile/${author.username}`)}
                    >
                      View Profile
                    </Button>
                    <Button 
                      size="sm" 
                      variant={author.isFollowing ? "ghost" : "default"}
                      onClick={() => handleFollowToggle(author.id)}
                    >
                      {author.isFollowing ? "Following" : "Follow"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="new">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuthors.slice(3, 6).map(author => (
              <Card key={author.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  {/* Same card content as above */}
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={author.image} 
                        alt={author.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold">{author.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">@{author.username}</p>
                      <p className="text-sm line-clamp-2 mb-2">{author.bio}</p>
                      <div className="flex text-sm text-muted-foreground">
                        <span className="mr-3">{author.followers} followers</span>
                        <span>{author.articles} articles</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/profile/${author.username}`)}
                    >
                      View Profile
                    </Button>
                    <Button 
                      size="sm" 
                      variant={author.isFollowing ? "ghost" : "default"}
                      onClick={() => handleFollowToggle(author.id)}
                    >
                      {author.isFollowing ? "Following" : "Follow"}
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

export default Authors;
