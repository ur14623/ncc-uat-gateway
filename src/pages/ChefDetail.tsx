import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Clock, 
  ChefHat, 
  Flame, 
  Target,
  Award,
  Timer,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { mockChefs, mockOrders } from '@/data/mockData';

const ChefDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const chef = mockChefs.find(c => c.id === id);

  if (!chef) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Chef not found</p>
        </div>
      </MainLayout>
    );
  }

  const chefOrders = mockOrders.filter(o => o.assignedChef === chef.name);
  const statusColors = {
    available: 'bg-status-success text-white',
    busy: 'bg-status-error text-white',
    break: 'bg-status-warning text-black',
    offline: 'bg-muted text-muted-foreground',
  };

  const stationColors = {
    grill: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    fry: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    salad: 'bg-green-500/20 text-green-400 border-green-500/30',
    desserts: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    main: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/chefs')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Chef Details</h1>
        </div>

        {/* Profile Card */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32 border-4 border-primary/20">
                  <AvatarImage src={chef.avatar} alt={chef.name} />
                  <AvatarFallback className="text-3xl">{chef.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <Badge className={`mt-4 ${statusColors[chef.status]}`}>
                  {chef.status.charAt(0).toUpperCase() + chef.status.slice(1)}
                </Badge>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-3xl font-bold">{chef.name}</h2>
                  <p className="text-muted-foreground">ID: {chef.id}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Shift: {chef.shift}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4" />
                    <Badge variant="outline" className={stationColors[chef.station]}>
                      {chef.station.charAt(0).toUpperCase() + chef.station.slice(1)} Station
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ChefHat className="h-4 w-4" />
                    <span>Active Orders: {chef.currentOrders.length}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {chef.expertise.map(skill => (
                      <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/20">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Orders Completed</p>
                  <p className="text-2xl font-bold">{chef.ordersCompletedToday}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-status-warning/20">
                  <Timer className="h-6 w-6 text-status-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Cooking Time</p>
                  <p className="text-2xl font-bold">{chef.avgCookingTime} min</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-status-success/20">
                  <CheckCircle className="h-6 w-6 text-status-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                  <p className="text-2xl font-bold">{chef.accuracyRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-purple-500/20">
                  <Award className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quality Score</p>
                  <p className="text-2xl font-bold">{((chef.accuracyRate / 100) * 5).toFixed(1)}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance & Current Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Accuracy Rate</span>
                  <span className="text-sm font-medium">{chef.accuracyRate}%</span>
                </div>
                <Progress value={chef.accuracyRate} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Speed Efficiency</span>
                  <span className="text-sm font-medium">{Math.max(100 - chef.avgCookingTime, 70)}%</span>
                </div>
                <Progress value={Math.max(100 - chef.avgCookingTime, 70)} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Team Collaboration</span>
                  <span className="text-sm font-medium">88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Kitchen Cleanliness</span>
                  <span className="text-sm font-medium">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Current Orders in Queue</CardTitle>
            </CardHeader>
            <CardContent>
              {chefOrders.length > 0 ? (
                <div className="space-y-3">
                  {chefOrders.map(order => (
                    <div 
                      key={order.id} 
                      className="p-3 rounded-lg bg-background/50 border border-border/50 cursor-pointer hover:bg-background/80 transition-colors"
                      onClick={() => navigate(`/orders`)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.items.length} items • Table {order.tableNumber}
                          </p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={order.status === 'kitchen' ? 'bg-status-error/20 text-status-error border-status-error/30' : ''}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Timer className="h-3 w-3" />
                        <span>ETA: {order.estimatedTime || 15} mins</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No orders in queue</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Station Info */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>Station Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="h-5 w-5 text-primary" />
                  <span className="font-medium">Station</span>
                </div>
                <p className="text-2xl font-bold capitalize">{chef.station}</p>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-status-warning" />
                  <span className="font-medium">Queue Length</span>
                </div>
                <p className="text-2xl font-bold">{chef.currentOrders.length} orders</p>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-status-success" />
                  <span className="font-medium">Status</span>
                </div>
                <p className="text-2xl font-bold capitalize">{chef.status}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ChefDetail;
