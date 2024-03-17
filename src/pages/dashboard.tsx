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
import { useEffect } from "react";

const DashboardPage = () => {
  const { fetchLink } = useLinkStore();
  const { getToken } = useAuth();
  const { user } = useUser();
  const { links } = useLinkStore();

  useEffect(() => {
    if (user) {
      const email = user.emailAddresses?.[0]?.emailAddress; // Using optional chaining
      (async () => {
        const token = await getToken();
        fetchLink(email, token!);
      })();
    }
  }, [user]);

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="flex flex-col h-screen">
          <Navbar />
          <div>
            <DataTable columns={columns} data={links as never} />
          </div>

          <Footer />
        </div>
      </SignedIn>
    </>
  );
};

export default DashboardPage;
