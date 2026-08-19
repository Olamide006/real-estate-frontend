import Cards from "@/components/card";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import NavBar from "@/components/navbar";
import Property from "@/components/property";
import { Separator } from "@/components/ui/separator";

function Homepage() {
  return (
    <div>
      <NavBar />
      <Hero />
      <Property />
      <Cards />
      <Separator />
      <Footer />
    </div>
  );
}

export default Homepage;
