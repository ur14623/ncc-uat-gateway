import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useSidebarContext } from '@/contexts/SidebarContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  LayoutDashboard,
  ClipboardList,
  ListOrdered,
  Users,
  ChefHat,
  UserCircle,
  Megaphone,
  BarChart3,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Utensils,
  Sun,
  Moon,
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/orders', label: 'Order Management', icon: ClipboardList },
  { path: '/all-orders', label: 'All Orders', icon: ListOrdered },
  { path: '/waiters', label: 'Waiter Management', icon: Users },
  { path: '/chefs', label: 'Chef Management', icon: ChefHat },
  { path: '/customers', label: 'Customer Management', icon: UserCircle },
  { path: '/advertisements', label: 'Advertisements', icon: Megaphone },
  { path: '/reports', label: 'Reports & Analytics', icon: BarChart3 },
];

export const ManagerSidebar = () => {
  const { collapsed, setCollapsed } = useSidebarContext();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <aside
      className={cn(
        'h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col flex-shrink-0',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary flex-shrink-0">
            <Utensils className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="text-lg font-bold text-foreground">RestaurantOS</h1>
              <p className="text-xs text-muted-foreground">Manager Portal</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-sidebar-accent transition-colors flex-shrink-0"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon
                className={cn(
                  'h-5 w-5 flex-shrink-0 transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                )}
              />
              {!collapsed && (
                <span className="text-sm font-medium truncate animate-fade-in">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-sidebar-border p-3 space-y-1">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={cn(
            'flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors'
          )}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-primary flex-shrink-0" />
          ) : (
            <Moon className="h-5 w-5 text-primary flex-shrink-0" />
          )}
          {!collapsed && (
            <span className="text-sm font-medium">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          )}
        </button>

        <button
          className={cn(
            'flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors'
          )}
        >
          <Bell className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Notifications</span>}
          {!collapsed && (
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              5
            </span>
          )}
        </button>
        <button
          className={cn(
            'flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors'
          )}
        >
          <Settings className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </button>
      </div>
    </aside>
  );
};
