
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, BookmarkCheck, Users, Compass, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Edit,
    title: 'Rich Text Editor',
    description: 'Create beautiful articles with our feature-rich editor.'
  },
  {
    icon: BookmarkCheck,
    title: 'Save for Later',
    description: 'Bookmark articles to read when you have time.'
  },
  {
    icon: Users,
    title: 'Follow Authors',
    description: 'Keep up with your favorite writers and thinkers.'
  },
  {
    icon: Compass,
    title: 'Discover Content',
    description: 'Explore topics and articles tailored to your interests.'
  },
  {
    icon: TrendingUp,
    title: 'Stay Updated',
    description: 'Follow trending topics and never miss out.'
  }
];

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-background py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Share your ideas with the world.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              A modern platform for writers and readers to connect, create, and discover meaningful content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="px-8">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/signin">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why choose Savens</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A platform built for content creators, writers, and readers alike.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Start your journey today</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of writers who have already found their voice on our platform.
            </p>
            <Button asChild size="lg">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
