export type OrderStatus = 'new' | 'kitchen' | 'ready' | 'delivered' | 'completed';
export type OrderSource = 'mobile' | 'waiter' | 'qr' | 'web';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  modifications?: string[];
  specialInstructions?: string;
}

export interface OrderTimeline {
  timestamp: Date;
  event: string;
  actor?: string;
  details?: string;
}

export interface Order {
  id: string;
  tableNumber: number;
  customerName: string;
  customerId?: string;
  source: OrderSource;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  createdAt: Date;
  estimatedTime?: number;
  assignedChef?: string;
  assignedWaiter?: string;
  timeline: OrderTimeline[];
}

export interface Staff {
  id: string;
  name: string;
  role: 'waiter' | 'chef';
  avatar?: string;
  status: 'available' | 'busy' | 'break' | 'offline';
  shift: string;
  currentOrders: string[];
}

export interface Waiter extends Staff {
  role: 'waiter';
  phone: string;
  assignedTables: number[];
  ordersServedToday: number;
  avgOrderValue: number;
  rating: number;
  tipsToday: number;
}

export interface Chef extends Staff {
  role: 'chef';
  station: 'grill' | 'fry' | 'salad' | 'desserts' | 'main';
  expertise: string[];
  ordersCompletedToday: number;
  avgCookingTime: number;
  accuracyRate: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  visitCount: number;
  totalSpent: number;
  avgSpending: number;
  favoriteItems: string[];
  lastVisit: Date;
  loyaltyTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  segment: 'regular' | 'occasional' | 'first-time' | 'vip';
}

export interface Campaign {
  id: string;
  name: string;
  type: 'push' | 'sms' | 'email' | 'qr';
  targetSegment: string[];
  status: 'draft' | 'scheduled' | 'active' | 'completed';
  scheduledAt?: Date;
  sentCount: number;
  openRate: number;
  clickRate: number;
  redemptionRate: number;
  content: string;
}

export interface DashboardMetrics {
  ordersInKitchen: number;
  ordersDeliveredToday: number;
  newOrdersLastHour: number;
  totalRevenueToday: number;
  avgOrderValue: number;
  peakHour: string;
}
