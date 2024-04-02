"use client";
import React, { useEffect } from "react";
import HelloUser from "@/app/components/HelloUser/HelloUser";
import MentorCard from "@/app/components/MentorCard/MentorCard";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import userServices from "@/app/services/userService";
import {
  getAllSmeRequest,
  getAllSmeSuccess,
  getUserByIdFailure,
} from "../../Actions/userActions";

const Page = () => {
  const { AllSme } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
    fetchAllSme();
  }, []);



  return (
    <div className="flex mt-14 bg-white w-full overflow-y-scroll flex-col">
      {/* hello user section */}
      <div className="flex items-start justify-start ">
        <HelloUser />
      </div>
      {/* hr line/horizontal line */}
      <div className="w-full flex justify-center items-center">
        <hr className="w-11/12  " />
      </div>

      {/* mentor recommedation section */}
      <div className=" sm:px-7 px-5 flex flex-col mt-2 py-3 text-black ">
        <span className="text-[1.1rem] font-medium">
          Mentor recommendations for you
        </span>
        <div className="flex flex-row no-scrollbar sm:mr-0 sm:mt-2 mt-2 overflow-x-auto">
          <div className=" w-auto gap-4 flex">
            {AllSme.map((smeData) => (
              <Link href={`/user/${smeData._id}`} key={smeData._id}>
                <div
                  onClick={(e) => {
                    e.preventDefault(); // Prevents navigation to the link URL
                    window.open(`/user/${smeData._id}`, "_blank"); // Opens link in a new tab
                  }}
                >
                  <MentorCard
                    profileImg={smeData.profilePic}
                    firstName={smeData.firstName}
                    lastName={smeData.lastName}
                    bio={smeData.bio}
                    reviews={smeData.reviews}
                    sessions={smeData.sessions}
                    smeData={smeData}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
