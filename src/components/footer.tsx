import { Separator } from "@radix-ui/react-separator";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-blue-600">PropertyHub</h2>
          <p className="text-sm text-gray-600">
            Find your dream property with ease
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/listings">Listings</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/owner/login">Login</Link>
            </li>
            <li>
              <Link to="/ownwer/signup">Sign Up</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-sm">Email:olamideproperty@gmail.com</p>
          <p className="text-sm">Phone:+234 80960 56789</p>
        </div>
      </div>

      <Separator />
      <div className="p-4 text-center text-sm text-gray-500">
        &copy;2025 PropertyHub. All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
