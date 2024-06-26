import { useRef, useState } from "react";
import { useToast } from "../ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Copy } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { useLinkStore } from "@/lib/store";
import { createShortLinkAPI } from "@/lib/api";

const CreateLinkDialog = () => {
  const [shortUrl, setShortURL] = useState("");
  const [loading, setLoading] = useState(false);
  const inputUrlRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { getToken } = useAuth();
  const { addLink } = useLinkStore();
  const [shortURLVisibility, setShortURLVisibility] = useState(false);

  const generateURL = async () => {
    try {
      setLoading(true);
      new URL(inputUrlRef?.current!.value);
      const token = await getToken();
      const result = await createShortLinkAPI(
        inputUrlRef?.current!.value,
        token!
      );

      if (result?.status === 201) {
        addLink(result.data.urlDetails);
        setShortURL(result.data.shortUrl);
        setShortURLVisibility(true);
      } else {
        toast({
          title: "Request Failed",
          description: result.data.message,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Request Failed",
        description: error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const onCopyClick = () => {
    navigator.clipboard.writeText(shortUrl);
    toast({
      description: "Copied",
    });
  };

  const setDialogStatusOnOpen = async () => {
    setShortURL("");
    setShortURLVisibility(false);
  };

  return (
    <Dialog onOpenChange={setDialogStatusOnOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>Create Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Short Link</DialogTitle>
          <DialogDescription>
            Enter long link and generate short url.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Long URL
            </Label>
            <Input
              id="longurl"
              defaultValue={""}
              ref={inputUrlRef}
              className="col-span-3"
            />
          </div>
        </div>
        {shortURLVisibility && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-8 items-center gap-4">
              <Label htmlFor="name" className="text-right col-span-2">
                Short URL
              </Label>
              <Input value={shortUrl} disabled className="col-span-5" />

              <Button
                className="p-1 items-center justify-center "
                onClick={onCopyClick}
                variant={"outline"}
              >
                <Copy />
              </Button>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button type="button" disabled={loading} onClick={generateURL}>
            Generate URL
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLinkDialog;
