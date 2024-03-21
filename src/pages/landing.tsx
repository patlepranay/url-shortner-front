import { Boxes } from "@/components/ui/background-boxes";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    // <Hero/>
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.2,
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="h-screen relative w-full overflow-hidden bg-black flex flex-col items-center justify-center rounded-lg"
    >
      <div className="absolute inset-0 w-full h-full bg-black z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className=" bg-gradient-to-br from-white to-neutral-400  bg-clip-text p-4  text-center text-4xl font-medium tracking-tight text-transparent md:text-6xl space-y-6 z-20"
      >
        <p>url-short</p>

        <p className="text- 2xl md:text-3xl">
          Turn any link into short custom link
        </p>
      </motion.div>
      <motion.div
        className="m-2 z-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          delay: 1.2,
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        <SignedOut>
          <SignInButton redirectUrl="dashboard">
            <Button className="bg-white text-black" size={"lg"}>
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Button className="bg-white text-black">
            <Link to={"/dashboard"}>Explore</Link>
          </Button>
        </SignedIn>
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;
