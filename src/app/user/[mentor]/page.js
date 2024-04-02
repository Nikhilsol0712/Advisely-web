"use client";
import React, { useEffect, useId } from "react";
import Overview from "@/app/components/Overview/Overview";
import SmeDetailProfileCard from "@/app/components/SmeDetailProfileCard/SmeDetailProfileCard";
import useWindowResize from "@/Hooks/useWindowResize";
import userServices from "../../services/userService";
import {
  getUserByIdReuest,
  getUserByIdSuccess,
  getUserByIdFailure,
} from "../../Actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Mentor = ({ params }) => {
  const { outletName } = useSelector((state) => state.outlet);
  const isMobile = useWindowResize();
  const { userDetail } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const fetchUserDetailById = async (userId) => {
    try {
      dispatch(getUserByIdReuest());
      const response = await userServices.getUserById(userId);
      // console.log("Response  from mentor page===", response);
      if (response.success === true) {
        dispatch(getUserByIdSuccess(response.result));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (params && params.mentor) {
      fetchUserDetailById(params.mentor);
    }
  }, [params]);

  return (
    <div
      className={` ${
        isMobile ? "flex-col-reverse w-full" : "flex-row"
      } bg-white  flex mt-4 bg-red-200 w-full`}
    >
      {/* overview component that contains SME information */}
      <div className={` ${isMobile ? "w-full" : " w-4/6"}  p-4 mt-14 `}>
        <Overview userDetail={userDetail} />
      </div>
      <div className={`${isMobile ? "w-full" : "w-2/6"}  p-4 p-4 mt-14 `}>
        <SmeDetailProfileCard userDetail={userDetail} />
      </div>
    </div>
  );
};

export default Mentor;
