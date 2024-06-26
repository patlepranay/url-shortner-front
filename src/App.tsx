import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/loadin";
const LandingPage = lazy(() => import("./pages/landing"));
const DashboardPage = lazy(() => import("./pages/dashboard"));
const SignInPage = lazy(() => import("./pages/sign-in"));
const SignUpPage = lazy(() => import("./pages/sign-up"));
const ShortUrlRedirect = lazy(() => import("./pages/shortUrlRedirect"));
const Error = lazy(() => import("./pages/error"));
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
      <Suspense fallback={<Loading/>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
