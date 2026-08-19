import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import BuyNowModal from "@/components/BuyModal";
import { userServices } from "@/services/user.services";
import { toast } from "sonner";
import type { PropertyProps } from "@/types/property";

function PropertyDetails() {
  const { property_id } = useParams<{ property_id: string }>();
  const [property, setProperty] = useState<PropertyProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!property_id) return;

      try {
        const idNumber = Number(property_id); // convert string to number
        const data = await userServices.getPropertyById(idNumber);
        setProperty(data);
      } catch (err) {
        toast.error("Property not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [property_id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-red-500">Property Not Found</p>
      </div>
    );
  }

  // Ensure amenities is always an array
  const amenitiesArray = Array.isArray(property.amenities)
    ? property.amenities
    : JSON.parse(property.amenities || "[]");

  return (
    <>
      <NavBar />
      <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-8 md:gap-12 min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 w-full md:w-96 lg:w-[400px]">
          <img
            src={`http://localhost:8000${property.images?.[0]}`}
            alt={property.title}
            className="w-full h-64 md:h-72 lg:h-80 object-contain rounded-lg"
          />
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {property.images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:8000${img}`}
                alt={`Thumbnail ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg border hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        <div className="w-full md:max-w-md mt-6 md:mt-0">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            {property.title}
          </h1>
          <p className="text-gray-500 mt-2">{property.location}</p>

          <div className="mt-4 grid grid-cols-3 gap-2 md:gap-4 text-center">
            <div className="bg-gray-100 p-2 md:p-3 rounded-lg">
              <p className="text-lg font-semibold">{property.bedrooms}</p>
              <span className="text-gray-500 text-sm">Bedrooms</span>
            </div>
            <div className="bg-gray-100 p-2 md:p-3 rounded-lg">
              <p className="text-lg font-semibold">{property.bathrooms}</p>
              <span className="text-gray-500 text-sm">Bathrooms</span>
            </div>
            <div className="bg-gray-100 p-2 md:p-3 rounded-lg">
              <p className="text-lg font-semibold">{property.size} sqft</p>
              <span className="text-gray-500 text-sm">Size</span>
            </div>
          </div>

          <p className="mt-4 md:mt-6 text-gray-700">{property.description}</p>

          <div className="mt-4 md:mt-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
              Amenities
            </h2>
            <ul className="flex flex-wrap gap-2">
              {amenitiesArray.map((amenity: string, index: number) => (
                <li
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm md:text-base"
                >
                  {amenity}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <BuyNowModal propertyName={property.title} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PropertyDetails;
