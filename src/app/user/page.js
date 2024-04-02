"use client";
// User.jsx
import React from "react";

import Link from "next/link";
import CategorySection from "../components/CategorySection/CategorySection";
import Sidebar from "../components/Sidebar/Sidebar";
import "./user.css";
import useWindowResize from "@/Hooks/useWindowResize";
import HelloUser from "../components/HelloUser/HelloUser";
import MentorCard from "../components/MentorCard/MentorCard";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/SearchBar/SearchBar";
import SubCategoriesList from "../components/SubCategoriesList/SubCategoriesList";
import {
  fetchAllSubCategoriesRequest,
  fetchAllSubCategoriesSuccess,
  fetchAllSubCategoriesFailure,
} from "../Actions/subCategoryActions";
import {
  setSelectedSME,
  fetchAllMatchingSMERequest,
  fetchAllMatchingSMESuccess,
  fetchAllMatchingSMEFailure,
  getAllSmeRequest,
  getAllSmeSuccess,
  getUserByIdFailure,
} from "../Actions/userActions";
import {
  fetchMyChatRequest,
  fetchMyChatSuccess,
  fetchMyChatFailure,
} from "../Actions/chatActions";
import {
  fetchSessionRequest,
  fetchSessionSuccess,
  fetchSessionFailure,
} from "../Actions/sessionActions";
import {
  fetchMessageRequest,
  fetchMessageSuccess,
  fetchMessageFailure,
} from "../Actions/messageActions";
import subCategoryServices from "../services/subCategoryService";
import { useEffect } from "react";
import userServices from "../services/userService";
import { SessionCard } from "../components/SessionCard/SessionCard";
import chatServices from "../services/chatService";
import AllChats from "../components/Allchats/AllChats";
import SingleChat from "../components/SingleChat/SingleChat";
import sessionServices from "../services/sessionService";
import messageServices from "../services/messageService";

