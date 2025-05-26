import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Edit, Settings, BookmarkCheck, Calendar, Mail, MapPin, Link as LinkIcon, Twitter, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArticleGrid } from '@/components/articles/ArticleGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { articles } from '@/lib/mockData';

// Mock user data
const mockUsers = {
  'tendai-mutasa': {
    id: '1',
    name: 'Tendai Mutasa',
    username: 'tendai-mutasa',
    bio: 'Writer, tech enthusiast, and coffee lover. Sharing thoughts on technology and design.',
    image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    email: 'tendai.mutasa@example.com',
    location: 'Harare, Zimbabwe',
    website: 'https://tendaimutasa.com',
    twitter: '@tendaimutasa',
    github: 'tendaimutasa',
    joinedDate: 'January 2023',
    followers: 1240,
    following: 420,
    isFollowing: false,
  },
  'chiedza-moyo': {
    id: '2',
    name: 'Chiedza Moyo',
    username: 'chiedza-moyo',
    bio: 'Product designer and user experience specialist. Writing about UX, design systems and accessibility.',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    email: 'chiedza.moyo@example.com',
    location: 'Bulawayo, Zimbabwe',
    website: 'https://chiedzamoyo.design',
    twitter: '@chiedzamoyo',
    github: 'chiedzamoyo',
    joinedDate: 'March 2022',
    followers: 2350,
    following: 210,
    isFollowing: true,
  },
  'tafadzwa-nyamande': {
    id: '3',
    name: 'Tafadzwa Nyamande',
    username: 'tafadzwa-nyamande',
    bio: 'Software engineer and open source contributor. Writing about JavaScript, React, and web development.',
    image: 'https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    email: 'tafadzwa.nyamande@example.com',
    location: 'Gweru, Zimbabwe',
    website: 'https://tafadzwanyamande.dev',
    twitter: '@tafadzwanyamande',
    github: 'tafadzwanyamande',
    joinedDate: 'June 2021',
    followers: 1830,
    following: 315,
    isFollowing: false,
  },
};

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const { toast } = useToast();
  
  // Get user by username or default to tafadzwa-nyamande
  const user = username && mockUsers[username] ? mockUsers[username] : mockUsers['tafadzwa-nyamande'];
  
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [followerCount, setFollowerCount] = useState(user.followers);
  
  // Filter articles by author (simulating user's articles)
  const userArticles = articles.slice(0, 6);
  const bookmarkedArticles = articles.slice(2, 5);
  
  // Check if this is the current user's profile
  const isCurrentUser = username === 'tafadzwa-nyamande'; // In a real app, you'd compare with the logged-in user
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1);
    
    toast({
      title: isFollowing ? "Unfollowed" : "Followed",
      description: isFollowing ? `Unfollowed ${user.name}` : `You are now following ${user.name}`,
    });
  };
  
  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardContent className="pt-6 px-6">
          {/* Cover image */}
          <div className="h-40 -mt-6 -mx-6 mb-6 bg-gradient-to-r from-primary/20 to-primary/10 rounded-t-lg"></div>
          
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="-mt-24 md:-mt-24 z-10">
              <Avatar className="w-32 h-32 border-4 border-background">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-grow text-center md:text-left mt-2 md:-mt-0">
              <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
              <p className="text-muted-foreground mb-3">@{user.username}</p>
              <p className="mb-4 max-w-2xl">{user.bio}</p>
              
              <div className="flex flex-wrap gap-6 mb-4 justify-center md:justify-start text-sm">
                {user.location && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                
                {user.email && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                )}
                
                {user.website && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <LinkIcon className="h-4 w-4" />
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                      {user.website.replace(/https?:\/\/(www\.)?/, '')}
                    </a>
                  </div>
                )}
                
                {user.joinedDate && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {user.joinedDate}</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-4 mb-6 justify-center md:justify-start">
                <div>
                  <span className="font-bold">{followerCount}</span>
                  <span className="text-muted-foreground ml-1">Followers</span>
                </div>
                <div>
                  <span className="font-bold">{user.following}</span>
                  <span className="text-muted-foreground ml-1">Following</span>
                </div>
                <div>
                  <span className="font-bold">{userArticles.length}</span>
                  <span className="text-muted-foreground ml-1">Articles</span>
                </div>
              </div>
              
              <div className="flex gap-3 justify-center md:justify-start">
                {isCurrentUser ? (
                  <>
                    <Button variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      onClick={handleFollow}
                      variant={isFollowing ? "outline" : "default"}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </Button>
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Social links */}
          {(user.twitter || user.github) && (
            <div className="mt-6 flex gap-3 justify-center md:justify-start">
              {user.twitter && (
                <a href={`https://twitter.com/${user.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" aria-label="Twitter profile">
                  <Button variant="outline" size="icon">
                    <Twitter className="h-4 w-4" />
                  </Button>
                </a>
              )}
              {user.github && (
                <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                  </Button>
                </a>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="articles">
        <TabsList className="mb-6">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Published Articles</h2>
            {isCurrentUser && (
              <Link to="/write">
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Write New Article
                </Button>
              </Link>
            )}
          </div>
          
          {userArticles.length > 0 ? (
            <ArticleGrid articles={userArticles} />
          ) : (
            <div className="text-center py-12 border rounded-lg bg-card">
              <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">No articles published yet</h3>
              <p className="text-muted-foreground mb-4">
                {isCurrentUser ? "Start writing your first article" : "This user hasn't published any articles yet"}
              </p>
              {isCurrentUser && (
                <Link to="/write">
                  <Button>
                    <Edit className="h-4 w-4 mr-2" />
                    Create Article
                  </Button>
                </Link>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="bookmarks">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Bookmarked Articles</h2>
            <Link to="/explore">
              <Button variant="outline">
                <BookmarkCheck className="h-4 w-4 mr-2" />
                Find More
              </Button>
            </Link>
          </div>
          
          {bookmarkedArticles.length > 0 ? (
            <ArticleGrid articles={bookmarkedArticles} />
          ) : (
            <div className="text-center py-12 border rounded-lg bg-card">
              <BookmarkCheck className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">No bookmarks yet</h3>
              <p className="text-muted-foreground mb-4">
                {isCurrentUser ? "Start bookmarking articles you'd like to read later" : "This user hasn't bookmarked any articles"}
              </p>
              {isCurrentUser && (
                <Link to="/explore">
                  <Button>
                    Explore Articles
                  </Button>
                </Link>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About {user.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">{user.bio}</p>
              
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <div className="space-y-3 mb-6">
                {user.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                )}
                {user.website && (
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                      {user.website}
                    </a>
                  </div>
                )}
                {user.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{user.location}</span>
                  </div>
                )}
              </div>
              
              <Separator className="my-6" />
              
              <div className="text-sm text-muted-foreground">
                <p>Joined {user.joinedDate}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
