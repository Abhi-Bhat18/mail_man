import { Button } from "../ui/button";
import React from "react";
import HeroGif from "../../../public/GIFS/Hero.gif";

const Hero = () => {
  return (
    <div className="flex h-[100vwh] items-center">
      <div className="basis-1/2 space-y-5">
        <h5 className="text-7xl font-semibold">Power Your Email Marketing</h5>
        <p>
          Discover the ultimate open source solution for seamless email sending
          and powerful marketing campaigns.
        </p>
        <div className="flex space-x-5">
          <Button>
            Get started
          </Button>
          <Button variant={"outline"} >
            Learn more
          </Button>
        </div>
      </div>
      <div className="basis-1/2 flex justify-center items-center">
        <iframe
          src="https://lottie.host/embed/d1e0c6fb-fe77-4ae6-8c1c-c387766dc058/9TE363yTOo.json"
          height={"600px"}
          width={"600px"}
          style={{ border: "none", background: "transparent" , }}
        ></iframe>

      </div>
    </div>
  );
};

export default Hero;
