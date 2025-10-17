import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const businessUnits = [
    { name: 'CBU', totalProducts: 45, path: '/business-unit/cbu' },
    { name: 'EBU', totalProducts: 32, path: '/business-unit/ebu' },
    { name: 'MPESA', totalProducts: 28, path: '/business-unit/mpesa' },
    { name: 'CVM', totalProducts: 19, path: '/business-unit/cvm' },
    { name: 'J4U', totalProducts: 24, path: '/business-unit/j4u' }
  ];

  const chartData = businessUnits.map(bu => ({
    name: bu.name,
    products: bu.totalProducts
  }));

  const bundles = [
    { id: 'BND001', type: 'Data Bundle', validity: '7 Days', businessUnit: 'CBU', price: '₦500' },
    { id: 'BND002', type: 'Voice Bundle', validity: '30 Days', businessUnit: 'EBU', price: '₦1,200' },
    { id: 'BND003', type: 'SMS Bundle', validity: '14 Days', businessUnit: 'MPESA', price: '₦300' },
    { id: 'BND004', type: 'Combo Bundle', validity: '30 Days', businessUnit: 'CVM', price: '₦2,500' },
    { id: 'BND005', type: 'Data Bundle', validity: '7 Days', businessUnit: 'J4U', price: '₦800' },
    { id: 'BND006', type: 'Voice Bundle', validity: '7 Days', businessUnit: 'CBU', price: '₦600' },
    { id: 'BND007', type: 'Data Bundle', validity: '30 Days', businessUnit: 'EBU', price: '₦3,000' },
    { id: 'BND008', type: 'SMS Bundle', validity: '7 Days', businessUnit: 'MPESA', price: '₦200' }
  ];

  const filteredBundles = bundles.filter(bundle =>
    Object.values(bundle).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">Welcome to NCC UAT Portal</p>
      </div>

      {/* Business Unit Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {businessUnits.map((bu) => (
          <Card
            key={bu.name}
            className="cursor-pointer transition-colors hover:bg-primary/5 hover:border-primary"
            onClick={() => navigate(bu.path)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {bu.name}
              </CardTitle>
              <Building2 className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{bu.totalProducts}</div>
              <p className="text-xs text-muted-foreground mt-1">Total Products</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Product Distribution Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Product Distribution by Business Unit</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Bar dataKey="products" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bundle List Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Bundle List</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bundles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredBundles.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No bundles found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/10">
                  <TableHead className="font-semibold text-foreground">Bundle ID</TableHead>
                  <TableHead className="font-semibold text-foreground">Product Type</TableHead>
                  <TableHead className="font-semibold text-foreground">Validity</TableHead>
                  <TableHead className="font-semibold text-foreground">Business Unit</TableHead>
                  <TableHead className="text-right font-semibold text-foreground">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBundles.map((bundle) => (
                  <TableRow
                    key={bundle.id}
                    className="cursor-pointer hover:bg-primary/5"
                    onClick={() => navigate(`/bundle/${bundle.id}`)}
                  >
                    <TableCell className="font-medium">{bundle.id}</TableCell>
                    <TableCell>{bundle.type}</TableCell>
                    <TableCell>{bundle.validity}</TableCell>
                    <TableCell>{bundle.businessUnit}</TableCell>
                    <TableCell className="text-right">{bundle.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
