import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SupplierSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SupplierSearch = ({
  searchTerm,
  onSearchChange,
}: SupplierSearchProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Search Suppliers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by supplier name or email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierSearch;
