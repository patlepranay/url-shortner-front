import { motion } from "framer-motion";
import { LampContainer } from "../ui-lamp";
import { Button } from "../ui/button";
import { SparklesCore } from "../ui/sparkles";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <>
      <div className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1}
            particleDensity={10}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>

        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: -20 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className=" bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-6xl"
          >
            short.Link
            <br />
            <p className="text-2xl md:text-4xl">
              Turn any link into short custom link
            </p>
          </motion.h1>
          <motion.div
            className="mt-4"
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
                <span className="py-4 px-6   rounded-lg bg-white text-black font-medium  text-lg">
                  Sign In
                </span>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button className="bg-white text-black">
                <Link to={"/dashboard"}>Explore</Link>
              </Button>
            </SignedIn>
          </motion.div>
        </LampContainer>
      </div>
    </>
  );
}
