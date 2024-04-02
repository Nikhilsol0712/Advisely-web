"use client";
// Mentors.jsx
import React from "react";

import Link from "next/link";
import CategorySection from "../components/CategorySection/CategorySection";
import Sidebar from "../components/Sidebar/Sidebar";
import "./mentors.css";
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
  selectedChat,
} from "../Actions/chatActions";
import {
  fetchSessionRequest,
  fetchSessionSuccess,
  fetchSessionFailure,
} from "../Actions/sessionActions";
import subCategoryServices from "../services/subCategoryService";
import { useEffect } from "react";
import userServices from "../services/userService";
import { SessionCard } from "../components/SessionCard/SessionCard";
import chatServices from "../services/chatService";
import AllChats from "../components/Allchats/AllChats";
import SingleChat from "../components/SingleChat/SingleChat";
import sessionServices from "../services/sessionService";

const page = () => {
  const isMobile = useWindowResize();
  const { outletName } = useSelector((state) => state.outlet);
  const { selectedSubCategory } = useSelector((state) => state.subCategory);
  const { allMathcingSME } = useSelector((state) => state.user);
  const { chats } = useSelector((state) => state.chat);
  const { sessions, sessionUpated } = useSelector((state) => state.session);
  const { selectedChat } = useSelector((state) => state.chat);
  const { AllSme } = useSelector((state) => state.user);

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

  useEffect(() => {
    loadMySessions();
  }, [sessionUpated]);

  useEffect(() => {
    fetchAllSubCategories();
    loadAllMyChats();

    fetchAllSme();
  }, []);

  useEffect(() => {
    fetchAllSmeBySubCatId();
  }, [selectedSubCategory]);

  return (
    <section className="sm:h-screen flex bg-white flex-row text-black">
      <div className=" flex flex-col bg-white w-full overflow-y-scroll sm:w-full ">
        {/* yourSessions outlet items 3 */}
        {outletName === "SMESessions" && (
          <div className="flex mt-16  flex-col">
            {/* upcoming sessions */}
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
            {/* completed sessions */}
            <div className="flex   flex-col">
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
        )}

        {outletName === "SMEchats" && (
          <div className="flex mt-16 mb-4 w-full justify-between text-black  flex-row">
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
        )}
      </div>
    </section>
  );
};

export default page;
