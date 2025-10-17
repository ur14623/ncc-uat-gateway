import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation } from 'react-router-dom';

export default function PlaceholderPage() {
  const location = useLocation();
  const pageName = location.pathname
    .split('/')
    .filter(Boolean)
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '))
    .join(' - ');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{pageName}</h1>
        <p className="text-muted-foreground mt-2">This page is ready for implementation</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{pageName}</CardTitle>
          <CardDescription>Content and functionality will be added here</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This section is prepared for the {pageName.toLowerCase()} functionality.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
