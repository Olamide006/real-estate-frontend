import { useState } from "react";
import type { BuyNowModalProps } from "@/types/buyModal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";



export default function BuyNowModal({ propertyName }: BuyNowModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("All fields are required!");
      return;
    }

  
toast.success(`Thank you ${formData.name}! We will contact you at ${formData.email}`);

    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="w-full bg-blue-600 my-5 hover:bg-blue-800">Buy Now</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buy {propertyName}</DialogTitle>
            <DialogDescription>
              Please fill in your details and we will reach out to you.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label className="mb-2" htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label 
              className="mb-2"
              htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label 
                 className="mb-2"
              htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

   
    </>
  );
}
