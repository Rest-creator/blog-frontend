
import { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Users, BookOpen, Edit, Settings, Tag } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for charts
const articleViewsData = [
  { name: 'Jan', views: 4000 },
  { name: 'Feb', views: 3000 },
  { name: 'Mar', views: 2000 },
  { name: 'Apr', views: 2780 },
  { name: 'May', views: 1890 },
  { name: 'Jun', views: 2390 },
  { name: 'Jul', views: 3490 },
];

const userRegistrationsData = [
  { name: 'Jan', users: 200 },
  { name: 'Feb', users: 320 },
  { name: 'Mar', users: 280 },
  { name: 'Apr', users: 400 },
  { name: 'May', users: 500 },
  { name: 'Jun', users: 350 },
  { name: 'Jul', users: 620 },
];

const categoriesData = [
  { name: 'Technology', count: 1240 },
  { name: 'Programming', count: 945 },
  { name: 'Design', count: 782 },
  { name: 'AI', count: 621 },
  { name: 'Productivity', count: 513 },
];

const Admin = () => {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  // Total stats
  const stats = [
    { 
      title: 'Total Users', 
      value: '8,249', 
      change: '+12.5%', 
      icon: Users 
    },
    { 
      title: 'Total Articles', 
      value: '3,642', 
      change: '+7.2%', 
      icon: BookOpen 
    },
    { 
      title: 'Published Today', 
      value: '24', 
      change: '+4.3%', 
      icon: Edit 
    },
    { 
      title: 'Active Topics', 
      value: '124', 
      change: '+2.1%', 
      icon: Tag 
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <select 
            value={period}
            onChange={(e) => setPeriod(e.target.value as 'daily' | 'weekly' | 'monthly')}
            className="bg-background border rounded-md px-3 py-1"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button className="bg-primary text-white px-4 py-1 rounded-md flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <p className={`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} from last period
                  </p>
                </div>
                <div className="bg-primary/10 p-2 rounded-md">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="analytics">
        <TabsList className="mb-6">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Article Views Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  Article Views
                </CardTitle>
                <CardDescription>Total article views over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={articleViewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* User Registrations Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  User Registrations
                </CardTitle>
                <CardDescription>New user registrations over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userRegistrationsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Categories Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-primary" />
                  Categories Distribution
                </CardTitle>
                <CardDescription>Article count by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoriesData.map((category) => (
                    <div key={category.name} className="flex items-center">
                      <div className="w-32 font-medium">{category.name}</div>
                      <div className="w-full">
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full bg-primary"
                            style={{ width: `${(category.count / 1500) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-12 text-right font-medium">{category.count}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Authors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Top Authors
                </CardTitle>
                <CardDescription>Based on article views and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Chen', 'Michael Williams'].map((author, index) => (
                    <div key={author} className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{author}</div>
                        <div className="text-sm text-muted-foreground">
                          {Math.floor(Math.random() * 100)} articles • {Math.floor(Math.random() * 10000)} views
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">User management features would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Manage articles, categories, and tags</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Content management features would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>Configure site-wide settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Settings management features would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
