// import { PropertyProps } from "@/types/property"
import properties from "../mocks/property.json";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator"
function Property() {
  return (
    <div>
      <h1 className="text-center text-5xl my-9">Property Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  mx-7 ">
        {properties.map((property) => (
          <div key={property.property_id}>
            <div className="shadow-md">
              <div className="rounded-md flex justify-center">
                <img
                  className="w-[500px] h-[300px] rounded-md items-center text-center"
                  src={property.images[0]}
                  alt={property.title}
                />
              </div>
              <div className="mx-3.5 my-2.5 flex flex-col gap-1.2">
                <h2 className="text-2xl">{property.title}</h2>
<p>{property.location}</p>
                <div className="grid grid-cols-2 gap-1">
                  {property.amenities.map((amenity, index) => (
                    <p key={index} className="text-sm text-gray-700">
                      {amenity}
                    </p>
                  ))}
                </div>
               <Separator className="my-2"/>
            <div className="flex justify-between items-center my-2">
                 <p>${property.price}</p>
                  <Link to={`/property/${property.property_id}`}>
                 <Button className="bg-blue-600 hover:bg-blue-800">
                  View Property
                  </Button></Link>
            </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Property;