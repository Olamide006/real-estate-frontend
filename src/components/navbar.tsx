import { Home, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <section className="mx-7">
      <nav className="flex items-center justify-between py-4">
        <div className="text-2xl font-bold flex gap-1">
          <Home className="w-7 h-7 text-blue-600" />

          <h1 className="text-blue-600">PropertyHub</h1>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/listings" className="hover:text-blue-600">
            Listings
          </Link>
          <Link to="/contact" className="hover:text-blue-600">
            Contact
          </Link>
          <Link to="/owner/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/owner/signup">
            <Button className="bg-blue-600 hover:bg-blue-800">Sign Up</Button>
          </Link>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-64">
              <div className="flex flex-col gap-4 mt-6 px-5">
                <Link to="/" className="hover:text-blue-600">
                  Home
                </Link>
                <Link to="/listings" className="hover:text-blue-600">
                  Listings
                </Link>
                <Link to="/contact" className="hover:text-blue-600">
                  Contact
                </Link>
                <Link to="/owner/login">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/owner/signup">
                  <Button className="w-full bg-blue-600 hover:bg-blue-800">Sign Up</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </section>
  );
}

export default NavBar;
