
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Package, Search, Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const mockProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      sku: "IPH15P-256",
      category: "Electronics",
      stock: 45,
      minStock: 10,
      price: 999.99,
      supplier: "Apple Inc.",
      status: "In Stock"
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      sku: "SGS24-128",
      category: "Electronics",
      stock: 8,
      minStock: 15,
      price: 799.99,
      supplier: "Samsung",
      status: "Low Stock"
    },
    {
      id: 3,
      name: "MacBook Air M3",
      sku: "MBA-M3-512",
      category: "Computers",
      stock: 23,
      minStock: 5,
      price: 1299.99,
      supplier: "Apple Inc.",
      status: "In Stock"
    },
    {
      id: 4,
      name: "Dell XPS 13",
      sku: "DXP13-512",
      category: "Computers",
      stock: 0,
      minStock: 5,
      price: 1099.99,
      supplier: "Dell",
      status: "Out of Stock"
    }
  ];

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-600 mt-2">Manage your product inventory</p>
          </div>
          <Link to="/inventory/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by product name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>
              {filteredProducts.length} products found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Product</th>
                    <th className="text-left py-3 px-4 font-medium">SKU</th>
                    <th className="text-left py-3 px-4 font-medium">Category</th>
                    <th className="text-left py-3 px-4 font-medium">Stock</th>
                    <th className="text-left py-3 px-4 font-medium">Price</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-600">{product.supplier}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{product.sku}</td>
                      <td className="py-3 px-4 text-sm">{product.category}</td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          <div>{product.stock} units</div>
                          <div className="text-gray-500">Min: {product.minStock}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">${product.price}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(product.status)}>
                          {product.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
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

export default Inventory;
