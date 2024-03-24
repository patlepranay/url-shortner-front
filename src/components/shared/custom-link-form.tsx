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
import { checkCustomUrlAvailaibilityAPI, createShortLinkAPI } from "@/lib/api";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { useLinkStore } from "@/lib/store";

const CustomLinkForm = () => {
  const defaultPart = import.meta.env.VITE_FRONT_BASE_URL + "/";
  const [customUrl, setCustomUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const { addLink } = useLinkStore();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const value = e.target.value;
    if (e.target.id == "custom_url") {
      const updatedInput = value.substring(defaultPart.length);
      setCustomUrl(updatedInput);
    } else {
      setLongUrl(e.target.value);
    }
  };

  const checkCustomUrlAvailaibility = async (
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    console.log("first");
    const token = await getToken();
    const response = await checkCustomUrlAvailaibilityAPI(customUrl, token!);
    toast({
      description: response?.data.message,
    });
  };

  const generateCustomUrl = async () => {
    try {
      setLoading(true);
      new URL(longUrl);
      const token = await getToken();
      const result = await createShortLinkAPI(longUrl, token!, customUrl);

      if (result?.status === 201) {
        addLink(result.data.urlDetails);
        setLongUrl("")
        setCustomUrl("")
      } else {
        toast({
          title: "Request Failed",
          description: result.data.message,
        });
      }
    } catch (error) {
      toast({
        title: "Reuest Failed",
        description: error as string,
      });
    } finally {
      setLoading(false);
    }
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
            <Input
              id="long_url"
              placeholder="Long Url"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Custom Url</Label>
            <div className="flex gap-4">
              <Input
                id="custom_url"
                placeholder=""
                value={`${defaultPart}${customUrl}`}
                onChange={handleChange}
              />
              <Button onClick={checkCustomUrlAvailaibility}>Check</Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={generateCustomUrl} disabled={loading}>
          Create Custom Link
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CustomLinkForm;
