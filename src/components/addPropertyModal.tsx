import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Plus, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { PropertyProps } from "@/types/property";
import { userServices } from "@/services/user.services";
import { toast } from "sonner";

function AddPropertyModal() {
  const [property, setProperty] = useState<PropertyProps>({
    property_id: 0,
    title: "",
    price: 0,
    location: "",
    amenities: [],
    createdAt: "",
    bedrooms: 0,
    bathrooms: 0,
    size: 0,
    description: "",
    images: [],
  });

  const [amenityInput, setAmenityInput] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const addAmenity = () => {
    if (amenityInput.trim() && !property.amenities.includes(amenityInput)) {
      setProperty({
        ...property,
        amenities: [...property.amenities, amenityInput.trim()],
      });
      setAmenityInput("");
    }
  };

  const removeAmenity = (amenity: string) => {
    setProperty({
      ...property,
      amenities: property.amenities.filter((a) => a !== amenity),
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleAddNewProperty = async (e: FormEvent) => {
    e.preventDefault();

    if (!property.title || !property.price || !property.location) {
      toast.error("Title, price, and location are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", property.title);
    formData.append("price", property.price.toString());
    formData.append("location", property.location);
    formData.append("bedrooms", property.bedrooms.toString());
    formData.append("bathrooms", property.bathrooms.toString());
    formData.append("size", property.size.toString());
    formData.append("description", property.description);
    formData.append("owner_id", "1"); // Replace with actual user ID from auth/session

    // Append amenities as JSON string
    formData.append("amenities", JSON.stringify(property.amenities));

    // Append each selected image
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await userServices.addProperty(formData);
      toast.success("Property added successfully");

      // Reset form
      setProperty({
        property_id: 0,
        title: "",
        price: 0,
        location: "",
        amenities: [],
        createdAt: "",
        bedrooms: 0,
        bathrooms: 0,
        size: 0,
        description: "",
        images: [],
      });
      setSelectedFiles([]);
    } catch (err) {
      toast.error("Failed to add property");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-800">
          <Plus className="w-4 h-4" />
          Add New Property
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-blue-600">
            Add New Property
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleAddNewProperty} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            <div className="grid gap-5">
              <div>
                <Label htmlFor="title" className="mb-2">
                  Property Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={property.title}
                  onChange={handleChange}
                  placeholder="e.g., Beautiful 3BR Apartment"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price" className="mb-2">
                    Price ($)
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={property.price || ""}
                    onChange={handleChange}
                    placeholder="250000"
                    min="0"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="mb-2">
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={property.location}
                    onChange={handleChange}
                    placeholder="e.g., Lagos, Nigeria"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Property Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bedrooms" className="mb-2">
                  Bedrooms
                </Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  value={property.bedrooms || ""}
                  onChange={handleChange}
                  placeholder="3"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="bathrooms" className="mb-2">
                  Bathrooms
                </Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  value={property.bathrooms || ""}
                  onChange={handleChange}
                  placeholder="2"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="size" className="mb-2">
                  Size (sq ft)
                </Label>
                <Input
                  id="size"
                  name="size"
                  type="number"
                  value={property.size || ""}
                  onChange={handleChange}
                  placeholder="1200"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="">
            <h3 className="text-lg font-medium">Amenities</h3>
            <div className="flex gap-2">
              <Input
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                placeholder="Add amenity (e.g., Swimming Pool)"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addAmenity();
                  }
                }}
              />
              <Button type="button" onClick={addAmenity} variant="outline">
                Add
              </Button>
            </div>
            {property.amenities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1 border"
                  >
                    {amenity}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-500"
                      onClick={() => removeAmenity(amenity)}
                    />
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="">
            <h3 className="text-lg font-medium">Description</h3>
            <Textarea
              name="description"
              value={property.description}
              onChange={handleChange}
              placeholder="Describe your property in details..."
              rows={4}
            />
          </div>

          {/* Images */}
          <div className="">
            <h3 className="text-lg font-medium">Property Images</h3>
            <Input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
            />
            {selectedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedFiles.map((file, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-2 py-1 rounded text-sm"
                  >
                    {file.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6 pt-4 border-t">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Save Property
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddPropertyModal;
