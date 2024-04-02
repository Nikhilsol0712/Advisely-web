import React, { useEffect } from "react";
import ChatCard from "../ChatCard/ChatCard";
import { selectedChat } from "@/app/Actions/chatActions";
import { useDispatch } from "react-redux";

const AllChats = ({ sortedChats }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (sortedChats) {
      console.log("useEffect called=====");
      const selectedChatData = sortedChats[0];
      dispatch(selectedChat(selectedChatData));
    }
  }, [dispatch, sortedChats]);

  return (
    <div className="no-scrollbar  rounded mt-2 w-full  h-screen flex flex-col overflow-y-auto gap-2   p-1">
      {sortedChats.map((chatData, index) => (
        <ChatCard key={index} chatData={chatData} />
      ))}
    </div>
  );
};

export default AllChats;
