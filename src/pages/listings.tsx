import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { PropertyProps } from "@/types/property";
import { useEffect, useState } from "react";
import { userServices } from "@/services/user.services";

function Listings() {
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [params] = useSearchParams();

  const fetchProperties = async () => {
    try {
      const res = await userServices.getAllProperties();
      console.log("frontend fetched", res?.data);
      setProperties(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const keyword = params.get("keyword")?.toLowerCase() || "";
  const location = params.get("location");
  const amenitiesFilter = params.get("amenities");

  // Filter properties
  const filtered = properties.filter((p) => {
    // Convert amenities to array if it's a string
    const amenitiesArray = Array.isArray(p.amenities)
      ? p.amenities
      : JSON.parse(p.amenities || "[]");

    return (
      (keyword ? p.title.toLowerCase().includes(keyword) : true) &&
      (location ? p.location === location : true) &&
      (amenitiesFilter ? amenitiesArray.includes(amenitiesFilter) : true)
    );
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Available Listings
      </h1>

      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property: PropertyProps) => {
            const amenitiesArray = Array.isArray(property.amenities)
              ? property.amenities
              : JSON.parse(property.amenities || "[]");

            return (
              <div
                key={property.property_id}
                className="border rounded-xl p-4 shadow-md bg-white hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <img
                    src={`http://localhost:8000${property.images?.[0]}`}
                    alt={property.title}
                  />
                  <h3 className="font-bold text-lg text-blue-700">
                    {property.title}
                  </h3>
                  <p>Location: {property.location}</p>

                  <p className="font-semibold ">Amenities:</p>
                  <div className="flex gap-2 flex-wrap">
                    {amenitiesArray.map((a: string, i: number) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <Link to={`/property/${property.property_id}`}>
                    <Button className="bg-blue-600 hover:bg-blue-800 mt-3">
                      View Property
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-600">No properties match your search.</p>
      )}
    </div>
  );
}

export default Listings;
