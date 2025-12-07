import { ReactNode } from 'react';
import { ManagerSidebar } from './ManagerSidebar';
import { TopNavbar } from './TopNavbar';
import { SidebarProvider } from '@/contexts/SidebarContext';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <ManagerSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopNavbar />
          <main className="flex-1 overflow-auto">
            <div className="min-h-full p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
