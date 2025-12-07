import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { CampaignCard } from '@/components/campaigns/CampaignCard';
import { CreateCampaignDialog } from '@/components/campaigns/CreateCampaignDialog';
import { mockCampaigns } from '@/data/mockData';
import { Megaphone, Send, Eye, Gift, Plus } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Button } from '@/components/ui/button';

const Advertisements = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const activeCampaigns = mockCampaigns.filter((c) => c.status === 'active').length;
  const totalSent = mockCampaigns.reduce((acc, c) => acc + c.sentCount, 0);
  const avgOpenRate = mockCampaigns.filter(c => c.sentCount > 0).reduce((acc, c) => acc + c.openRate, 0) / mockCampaigns.filter(c => c.sentCount > 0).length;
  const avgRedemption = mockCampaigns.filter(c => c.sentCount > 0).reduce((acc, c) => acc + c.redemptionRate, 0) / mockCampaigns.filter(c => c.sentCount > 0).length;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Advertisement Management</h1>
            <p className="text-muted-foreground mt-1">Targeted marketing and customer engagement</p>
          </div>
          <Button onClick={() => setCreateDialogOpen(true)} className="gradient-primary text-primary-foreground gap-2">
            <Plus className="h-4 w-4" />
            New Campaign
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Active Campaigns"
            value={activeCampaigns}
            icon={Megaphone}
            variant="delivered"
          />
          <MetricCard
            title="Total Sent"
            value={totalSent.toLocaleString()}
            icon={Send}
            trend={{ value: 24, isPositive: true }}
          />
          <MetricCard
            title="Avg Open Rate"
            value={`${avgOpenRate.toFixed(1)}%`}
            icon={Eye}
            variant="pending"
          />
          <MetricCard
            title="Avg Redemption"
            value={`${avgRedemption.toFixed(1)}%`}
            icon={Gift}
          />
        </div>

        {/* Campaigns by Status */}
        <div className="space-y-6">
          {/* Active Campaigns */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-status-delivered animate-pulse" />
              Active Campaigns
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {mockCampaigns
                .filter((c) => c.status === 'active')
                .map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
            </div>
          </div>

          {/* Scheduled Campaigns */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-status-info" />
              Scheduled Campaigns
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {mockCampaigns
                .filter((c) => c.status === 'scheduled')
                .map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
            </div>
          </div>

          {/* Completed Campaigns */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-status-pending" />
              Completed Campaigns
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {mockCampaigns
                .filter((c) => c.status === 'completed')
                .map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
            </div>
          </div>
        </div>

        {/* Create Campaign Dialog */}
        <CreateCampaignDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
      </div>
    </MainLayout>
  );
};

export default Advertisements;
