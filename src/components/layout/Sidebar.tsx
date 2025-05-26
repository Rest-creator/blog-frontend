
import { Link } from "react-router-dom";
import { 
  Sidebar as SidebarComponent, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Home, BookmarkCheck, Settings, User, Edit, Compass, Users, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

// Main menu items
const menuItems = [
  { name: "Home", icon: Home, path: "/" },
  { name: "Explore", icon: Compass, path: "/explore" },
  { name: "Following", icon: Users, path: "/following" },
  { name: "Bookmarks", icon: BookmarkCheck, path: "/bookmarks" },
  { name: "Write", icon: Edit, path: "/write" },
  { name: "Profile", icon: User, path: "/profile/robert-johnson" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

// Admin menu item (added separately)
const adminMenuItem = { name: "Admin", icon: BarChart3, path: "/admin" };

interface TrendingTopic {
  name: string;
  count: number;
}

const trendingTopics: TrendingTopic[] = [
  { name: "Technology", count: 1240 },
  { name: "Programming", count: 945 },
  { name: "Design", count: 732 },
  { name: "AI", count: 621 },
  { name: "Productivity", count: 513 },
];

export function BlogSidebar() {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-50">
          <SidebarTrigger>
            <Button size="icon" className="rounded-full shadow-lg">
              <Home className="h-5 w-5" />
            </Button>
          </SidebarTrigger>
        </div>
      )}
      <SidebarComponent>
        <SidebarContent className="pt-6">
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <Link to={item.path} className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                {/* Admin section */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={adminMenuItem.path} className="flex items-center">
                      <adminMenuItem.icon className="mr-2 h-4 w-4" />
                      <span>{adminMenuItem.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <SidebarGroup className="mt-8">
            <SidebarGroupLabel>
              <Link to="/topics" className="flex items-center w-full">
                <TrendingUp className="mr-2 h-4 w-4" />
                <span>Trending Topics</span>
              </Link>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2 px-3 py-2">
                {trendingTopics.map((topic) => (
                  <div key={topic.name} className="flex items-center justify-between">
                    <Link to={`/topics`} className="text-sm hover:text-primary">
                      #{topic.name}
                    </Link>
                    <span className="text-xs text-muted-foreground">{topic.count}</span>
                  </div>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <SidebarGroup className="mt-8">
            <SidebarGroupLabel>
              <Link to="/authors" className="flex items-center w-full">
                <Users className="mr-2 h-4 w-4" />
                <span>Popular Authors</span>
              </Link>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-3 px-3 py-2">
                {["John Doe", "Jane Smith", "Robert Johnson"].map((author) => (
                  <div key={author} className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-muted"></div>
                    <div>
                      <Link to={`/profile/${author.toLowerCase().replace(" ", "-")}`} className="text-sm font-medium hover:text-primary">
                        {author}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </SidebarComponent>
    </>
  );
}
