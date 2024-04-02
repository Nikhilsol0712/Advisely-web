"use client";

import Image from "next/image";
import { dynamicUI } from "@/app/utils/assets";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function HomeTitle() {
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
    <div className=" w-full h-full flex bg-white gap-x-24 justify-center ">
      <div className=" ml-5">
        <Image width={450} height={500} src="/images/homeTitle.jpg" />
      </div>
      <div
        style={{ color: dynamicUI["COLOR-PRIMARY"] }}
        className="text-white gap-y-10  w-5/12 flex-col justify-center align-center items-center"
      >
        <p className=" h-48  px-20 text-4xl mt-8 font-bold ">
          Get all your questions answered from the best students and alumni.
        </p>

        <p className="px-20 mt-8 ">
          🍚 Do you get Dal-Chawal in Ireland? <br />
          💼 How easy is it to get a job after graduating?
          <br />
          🏡 Is it cheaper to live on campus or off campus?
        </p>

        <button
          onClick={onBookSession}
          style={{ backgroundColor: "rgb(151,122,241)" }}
          className="text-white w-56 h-10 font-bold rounded-lg mt-8 ml-20"
        >
          Book Your Free Session
        </button>
      </div>
    </div>
  );
}
