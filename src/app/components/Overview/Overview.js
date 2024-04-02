import React from "react";
import { GiTiedScroll } from "react-icons/gi";
import useWindowResize from "@/Hooks/useWindowResize";

const Overview = ({ userDetail }) => {
  const isMobile = useWindowResize();

  const completedSessions = userDetail?.sessions?.filter(
    (session) => (session.status = "completed")
  );

  const totalRatings = userDetail.reviews
    ? userDetail.reviews.reduce((sum, review) => sum + review.rating, 0)
    : 0;
  const averageRating = userDetail.reviews
    ? totalRatings / userDetail?.reviews.length
    : 0;

  return (
    <div className="bg-white flex flex-col  gap-4">
      <div className="bg-white flex flex-col gap-2  rounded-lg border  p-4">
        <div>
          <h1 className="text-black font-bold ml-8 mb-3">Overview</h1>
        </div>
        <div className="flex flex-row items-center">
          <span className="text-purple-700 mr-2 text-2xl">
            <GiTiedScroll />
          </span>
          <span style={{ color: "#718096" }} className="mr-2 font-semibold">
            Specialization:
          </span>
          <span className="text-black">
            {userDetail?.selectedSubcategories
              ? userDetail?.selectedSubcategories[0]?.name
              : "Not added"}
          </span>
        </div>
        {/* =========== */}
        <div className="flex flex-row items-center ml-8">
          <span style={{ color: "#718096" }} className="mr-2 font-semibold">
            Hourly rate:
          </span>
          <span className="text-black">{`₹${userDetail.hourlyRate}/hr`}</span>
        </div>
        {/* =========== */}
        <div className="flex flex-row items-center ml-8">
          <span style={{ color: "#718096" }} className="mr-2 font-semibold">
            Rating:
          </span>
          <span className="text-black"> {averageRating.toFixed(1)}</span>
        </div>
        {/* =========== */}
        {/* <div className="flex flex-row items-center ml-8">
          <span className="mr-2">Language:</span>
          <span>English</span>
        </div> */}
        {/* =========== */}
        <div className="flex flex-row items-center ml-8">
          <span style={{ color: "#718096" }} className="mr-2 font-semibold">
            Sessions:
          </span>
          <span className="text-black">
            {completedSessions ? completedSessions.length : 0}
          </span>
        </div>
      </div>

      {/* about section */}
      <div className="bg-white flex flex-col rounded-lg border  p-4">
        <h1 className="ml-8 text-black font-bold mb-3">About Me</h1>
        <p className="ml-8 text-black">{userDetail?.bio}</p>
        <div className="flex flex-row gap-4 text-black ml-8 mt-4">
          <span style={{ color: "#718096" }}>Fluent in:</span>
          <span>English</span>
        </div>
      </div>
      {isMobile && (
        <div className="bg-white flex flex-col rounded-lg  mt-2  p-4"></div>
      )}
    </div>
  );
};

export default Overview;
