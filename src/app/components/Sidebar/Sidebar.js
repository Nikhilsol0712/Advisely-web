"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { dynamicUI } from "@/app/utils/assets";
import useWindowResize from "@/Hooks/useWindowResize";
import { HiHome } from "react-icons/hi2";
import { FaUserGraduate } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { PiChatsFill } from "react-icons/pi";
import { changeOutlet } from "@/app/Actions/outletChangeActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar({ router }) {
  const isMobile = useWindowResize();
  const { userInfo } = useSelector((state) => state.auth);
  const [userType, setUserType] = useState("");
  const [activeItem, setActiveItem] = useState("Home");
  const [mentorActiveItem, setMentorActiveItem] = useState("SMESessions");
  const route = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleItemClick = (item, path) => {
    setActiveItem(item); // Update active item state
    dispatch(changeOutlet(item));
  };

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setUserType(userType);
  }, []);

  useEffect(() => {
    // This effect runs when the component mounts and on route changes
    if (pathname === "/user/home") {
      setActiveItem("Home");
    } else if (pathname === "/user/book-mentor") {
      setActiveItem("bookAmentor");
    } else if (pathname === "/user/sessions") {
      setActiveItem("yourSessions");
    } else if (pathname === "/user/chat") {
      setActiveItem("chats");
    }
  }, [pathname]);

  return (
    <section className="flex sm:w-60 border-r flex sm:flex-col flex-col bg-white h-full  w-full ">
      {/* profile img and name section */}
      <div className="flex  sm:flex-col sm:h-36 sm:justify-center sm:items-center bg-white">
        <img
          alt=""
          className=" rounded-[50%] sm:h-16 sm:w-16"
          src={userInfo?.profilePic}
        />

        <span className=" text-purple-800 text-md font-regular sm:mt-1">
          {userInfo?.firstName} {userInfo?.lastName}
        </span>
      </div>

      {/* sidebar items for user component */}

      {userType === "customer" && (
        <div className="flex bg-white text-gray-400 sm:flex-col  sm:px-3 ">
          {/* home */}
          <div
            onClick={() => route.push("/user/home")}
            // onClick={() => handleItemClick("Home")}
            className={` ${
              activeItem === "Home" ? "text-purple-700" : ""
            } flex sm:flex-row sm:justify-start sm:items-center  rounded-md sm:py-4 hover:bg-purple-700 hover:text-white  hover:cursor-pointer`}
          >
            <div className="sm:mr-4 sm:pl-4 text-2xl">
              <HiHome />
            </div>
            <span className="text-lg font-medium hover:font-semibold">
              Home
            </span>
          </div>
          {/* Book a Mentor */}
          <div
            onClick={() => route.push("/user/book-mentor")}
            // onClick={() => handleItemClick("bookAmentor")}
            className={`${
              activeItem === "bookAmentor" ? "text-purple-700" : ""
            } flex sm:flex-row sm:justify-start sm:items-center  rounded-md sm:py-4 hover:bg-purple-700 hover:text-white hover:cursor-pointer`}
          >
            <div className="sm:mr-4 sm:pl-4 text-2xl">
              <FaUserGraduate />
            </div>
            <span className="text-lg font-medium hover:font-semibold">
              Book a Mentor
            </span>
          </div>
          {/*Your sessions  */}
          <div
            onClick={() => route.push("/user/sessions")}
            // onClick={() => handleItemClick("yourSessions")}
            className={`${
              activeItem === "yourSessions" ? "text-purple-700" : ""
            } flex sm:flex-row sm:justify-start sm:items-center  rounded-md sm:py-4 hover:bg-purple-700 hover:text-white hover:cursor-pointer`}
          >
            <div className="sm:mr-4 sm:pl-4 text-2xl">
              <LuUsers />
            </div>
            <span className="text-lg font-medium hover:font-semibold">
              Your sessions
            </span>
          </div>
          {/* Chats */}
          <div
            onClick={() => route.push("/user/chat")}
            // onClick={() => handleItemClick("chats")}
            className={`${
              activeItem === "chats" ? "text-purple-700" : ""
            } flex sm:flex-row sm:justify-start sm:items-center  rounded-md sm:py-4 hover:bg-purple-700 hover:text-white hover:cursor-pointer`}
          >
            <div className="sm:mr-4 sm:pl-4 text-2xl">
              <PiChatsFill />
            </div>
            <span className="text-lg font-medium hover:font-semibold">
              Chats
            </span>
          </div>
        </div>
      )}

      {userType === "SME" && (
        <div className="flex bg-white text-gray-400 sm:flex-col  sm:px-3 ">
          {/*Your sessions  */}
          <div
            onClick={() => {
              setMentorActiveItem("SMESessions");
              dispatch(changeOutlet("SMESessions"));
            }}
            className={`${
              mentorActiveItem === "SMESessions" ? "text-purple-700" : ""
            } flex sm:flex-row sm:justify-start sm:items-center  rounded-md sm:py-4 hover:bg-purple-700 hover:text-white hover:cursor-pointer`}
          >
            <div className="sm:mr-4 sm:pl-4 text-2xl">
              <LuUsers />
            </div>
            <span className="text-lg font-medium hover:font-semibold">
              Your sessions
            </span>
          </div>
          {/* Chats */}
          <div
            onClick={() => {
              setMentorActiveItem("SMEchats");
              dispatch(changeOutlet("SMEchats"));
            }}
            className={`${
              mentorActiveItem === "SMEchats" ? "text-purple-700" : ""
            } flex sm:flex-row sm:justify-start sm:items-center  rounded-md sm:py-4 hover:bg-purple-700 hover:text-white hover:cursor-pointer`}
          >
            <div className="sm:mr-4 sm:pl-4 text-2xl">
              <PiChatsFill />
            </div>
            <span className="text-lg font-medium hover:font-semibold">
              Chats
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
