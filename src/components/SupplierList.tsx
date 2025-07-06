
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import SupplierCard from "./SupplierCard";

interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  products: number;
  totalOrders: number;
  status: string;
  rating: number;
}

interface SupplierListProps {
  suppliers: Supplier[];
}

const SupplierList = ({ suppliers }: SupplierListProps) => {
  if (suppliers.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No suppliers found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search terms or add a new supplier.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {suppliers.map((supplier) => (
        <SupplierCard key={supplier.id} supplier={supplier} />
      ))}
    </div>
  );
};

export default SupplierList;
