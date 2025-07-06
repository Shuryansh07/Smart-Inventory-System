
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, TrendingUp, AlertTriangle, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const stats = [
    {
      title: "Total Products",
      value: "1,234",
      change: "+12%",
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Low Stock Items",
      value: "23",
      change: "-5%",
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: "+18%",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Active Users",
      value: "573",
      change: "+7%",
      icon: Users,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Smart Inventory</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/inventory">
                <Button variant="ghost">Inventory</Button>
              </Link>
              <Link to="/analytics">
                <Button variant="ghost">Analytics</Button>
              </Link>
              <Link to="/suppliers">
                <Button variant="ghost">Suppliers</Button>
              </Link>
              <Link to="/orders">
                <Button variant="ghost">Orders</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to your inventory management system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>{' '}
                  from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest inventory movements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Stock Updated", item: "iPhone 15 Pro", time: "2 hours ago", type: "update" },
                  { action: "Low Stock Alert", item: "Samsung Galaxy S24", time: "4 hours ago", type: "alert" },
                  { action: "New Product Added", item: "MacBook Air M3", time: "6 hours ago", type: "add" },
                  { action: "Order Fulfilled", item: "Dell XPS 13", time: "8 hours ago", type: "order" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'alert' ? 'bg-red-500' :
                      activity.type === 'add' ? 'bg-green-500' :
                      activity.type === 'order' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.item}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your inventory efficiently</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/inventory/add">
                <Button className="w-full justify-start" variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Add New Product
                </Button>
              </Link>
              <Link to="/orders/create">
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Create Purchase Order
                </Button>
              </Link>
              <Link to="/analytics">
                <Button className="w-full justify-start" variant="outline">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  View Low Stock Items
                </Button>
              </Link>
              <Link to="/suppliers/add">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Add New Supplier
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
