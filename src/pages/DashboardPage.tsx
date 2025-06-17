import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Icons
import { Home, LogOut, Settings, BarChart2 } from 'lucide-react';

// Placeholder data for the table
const sampleActivities = [
  { id: '1', description: 'User JaneDoe successfully logged in.', date: '2024-08-15', type: 'Authentication' },
  { id: '2', description: 'New report "Q3 Sales" generated.', date: '2024-08-14', type: 'Report' },
  { id: '3', description: 'System settings updated by admin.', date: '2024-08-14', type: 'Configuration' },
  { id: '4', description: 'User AlexSmith registered.', date: '2024-08-13', type: 'New User' },
];

const DashboardPage: React.FC = () => {
  useEffect(() => {
    console.log('DashboardPage loaded');
    // Display a success toast as per user journey
    // Assuming Sonner Toaster is configured in App.tsx
    toast.success("Login Successful", {
      description: "Welcome to your dashboard!",
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-gray-50 dark:bg-gray-900 p-4 border-r border-border hidden md:flex md:flex-col">
          <nav className="flex-grow">
            <NavigationMenu orientation="vertical" className="w-full">
              <NavigationMenuList className="flex flex-col space-y-1 w-full">
                <NavigationMenuItem className="w-full">
                  <Link to="/dashboard" className="w-full">
                    <NavigationMenuLink active className={`${navigationMenuTriggerStyle()} w-full justify-start bg-primary/10 text-primary hover:bg-primary/20`}>
                      <Home className="mr-2 h-4 w-4" /> Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="w-full">
                  <Link to="#" className="w-full"> {/* Placeholder link */}
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                      <BarChart2 className="mr-2 h-4 w-4" /> Analytics
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="w-full">
                  <Link to="#" className="w-full"> {/* Placeholder link */}
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          {/* Logout button at the bottom of sidebar */}
          <div className="mt-auto">
             <Link to="/" className="w-full block"> {/* Link to LoginPage as per App.tsx */}
                <Button variant="ghost" className="w-full justify-start">
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <ScrollArea className="flex-1">
          <main className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Welcome Back!</h1>
                <Button variant="outline" className="mt-4 sm:mt-0">
                    Generate Report
                </Button>
            </div>

            {/* Stats Cards Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,204</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                  <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">893</div>
                  <p className="text-xs text-muted-foreground">+15% from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
                  <AlertCircleIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">32</div>
                  <p className="text-xs text-muted-foreground">5 critical</p>
                </CardContent>
              </Card>
            </section>
            
            {/* Recent Activity Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>An overview of recent actions within the application.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">{activity.id}</TableCell>
                        <TableCell>{activity.description}</TableCell>
                        <TableCell>{activity.type}</TableCell>
                        <TableCell className="text-right">{activity.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </ScrollArea>
      </div>
      <Footer />
    </div>
  );
};

// Placeholder icons (replace with actual lucide-react imports if needed elsewhere or use specific ones)
const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AlertCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default DashboardPage;