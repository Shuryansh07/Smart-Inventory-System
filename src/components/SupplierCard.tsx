
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Phone, Mail } from "lucide-react";

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

interface SupplierCardProps {
  supplier: Supplier;
}

const SupplierCard = ({ supplier }: SupplierCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{supplier.name}</CardTitle>
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < Math.floor(supplier.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-1 text-sm text-gray-600">({supplier.rating})</span>
              </div>
            </div>
          </div>
          <Badge className={getStatusColor(supplier.status)}>
            {supplier.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="mr-2 h-4 w-4" />
            {supplier.email}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="mr-2 h-4 w-4" />
            {supplier.phone}
          </div>
          <div className="text-sm text-gray-600">
            {supplier.address}
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-3 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{supplier.products}</div>
              <div className="text-xs text-gray-600">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{supplier.totalOrders}</div>
              <div className="text-xs text-gray-600">Orders</div>
            </div>
          </div>

          <div className="flex space-x-2 pt-3">
            <Button size="sm" variant="outline" className="flex-1">
              <Edit className="mr-1 h-3 w-3" />
              Edit
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <Trash2 className="mr-1 h-3 w-3" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierCard;
