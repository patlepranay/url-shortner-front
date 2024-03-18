import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/landing";
import DashboardPage from "./pages/dashboard";
import SignInPage from "./pages/sign-in";
import SignUpPage from "./pages/sign-up";
import ShortUrlRedirect from "./pages/shortUrlRedirect";
import Error from "./pages/error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/dashboard",
      element: <DashboardPage />,
    },
    {
      path: "/sign-in",
      element: <SignInPage />,
    },
    {
      path: "/sign-up",
      element: <SignUpPage />,
    },
    {
      path: "/error",
      element: <Error />,
    },
    {
      path: "/:shortUrl",
      element: <ShortUrlRedirect />,
    },
    
  ]);

  
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
