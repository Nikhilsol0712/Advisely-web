"use cient";
import React from "react";

const HelloUser = () => {
  return (
    <div className=" flex sm:h-28 justify-center px-5  py-2 sm:py-0 sm:px-7 flex-col sm:flex-col ">
      <span className="text-3xl font-medium text-black">Hello, Nikhil 👋</span>
      <span className="text-lg text-black">
        You have
        <a className="hover:cursor-pointer ml-1 sm:ml-1 underline text-purple-700 font-semibold">
          0 Upcoming sessions
        </a>
      </span>
    </div>
  );
};

export default HelloUser;
