"use client";
import React, { useEffect } from "react";
import AllChats from "@/app/components/Allchats/AllChats";
import SingleChat from "@/app/components/SingleChat/SingleChat";
import { useSelector, useDispatch } from "react-redux";
import chatServices from "@/app/services/chatService";
import {
  fetchMyChatRequest,
  fetchMyChatSuccess,
  fetchMyChatFailure,
} from "../../Actions/chatActions";

const Page = () => {
  const { chats } = useSelector((state) => state.chat);
  const { selectedChat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const sortedChats = chats.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

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

  useEffect(() => {
    loadAllMyChats();
  }, []);

  return (
    <div className="flex mb-4  mt-14 w-full justify-between text-black  flex-row">
      <div className="p-4 h-screen  w-2/6">
        <span className="font-semibold text-2xl text-black ">Your Chats:</span>
        <AllChats sortedChats={sortedChats} />
      </div>
      <div className=" w-4/6 p-4 h-screen ">
        <span className="font-semibold text-2xl text-black">
          Chat messages:
        </span>
        <SingleChat selectedChat={selectedChat} />
      </div>
    </div>
  );
};

export default Page;
