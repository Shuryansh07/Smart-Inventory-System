
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SupplierSearch from "@/components/SupplierSearch";
import SupplierList from "@/components/SupplierList";

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const mockSuppliers = [
    {
      id: 1,
      name: "Apple Inc.",
      email: "orders@apple.com",
      phone: "+1-800-275-2273",
      address: "1 Apple Park Way, Cupertino, CA",
      products: 15,
      totalOrders: 45,
      status: "Active",
      rating: 4.9
    },
    {
      id: 2,
      name: "Samsung Electronics",
      email: "b2b@samsung.com",
      phone: "+1-800-726-7864",
      address: "85 Challenger Rd, Ridgefield Park, NJ",
      products: 23,
      totalOrders: 67,
      status: "Active",
      rating: 4.7
    },
    {
      id: 3,
      name: "Dell Technologies",
      email: "sales@dell.com",
      phone: "+1-800-915-3355",
      address: "One Dell Way, Round Rock, TX",
      products: 18,
      totalOrders: 34,
      status: "Active",
      rating: 4.5
    },
    {
      id: 4,
      name: "HP Inc.",
      email: "orders@hp.com",
      phone: "+1-800-474-6836",
      address: "1501 Page Mill Rd, Palo Alto, CA",
      products: 12,
      totalOrders: 28,
      status: "Inactive",
      rating: 4.2
    }
  ];

  const filteredSuppliers = mockSuppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Supplier Management</h1>
            <p className="text-gray-600 mt-2">Manage your supplier relationships</p>
          </div>
          <Link to="/suppliers/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Supplier
            </Button>
          </Link>
        </div>

        <SupplierSearch 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />

        <SupplierList suppliers={filteredSuppliers} />
      </main>
    </div>
  );
};

export default Suppliers;
