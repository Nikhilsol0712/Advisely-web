"use client";

import Image from "next/image";
import { dynamicUI } from "@/app/utils/assets";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function HeroSection() {
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
