import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'kitchen' | 'delivered' | 'pending' | 'new';
  className?: string;
}

const variantStyles = {
  default: 'border-border',
  kitchen: 'border-status-kitchen/30 bg-status-kitchen/5',
  delivered: 'border-status-delivered/30 bg-status-delivered/5',
  pending: 'border-status-pending/30 bg-status-pending/5',
  new: 'border-status-new/30 bg-status-new/5',
};

const iconVariantStyles = {
  default: 'bg-primary/10 text-primary',
  kitchen: 'bg-status-kitchen/20 text-status-kitchen',
  delivered: 'bg-status-delivered/20 text-status-delivered',
  pending: 'bg-status-pending/20 text-status-pending',
  new: 'bg-status-new/20 text-status-new',
};

export const MetricCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  className,
}: MetricCardProps) => {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:border-primary/30',
        variantStyles[variant],
        className
      )}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent" />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-foreground tracking-tight">{value}</h3>
            {trend && (
              <span
                className={cn(
                  'text-sm font-medium',
                  trend.isPositive ? 'text-status-delivered' : 'text-status-kitchen'
                )}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-lg', iconVariantStyles[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};
