import { ReactNode } from 'react';
import { ManagerSidebar } from './ManagerSidebar';
import { SidebarProvider } from '@/contexts/SidebarContext';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <ManagerSidebar />
        <main className="flex-1 overflow-auto">
          <div className="min-h-screen p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
