import { DataTable } from "@/components/data-table";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { useLinkStore } from "@/lib/store";
import { columns } from "@/components/links-table-columns";

import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  useAuth,
  useUser,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import CustomLinkForm from "@/components/shared/custom-link-form";
import { Card, CardTitle } from "@/components/ui/card";
import Loading from "@/components/loadin";

const DashboardPage = () => {
  const { fetchLink } = useLinkStore();
  const { getToken } = useAuth();
  const { user } = useUser();
  const { links } = useLinkStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const email = user.emailAddresses?.[0]?.emailAddress; // Using optional chaining
      (async () => {
        setLoading(true);
        const token = await getToken();
        await fetchLink(email, token!);
        setLoading(false);
      })();
    }
  }, [user]);

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <main className="grid min-h-screen grid-rows-[auto,1fr,auto]">
          <Navbar />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 m-2 ">
            <div className="col-span-1 h-[85vh] md:h-full ">
              {loading ? (
                <Card className="">
                  <Loading />
                </Card>
              ) : (
                <DataTable columns={columns} data={links as never} />
              )}
            </div>

            <div className="col-span-1 flex flex-col gap-2">
              <CustomLinkForm />
              <Card className="w-full flex flex-grow justify-center ">
                <CardTitle className="  m-auto  p-5">
                  New features on the way!!!
                </CardTitle>
              </Card>
            </div>
          </div>

          <Footer />
        </main>
      </SignedIn>
    </>
  );
};

export default DashboardPage;
