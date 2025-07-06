
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Package, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CreateOrder = () => {
  const [orderData, setOrderData] = useState({
    supplier: '',
    orderDate: new Date().toISOString().split('T')[0],
    expectedDelivery: '',
    notes: ''
  });

  const [orderItems, setOrderItems] = useState([
    { product: '', quantity: '', unitPrice: '' }
  ]);

  const { toast } = useToast();

  const handleOrderDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value
    });
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const updatedItems = [...orderItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setOrderItems(updatedItems);
  };

  const addItem = () => {
    setOrderItems([...orderItems, { product: '', quantity: '', unitPrice: '' }]);
  };

  const removeItem = (index: number) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating order:', { orderData, orderItems });
    toast({
      title: "Purchase Order Created",
      description: `Order for ${orderData.supplier} has been created successfully.`,
    });
    // Reset form
    setOrderData({
      supplier: '',
      orderDate: new Date().toISOString().split('T')[0],
      expectedDelivery: '',
      notes: ''
    });
    setOrderItems([{ product: '', quantity: '', unitPrice: '' }]);
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.unitPrice) || 0;
      return total + (quantity * price);
    }, 0).toFixed(2);
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
              <Link to="/orders">
                <Button variant="ghost">Orders</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <Link to="/orders" className="mr-4">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Purchase Order</h1>
            <p className="text-gray-600 mt-2">Create a new purchase order for inventory restocking</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
              <CardDescription>Basic details about the purchase order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier *</Label>
                  <Input
                    id="supplier"
                    name="supplier"
                    value={orderData.supplier}
                    onChange={handleOrderDataChange}
                    placeholder="Enter supplier name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orderDate">Order Date *</Label>
                  <Input
                    id="orderDate"
                    name="orderDate"
                    type="date"
                    value={orderData.orderDate}
                    onChange={handleOrderDataChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedDelivery">Expected Delivery Date</Label>
                <Input
                  id="expectedDelivery"
                  name="expectedDelivery"
                  type="date"
                  value={orderData.expectedDelivery}
                  onChange={handleOrderDataChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={orderData.notes}
                  onChange={handleOrderDataChange}
                  placeholder="Additional notes or special instructions"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Order Items</CardTitle>
                  <CardDescription>Add products to this purchase order</CardDescription>
                </div>
                <Button type="button" onClick={addItem} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderItems.map((item, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                    <div className="space-y-2">
                      <Label>Product *</Label>
                      <Input
                        value={item.product}
                        onChange={(e) => handleItemChange(index, 'product', e.target.value)}
                        placeholder="Product name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity *</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        placeholder="0"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Unit Price ($) *</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(index)}
                        disabled={orderItems.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Total Amount:</span>
                  <span className="text-2xl font-bold text-green-600">${calculateTotal()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-4">
            <Button type="submit">Create Order</Button>
            <Link to="/orders">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateOrder;
