import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCircle,
  Wallet,
  Package,
  DollarSign,
  Bell,
  Wrench,
  Users,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  icon: React.ReactNode;
  path?: string;
  children?: { title: string; path: string }[];
}

const navigation: NavItem[] = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    path: '/'
  },
  {
    title: 'Profile Management',
    icon: <UserCircle className="h-5 w-5" />,
    children: [
      { title: 'Create Profile', path: '/profile/create' },
      { title: 'Profile Info', path: '/profile/info' }
    ]
  },
  {
    title: 'Balance Management',
    icon: <Wallet className="h-5 w-5" />,
    children: [
      { title: 'Check Balance', path: '/balance/check' },
      { title: 'Adjust Balance', path: '/balance/adjust' },
      { title: 'Pin-less Recharge', path: '/balance/pinless-recharge' },
      { title: 'Voucher Recharge', path: '/balance/voucher-recharge' },
      { title: 'Transfer Balance', path: '/balance/transfer' }
    ]
  },
  {
    title: 'Bundle Management',
    icon: <Package className="h-5 w-5" />,
    children: [
      { title: 'Bundle Detail', path: '/bundle/detail' },
      { title: 'Subscribe Bundle', path: '/bundle/subscribe' },
      { title: 'All Subscribed Bundles', path: '/bundle/subscribed' },
      { title: 'Update Resource', path: '/bundle/update-resource' },
      { title: 'Remove Bundle', path: '/bundle/remove' },
      { title: 'Loan Bundle', path: '/bundle/loan' },
      { title: 'Gift Bundle', path: '/bundle/gift' },
      { title: 'CVM Bundle', path: '/bundle/cvm' },
      { title: 'Stop Auto Renewal Bundle', path: '/bundle/stop-auto-renewal' },
      { title: 'Renew Bundle', path: '/bundle/renew' }
    ]
  },
  {
    title: 'Rate Management',
    icon: <DollarSign className="h-5 w-5" />,
    children: [
      { title: 'International Rate', path: '/rate/international' },
      { title: 'Roaming Rate', path: '/rate/roaming' },
      { title: 'Rate Comparison', path: '/rate/comparison' }
    ]
  },
  {
    title: 'Notification Management',
    icon: <Bell className="h-5 w-5" />,
    children: [
      { title: 'Master Notification', path: '/notification/master' },
      { title: 'Notification', path: '/notification/list' }
    ]
  },
  {
    title: 'Utility',
    icon: <Wrench className="h-5 w-5" />,
    children: [
      { title: 'Tax Calculation', path: '/utility/tax' },
      { title: 'Conversion', path: '/utility/conversion' }
    ]
  },
  {
    title: 'User Management',
    icon: <Users className="h-5 w-5" />,
    children: [
      { title: 'All Users', path: '/user/list' },
      { title: 'Add New User', path: '/user/add' }
    ]
  }
];

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  return (
    <aside
      className={cn(
        'bg-background border-r border-border transition-all duration-300 h-[calc(100vh-4rem)] overflow-y-auto',
        isOpen ? 'w-64' : 'w-0'
      )}
    >
      <nav className="p-4 space-y-1">
        {navigation.map((item) => (
          <div key={item.title}>
            {item.path ? (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors hover:bg-muted',
                    isActive && 'bg-primary text-primary-foreground hover:bg-primary'
                  )
                }
              >
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            ) : (
              <>
                <button
                  onClick={() => toggleExpanded(item.title)}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  {expandedItems.includes(item.title) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {expandedItems.includes(item.title) && item.children && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                          cn(
                            'block px-3 py-2 text-sm transition-colors hover:bg-muted',
                            isActive && 'bg-primary text-primary-foreground hover:bg-primary'
                          )
                        }
                      >
                        {child.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};
