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
import type { UserLoginProps } from "@/types/user.type";
import { toast } from "sonner";
import { userServices } from "@/services/user.services";

function LoginOwner() {
  const navigate = useNavigate();
  const [values, setValues] = useState<UserLoginProps>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { username, password } = values;

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!username || !password) {
        toast.error("Username and password required");
        return;
      }
      const res = await userServices.loginUser(
        values.username,
        values.password
      );
      console.log({ res });

      if (res?.success === true) {
        const userData = {
          id: res.message.owner_id,
          username: res.message.username,
          email: res.message.email,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success("Login successful");
        navigate("/owner/dashboard");
      } else {
        toast.error("Login failed - invalid response structure");
        console.error("Unexpected response structure:", res);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:block md:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="House"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/60 to-blue-900/40" />
      </div>

      <div className="flex flex-1 items-center justify-center p-4 relative">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="House"
          className="absolute inset-0 w-full h-full object-cover md:hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-900/10 md:hidden" />

        <Card className="relative w-full max-w-md backdrop-blur-md border border-white/20 shadow-xl ">
          <CardHeader className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <Home className="w-7 h-7 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">
                Property Hub
              </span>
            </div>
            <CardTitle className="text-2xl font-semibold text-blue-600">
              Sign in{" "}
            </CardTitle>
            <p className="text-sm text-blue-600">House Owner/Agent</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Your password"
                    onChange={handleChange}
                    required
                  />
                  <a
                    href="#"
                    className="ml-auto text-sm text-blue-600 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <CardFooter className="flex-col gap-3 mt-4">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "please wait..." : "sign in"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
          <CardFooter>
            <span>Don't have an account? sign up</span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
export default LoginOwner;