const User = () => {
  const isMobile = useWindowResize();
  const { outletName } = useSelector((state) => state.outlet);
  const { selectedSubCategory } = useSelector((state) => state.subCategory);
  const { allMathcingSME } = useSelector((state) => state.user);
  const { chats } = useSelector((state) => state.chat);
  const { sessions } = useSelector((state) => state.session);
  const { selectedChat } = useSelector((state) => state.chat);
  const { AllSme } = useSelector((state) => state.user);

  console.log(
    "token from userpage====",
    localStorage.getItem("x-access-token")
  );

  const sortedChats = chats.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const upcomingSessions = Array.isArray(sessions)
    ? sessions
        .filter(
          (session) =>
            session.status === "confirmed" || session.status === "accepted"
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Keep it in descending order for newer sessions
    : [];

  const sessionHistory = Array.isArray(sessions)
    ? sessions
        .filter(
          (session) =>
            session.status === "completed" ||
            session.status === "rejected" ||
            session.status === "cancelled" ||
            session.status === "expired"
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  const dispatch = useDispatch();

  const fetchAllSubCategories = async () => {
    try {
      dispatch(fetchAllSubCategoriesRequest());
      const response = await subCategoryServices.getAllsubCategories();
      if (response.success === true) {
        dispatch(fetchAllSubCategoriesSuccess(response.result));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllSmeBySubCatId = async () => {
    try {
      dispatch(fetchAllMatchingSMERequest());
      if (selectedSubCategory !== null) {
        const response = await userServices.findSmeBySubCatID(
          selectedSubCategory
        );
        if (response.success === true) {
          dispatch(fetchAllMatchingSMESuccess(response.result));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadAllMyChats = async () => {
    dispatch(fetchMyChatRequest());
    try {
      const response = await chatServices.getAllMyChats();
      if (response.success === true) {
        dispatch(fetchMyChatSuccess(response.result));
      }
    } catch (err) {
      dispatch(fetchMyChatFailure(err.mesage));
    }
  };

  const loadMySessions = async () => {
    dispatch(fetchSessionRequest());
    try {
      const response = await sessionServices.fetchMySessions();
      if (response.success === true) {
        dispatch(fetchSessionSuccess(response.result));
      }
    } catch (err) {
      dispatch(fetchSessionFailure(err.message));
    }
  };

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

  const loadAllMessages = async (chatId) => {
    try {
      dispatch(fetchMessageRequest());

      const response = await messageServices.getAllMessageByChatId(chatId);
      if (response.success === true) {
        dispatch(fetchMessageSuccess(response.result));
        setIsLoading(false);
      }
    } catch (err) {
      // dispatch(fetchMessageFailure(err.message));
    }
  };

  // useEffect(() => {
  //   loadAllMessages(selectedChat._id);
  // }, [selectedChat._id]);

  // useEffect(() => {
  //   fetchAllSubCategories();
  //   loadAllMyChats();
  //   loadMySessions();
  //   fetchAllSme();
  // }, []);

  // useEffect(() => {
  //   fetchAllSmeBySubCatId();
  // }, [selectedSubCategory]);

  return (
    <section className="flex  mt-16 bg-red-200 sm:h-screen text-black flex-row  ">
      {/* sidebar section */}
      {/* {!isMobile && (
        <div className="bg-green-300 sticky">
          <Sidebar />
        </div>
      )} */}
      {/* outlet section  */}
      <div className=" flex flex-col bg-white w-full overflow-y-scroll sm:w-full ">
        {/* Home outlet items 1 */}

        {/* {outletName === "Home" && (
          <div className="flex bg-white w-full overflow-y-scroll flex-col">
            hello user section
            <div className="flex items-start justify-start ">
              <HelloUser />
            </div>
            hr line/horizontal line
            <div className="w-full flex justify-center items-center">
              <hr className="w-11/12  " />
            </div>

            mentor recommedation section
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
        )} */}

        {/* bookAmentor outlet items 2 */}
        {/* {outletName === "bookAmentor" && (
          <div className="flex  flex-col">
            <div className="w-full mt-2 flex items-center justify-center">
              <SearchBar />
            </div>
            <div className="w-full  mt-1">
              <SubCategoriesList />
              <hr />
            </div>
            <div className=" p-2  overflow-y-auto no-scrollbar max-h-screen sm:max-h-screen ">
              <div className="flex flex-wrap mb-56 sm:mb-56 gap-10 items-center justify-center">
                {allMathcingSME.map((smeData) => (
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
        )} */}

        {/* yourSessions outlet items 3 */}
        {/* {outletName === "yourSessions" && (
          <div className="flex  flex-col">
            upcoming sessions
            <div className="flex  flex-col">
              <span className="font-semibold text-2xl text-black pt-4 pl-4">
                Your upcoming sessions:
              </span>
              <div className="overflow-x-auto no-scrollbar p-4">
                <div className="w-auto flex flex-row gap-3">
                  {upcomingSessions.length > 0 ? (
                    upcomingSessions.map((sessionData, index) => (
                      <SessionCard key={index} session={sessionData} />
                    ))
                  ) : (
                    <p className="text-gray-400">
                      No session history available
                    </p>
                  )}
                </div>
              </div>
            </div>
            completed sessions
            <div className="flex  flex-col">
              <span className="font-semibold text-2xl text-black  pl-4">
                Sessions History:
              </span>
              <div className="overflow-x-auto no-scrollbar p-4">
                <div className="w-auto flex flex-row gap-3">
                  {sessionHistory.length > 0 ? (
                    sessionHistory.map((sessionData, index) => (
                      <SessionCard key={index} session={sessionData} />
                    ))
                  ) : (
                    <p className="text-gray-400">
                      No session history available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )} */}

        {/* chats outlet items 4 */}
        {/* {outletName === "chats" && (
          <div className="flex mb-4 w-full justify-between text-black  flex-row">
            <div className="p-4 h-screen  w-2/6">
              <span className="font-semibold text-2xl text-black ">
                Your Chats:
              </span>
              <AllChats sortedChats={sortedChats} />
            </div>
            <div className=" w-4/6 p-4 h-screen ">
              <span className="font-semibold text-2xl text-black">
                Chat messages:
              </span>
              <SingleChat selectedChat={selectedChat} />
            </div>
          </div>
        )} */}
        {/* outlet section end here */}
      </div>

      {/* <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="w-full h-12 max-h-12 px-1 py-1 text-white flex items-center justify-center hover:animate-background bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-lg transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
          <p className="text-sm font-medium">
            Book sessions with favorite advisors across diverse categories
            easily!
          </p>
        </div>
        <div className="flex mt-3 h-28 overflow-y-scroll ">
          <CategorySection />
        </div>
        <div className="h-full">
          <SmeCards></SmeCards>
        </div>
      </div> */}
    </section>
  );
};

export default User;
