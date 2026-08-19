import { Building, Home, LogOut, Menu, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import AddPropertyModal from "./addPropertyModal";
import { useEffect, useState } from "react";
import { userServices } from "@/services/user.services";
import type { PropertyProps } from "@/types/property";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ id: number; username: string } | null>(
    null
  );

  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [totalProperties, setTotalProperties] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await userServices.getAllProperties();
      console.log("frontend fetched", res?.data);
      setProperties(res?.data);
      setTotalProperties(res?.data?.length || 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 bg-blue-600 text-white flex-col p-6 space-y-6">
          <div className="flex items-center space-x-2 text-2xl font-bold">
            <Home className="w-7 h-7 text-white" />
            <span>Property Hub</span>
          </div>

          <nav className="flex flex-col space-y-4 text-sm font-medium">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center space-x-2 hover:text-blue-200"
            >
              <Building className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center space-x-2 hover:text-blue-200"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
          </nav>

          <div className="mt-auto">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 hover:text-blue-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-16 bg-white border-b flex items-center justify-between px-6">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SheetHeader className="p-6 border-b text-black">
                  <div className="flex items-center space-x-2 text-2xl font-bold">
                    <Home className="w-7 h-7 text-black" />
                    <SheetTitle className="text-black">Property Hub</SheetTitle>
                  </div>
                </SheetHeader>

                <nav className="flex flex-col space-y-4 text-sm font-medium p-6">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center space-x-2 hover:text-blue-600"
                  >
                    <Building className="w-5 h-5" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center space-x-2 hover:text-blue-600"
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </button>
                </nav>
                <div className="mt-auto px-5 my-4">
                  <button
                    onClick={() => navigate("/auth")}
                    className="flex items-center space-x-2 hover:text-blue-600 mt-auto"
                  >
                    <LogOut className="w-5 h-5 " />
                    <span>Logout</span>
                  </button>
                </div>
              </SheetContent>
            </Sheet>

            {/* User Profile */}
            <div className="flex-1 flex flex-col">
              <section className="h-16 bg-white border-b flex items-center justify-end px-6">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium">Hi, {user?.username}</span>
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {user?.username.charAt(0).toUpperCase()}
                  </div>
                </div>
              </section>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6 flex-1">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white shadow rounded-lg p-4 text-center">
                <p className="text-gray-500">Total Properties</p>
                <p className="text-2xl font-bold">{totalProperties}</p>
              </div>
              <div className="bg-white shadow rounded-lg p-4 text-center">
                <p className="text-gray-500">Pending Inquiries</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="bg-white shadow rounded-lg p-4 text-center">
                <p className="text-gray-500">Total Views</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>

            <div className="mb-6">
              <AddPropertyModal />
            </div>

            {/* Properties Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Your Properties</h2>

              {properties.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {properties.map((property: PropertyProps) => {
                    const amenitiesArray = Array.isArray(property.amenities)
                      ? property.amenities
                      : JSON.parse(property.amenities);

                    return (
                      <div
                        key={property.property_id}
                        className="border rounded-xl p-4 shadow-md bg-white hover:shadow-lg transition flex flex-col justify-between"
                      >
                        <div>

<img
                          src={`http://localhost:8000${property.images?.[0]}`}
                          alt={property.title}
                          className="w-full h-48 object-cover mb-2 rounded"
                        />
                        <h3 className="font-bold text-lg text-blue-700">
                          {property.title}
                        </h3>
                        <p className="text-gray-600">Location: {property.location}</p>

                        <div className="flex flex-wrap gap-2 mt-2">
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
                        <div className="mt-3 flex gap-2">
                          <Link to={`/property/${property.property_id}`} key={property.property_id}>
                            <Button className="bg-blue-600 hover:bg-blue-800">
                              View
                            </Button>
                          </Link>
                        
                        <Button
  className="bg-red-600 hover:bg-red-800"
  onClick={async () => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    try {
      await userServices.deleteProperty(property.property_id);
      // Refresh properties after deletion
      fetchProperties();
    } catch (error) {
      console.log(error);
    }
  }}
>
  Delete
</Button>

                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <Building className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No properties yet</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
