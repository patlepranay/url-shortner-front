import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => (
  <div className="flex items-center justify-center h-screen">
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" redirectUrl="/dashboard" />
  </div>
);

export default SignInPage;
