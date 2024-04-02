"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SessionCard } from "@/app/components/SessionCard/SessionCard";
import sessionServices from "@/app/services/sessionService";
import {
  fetchSessionRequest,
  fetchSessionSuccess,
  fetchSessionFailure,
  updateSessionRequest,
  updateSessionSuccess,
  updateSessionFailure,
} from "../../Actions/sessionActions";

const Page = () => {
  const { sessions, sessionUpated } = useSelector((state) => state.session);
  const dispatch = useDispatch();
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

  const loadMySessions = async () => {
    // dispatch(fetchSessionRequest());
    try {
      const response = await sessionServices.fetchMySessions();
      if (response.success === true) {
        dispatch(fetchSessionSuccess(response.result));
      }
    } catch (err) {
      // dispatch(fetchSessionFailure(err.message));
    }
  };

  useEffect(() => {
    loadMySessions();
  }, [sessionUpated]);

  return (
    <div className="flex mt-16 flex-col">
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
              <p className="text-gray-400">No session history available</p>
            )}
          </div>
        </div>
      </div>
      {/* completed sessions */}
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
              <p className="text-gray-400">No session history available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
