import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { useAuth } from "@clerk/clerk-react";
import { checkCustomUrlAvailaibilityAPI } from "@/lib/api";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";

const CustomLinkForm = () => {
  const defaultPart = import.meta.env.VITE_FRONT_BASE_URL + "/";
  const [userInput, setUserInput] = useState("");
  const { getToken } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const value = e.target.value;
    const updatedInput = value.substring(defaultPart.length);
    setUserInput(updatedInput);
  };

  const checkCustomUrlAvailaibility = async (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log("first");
    const token = await getToken();
    const response = await checkCustomUrlAvailaibilityAPI(userInput, token!);
    toast({
      description: response?.data.message,
    });
  };

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Create custom Link</CardTitle>
        <CardDescription>
          Check and create custom url for your link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Long Url</Label>
            <Input id="name" placeholder="Long Url" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Custom Url</Label>
            <div className="flex gap-4">
              <Input
                id="name"
                placeholder=""
                value={`${defaultPart}${userInput}`}
                onChange={handleChange}
              />
              <Button onClick={checkCustomUrlAvailaibility}>Check</Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        
        <Button>Create Custom Link</Button>
      </CardFooter>
    </Card>
  );
};

export default CustomLinkForm;
