import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {  useClerk, useUser } from "@clerk/clerk-react";
import { AlignJustify, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const SideBar = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate=useNavigate()

  return (
    <>
      <section className="">
        <Sheet>
          <SheetTrigger>
            <AlignJustify />
          </SheetTrigger>
          <SheetContent side={"left"} className=" flex flex-col">
            <SheetHeader>
              <SheetTitle>Short URL</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col justify-between h-full mt-4">
              <div>
                <Link to="/">Home</Link>
              </div>
              <div className="flex flex-col ">
                <div className="grid grid-cols-12  items-center">
                  <img
                    src={user?.imageUrl}
                    alt="user_image"
                    className="h-[36px] w-[36px] rounded-full col-span-2 m-auto"
                  />
                  <p className="font-medium p-4 col-span-7  ">
                    {user?.fullName}
                  </p>
                </div>
                <div className="grid grid-cols-12  items-center">
                  <LogOut className="col-span-2 m-auto" />
                  <Button
                    variant={"link"}
                    className="col-span-7 justify-start "
                    onClick={() => signOut(() => navigate("/"))}
                  >
                    SignOut
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </section>
    </>
  );
};

export default SideBar;
