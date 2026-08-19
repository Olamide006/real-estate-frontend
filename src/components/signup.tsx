import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { UserProps } from "@/types/user.type";
import { toast } from "sonner";
import { userServices } from "@/services/user.services";

function SignUpOwner() {
  // const [repeatPassword, setRepeatPassword] = useState("");

  const navigate = useNavigate();

  const [values, setValues] = useState<UserProps>({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { username, email, password } = values;
  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!username || !email || !password) {
        toast.error("Username and password required");
        return;
      }

      const res = await userServices.createUser(
        values.username,
        values.email,
        values.password
      );
      console.log(res);

    if(res.success === true){
navigate('/owner/login')
    }else{
      console.log(res.message);
    }
    } catch (error) {
      console.log(error);
       } finally {
      setLoading(false);
    }
  };

  // // Email validation
  // if (!email.trim()) {
  //   setToastType("error");
  //   setToastMessage("Email is required!");
  //   return;
  // }
  // if (!/^\S+@\S+\.\S+$/.test(email)) {
  //   setToastType("error");
  //   setToastMessage("Enter a valid email address!");
  //   return;
  // }

  // // Password validation
  // if (!password.trim()) {
  //   setToastType("error");
  //   setToastMessage("Password is required!");
  //   return;
  // }
  // if (password.length < 6) {
  //   setToastType("error");
  //   setToastMessage("Password must be at least 6 characters!");
  //   return;
  // }

  // Repeat password validation
  // if (password !== repeatPassword) {
  //   setToastType("error");
  //   setToastMessage("Passwords do not match!");
  //   return;
  // }

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:block md:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="House"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
      </div>

      <div className="flex flex-1 items-center justify-center p-4 relative">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="House"
          className="absolute inset-0 w-full h-full object-cover md:hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black to-black/10 md:hidden" />

        <Card className="relative w-full max-w-md backdrop-blur-md border border-white/20 shadow-xl ">
          <CardHeader className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <Home className="w-7 h-7 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">
                Property Hub
              </span>
            </div>
            <CardTitle className="text-2xl font-semibold text-blue-600">
              Create Your Account
            </CardTitle>
            <p className="text-sm text-blue-600">House Owner</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    name="username"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    placeholder="m@example.com"
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    placeholder="Your password"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* <div className="grid gap-2">
                  <Label htmlFor="repeatPassword">Repeat Password</Label>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    onChange={}
                    required
                  />
                </div> */}
              </div>

              <CardFooter className="flex-col gap-3 mt-4">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-800"
                  disabled={loading}
                >
                  {loading ? "please wait...." : "Sign Up"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default SignUpOwner;
