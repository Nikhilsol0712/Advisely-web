"use client";
import React, { useEffect, useRef } from "react";

import Image from "next/image";
import { dynamicUI } from "@/app/utils/assets";
import { gsap } from "gsap";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const textRef = useRef(null);
  const { token, userInfo } = useSelector((state) => state.auth);
  const route = useRouter();
  
  const onBookSession = async () => {
    if (token && userInfo?.userType === "customer") {
      route.push("/user/home");
    } else if (token && userInfo?.userType === "SME") {
      route.push("/mentors");
    } else {
      route.push("/login");
    }
  };

  return (
    <div
      style={{ backgroundColor: dynamicUI["COLOR-PRIMARY"] }}
      className=" w-full h-full flex justify-between"
    >
      <div className="text-white  w-7/12 flex-col justify-center align-center items-center">
        <p className=" h-48  px-20 text-5xl mt-24 font-bold ">
          Talk to students & alumni and learn from their personal experience
        </p>

        <p className="px-20 mt-2 text-gray-200">
          Learn about campus life, application processes, jobs after graduation,
          or living in a foreign country. Book your free call and make an
          informed college decision
        </p>

        <button
          onClick={onBookSession}
          style={{ color: "rgb(151,122,241)" }}
          className="bg-white w-52 h-10 font-bold rounded-lg mt-4 ml-20"
        >
          Book session
        </button>
      </div>
      <div className="">
        <Image width={450} height={500} src="/images/heroSectionImage.jpg" />
      </div>
    </div>
  );
}
