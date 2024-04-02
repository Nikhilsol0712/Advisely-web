"use client";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  console.log("userInfo====", userInfo);
  return (
    <div className="flex w-full   mt-14 flex-col ">
      {/* upper section */}
      <div className="bg-purple-50 flex flex-row justify-between p-4 h-48">
        <div className="flex flex-row">
          <div className=" h-full border shadow bg-cover bg-center  rounded-lg  w-36 bg-[url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"></div>
          <div className="flex flex-col  justify-end ml-4 ">
            <span className="text-xl uppercase font-bold text-purple-500">
              {userInfo?.firstName} {userInfo?.lastName}
            </span>
            <span className=" text-sm text-black">{userInfo?.email}</span>
          </div>
        </div>
        <div className="flex items-end justify-center gap-4 flex-row">
          <div className="flex bg-white  rounded  w-32  p-4 justify-end items-center flex-col">
            <span className="text-2xl font-extrabold text-purple-600">5</span>
            <span className="text-md font-semibold text-black ">sessions</span>
          </div>
          <div className="flex   p-4 bg-white rounded w-32  justify-end items-center flex-col">
            <span className="text-2xl font-extrabold text-purple-600">4.5</span>
            <span className="text-md font-semibold text-black ">rating</span>
          </div>
        </div>
      </div>
      <div className=" bg-white flex justify-center w-full">
        <div className="p-3 w-full bg-white shadow-md text-black rounded-lg"></div>
      </div>

      {/* lower section */}
      <div className=" bg-white mt-2 flex justify-center w-full">
        <form className="p-3 w-full bg-white text-black rounded-lg">



        </form>
      </div>
    </div>
  );
};

export default page;
