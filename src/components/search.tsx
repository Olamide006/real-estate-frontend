import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

function SearchFilter() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("")
  const [location, setLocation] = useState("");
  const [amenities, setAmenities] = useState("");

  const handleSearch = () => {
    if (!keyword && !location && !amenities) {
      toast.error("Please enter a keyword or select at least one filter!");
      return;
    }

  

    const params = new URLSearchParams();

    if (keyword) params.set("keyword", keyword);
    if (location) params.set("location", location);
    if (amenities) params.set("amenities", amenities);

    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div className="mt-8">
      <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col md:flex-row md:flex-wrap gap-4 md:items-center">
        <Input
          type="text"
          placeholder="Enter Keywords"
          className="flex-1 min-w-[200px] px-3 py-2 border rounded-md"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <Select value={location} onValueChange={(val) => setLocation(val)}>
          <SelectTrigger className="min-w-[160px] flex-1">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="oyo">Oyo</SelectItem>
            <SelectItem value="ilorin">ilorin</SelectItem>
            <SelectItem value="ibadan">Ibadan</SelectItem>
          </SelectContent>
        </Select>

        <Select value={amenities} onValueChange={(val) => setAmenities(val)}>
          <SelectTrigger className="min-w-[150px] flex-1">
            <SelectValue placeholder="Amenities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pool">Swimming pool</SelectItem>
            <SelectItem value="parking">Parking</SelectItem>
            <SelectItem value="gym">Gym</SelectItem>
          </SelectContent>
        </Select>

        <Button
          className="bg-blue-700 hover:bg-blue-600 flex-shrink-0 md:self-stretch"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchFilter;
