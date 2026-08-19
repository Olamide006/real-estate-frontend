import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import PropertyDetails from "./pages/propertydetails";
import Listings from "./pages/listings";
import SignUpOwner from "./components/signup";
import LoginOwner from "./components/login";
import Contact from "./pages/contact";
import Dashboard from "./components/dashboard";
import AddPropertyModal from "./components/addPropertyModal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/owner/signup" element={<SignUpOwner />} />
      <Route path="/owner/login" element={<LoginOwner />} />
      <Route path="/owner/dashboard" element={<Dashboard />} />
      <Route path="/property/:property_id" element={<PropertyDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/addproperty" element={<AddPropertyModal />} />
    </Routes>
  );
}
export default App;
