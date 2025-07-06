
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Package, Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const mockOrders = [
    {
      id: 1,
      orderNumber: "PO-2024-001",
      supplier: "Apple Inc.",
      date: "2024-01-15",
      items: 3,
      totalAmount: 15599.97,
      status: "Delivered",
      expectedDate: "2024-01-20"
    },
    {
      id: 2,
      orderNumber: "PO-2024-002",
      supplier: "Samsung Electronics",
      date: "2024-01-18",
      items: 5,
      totalAmount: 8999.95,
      status: "In Transit",
      expectedDate: "2024-01-25"
    },
    {
      id: 3,
      orderNumber: "PO-2024-003",
      supplier: "Dell Technologies",
      date: "2024-01-20",
      items: 2,
      totalAmount: 2199.98,
      status: "Processing",
      expectedDate: "2024-01-28"
    },
    {
      id: 4,
      orderNumber: "PO-2024-004",
      supplier: "HP Inc.",
      date: "2024-01-22",
      items: 4,
      totalAmount: 4799.96,
      status: "Pending",
      expectedDate: "2024-01-30"
    }
  ];

  const filteredOrders = mockOrders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Smart Inventory</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/inventory">
                <Button variant="ghost">Inventory</Button>
              </Link>
              <Link to="/analytics">
                <Button variant="ghost">Analytics</Button>
              </Link>
              <Link to="/suppliers">
                <Button variant="ghost">Suppliers</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Purchase Orders</h1>
            <p className="text-gray-600 mt-2">Manage your purchase orders and deliveries</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Order
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {[
            { title: "Total Orders", value: "156", color: "text-blue-600" },
            { title: "Pending Orders", value: "23", color: "text-yellow-600" },
            { title: "In Transit", value: "45", color: "text-blue-600" },
            { title: "Delivered", value: "88", color: "text-green-600" }
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <Package className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by order number or supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              {filteredOrders.length} orders found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Order #</th>
                    <th className="text-left py-3 px-4 font-medium">Supplier</th>
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-left py-3 px-4 font-medium">Items</th>
                    <th className="text-left py-3 px-4 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Expected</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{order.orderNumber}</td>
                      <td className="py-3 px-4">{order.supplier}</td>
                      <td className="py-3 px-4 text-sm">{order.date}</td>
                      <td className="py-3 px-4 text-sm">{order.items} items</td>
                      <td className="py-3 px-4 font-medium">${order.totalAmount.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">{order.expectedDate}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Orders;
