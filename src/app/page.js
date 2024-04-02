"use client"; //place it on top only

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "./components/HeroSection/HeroSection";
import ExpetsCard from "./components/ExpertsCard/ExpertsCard";
import HomeTitle from "./components/HomeTitle/HomeTitle";
import Footer from "./components/Footer/Footer";
import HomeTextTitle from "./components/HomeTextTitle/HomeTextTitle";
import HomeFlow from "./components/HomeFlow/HomeFlow";
import {
  getAllSmeRequest,
  getAllSmeSuccess,
  getAllSmeFailure,
} from "./Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import userServices from "./services/userService";

export default function Home() {

  const route = useRouter();
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const { AllSme } = useSelector((state) => state.user);
  const { token, userInfo } = useSelector((state) => state.auth);

  const fetchAllSme = async () => {
    try {
      dispatch(getAllSmeRequest());
      const response = await userServices.findAllSme();
      if (response.success === true) {
        dispatch(getAllSmeSuccess(response.result));
      }
    } catch (err) {
      // dispatch(getAllSmeFailure(response.error));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("x-access-token");
    const userType = localStorage.getItem("userType");

    console.log("token ++", token);

    if (token) {
      route.push("/user/home");
    }

    fetchAllSme();
  }, []);

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
    <div className="flex  overflow-y-auto   w-full text-black min-h-screen flex-col items-center justify-between ">
      <div className="w-full mt-16 ">
        <HeroSection />
      </div>
      <div className="w-full">
        <h6 className="mt-10 font-semibold text-lg text-center">
          Talk to students and alumni from 500+ universities.
        </h6>

        <div className=" w-full  ">
          <div className="flex flex-row no-scrollbar overflow-x-hidden">
            {AllSme.map((sme, index) => (
              <ExpetsCard smeDetail={sme} key={index} />
            ))}
          </div>
        </div>
        <div className="mt-10">
          <HomeTitle />
        </div>
        <div className="mt-10">
          <HomeTextTitle />
        </div>
        <div>
          <HomeFlow />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
