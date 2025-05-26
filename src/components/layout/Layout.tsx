
import { SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "./Navbar";
import { BlogSidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full flex-col">
        <Navbar />
        <div className="flex flex-1 w-full">
          <BlogSidebar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
