"use client";
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import Message from "../Message/Message";
import { SERVER, dynamicUI } from "../../utils/assets";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  fetchMessageRequest,
  fetchMessageSuccess,
  fetchMessageFailure,
} from "../../Actions/messageActions";
import sessionServices from "@/app/services/sessionService";
import messageServices from "../../services/messageService";
const moment = require("moment");
import Loader from "react-js-loader";

const SingleChat = ({ selectedChat }) => {
  const { messageHistory = [], loading } = useSelector(
    (state) => state.message || {}
  );

  // Define a ref for the scrollable container
  const chatContainerRef = useRef(null);

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [currentSession, setCurrentSession] = useState({});
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [shouldRun, setShouldrun] = useState(false);

  const [autoSessionExpired, setAutoSessionExpired] = useState(false);
  const [leaveChat, setLeaveChat] = useState(false);
  const combinedMessages = useMemo(() => {
    return [...messageHistory, ...messages];
  }, [messageHistory, messages]);

  const [chatStatus, setChatStatus] = useState({});
  const socket = io(SERVER);
  const loadCurrentSession = async (sessionId) => {
    try {
      const response = await sessionServices.getsessionById(sessionId);

      if (response.success === true) {
        setCurrentSession(response.result);
        // setIsLoading(false);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const loadAllMessages = async (chatId) => {
    try {
      dispatch(fetchMessageRequest());

      const response = await messageServices.getAllMessageByChatId(chatId);

      if (response.success === true) {
        dispatch(fetchMessageSuccess(response.result));
        // setIsLoading(false);
      }
    } catch (err) {
      // dispatch(fetchMessageFailure(err.message));
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat container whenever messages update
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [combinedMessages]);

  useEffect(() => {
    setMessages([]); //reseting messages avoid to see others chat messages,
    loadAllMessages(selectedChat?._id);
    loadCurrentSession(selectedChat?.session?._id);
    socket.emit("join-chat", selectedChat?._id);

    socket.on("receive-message", (message) => {
      if (message.sender != userInfo._id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    socket.on("user-left", (data) => {
      setLeaveChat(true);
    });

    return () => {
      socket.disconnect();
    };
  }, [loadAllMessages, selectedChat?.session?._id, socket, userInfo._id]);

  useEffect(() => {
    const checkSessionAndChatStatus = async () => {
      await loadCurrentSession(selectedChat?.session?._id);

      if (
        (currentSession.status === "completed" ||
          chatStatus[selectedChat?.session?._id] === "ended") &&
        shouldRun &&
        !currentSession.ratedByUsers.includes(userInfo._id)
      ) {
        setShouldrun(false);
        // navigation.navigate('RateYourExperience', {
        //   session: selectedChat.session,
        //   screenName: 'SingleChat',
        // });
      }
    };

    checkSessionAndChatStatus();
  }, [leaveChat, chatStatus, selectedChat?.session?._id]);

  const sendMessage = () => {
    if (
      messageText &&
      currentSession.status === "accepted"
      // &&
      // new Date(currentSession.start) < new Date() &&
      // new Date(currentSession.end) > new Date()
    ) {
      const data = {
        chatId: selectedChat?._id,
        text: messageText,
        sender: userInfo._id, // Replace with the current user's _id
      };

      socket.emit("send-message", data);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: messageText,
          sender: userInfo._id,
        },
      ]);
      setMessageText("");
    }
    // if (new Date(currentSession.end) < new Date()) {
    //   setAutoSessionExpired(true);
    //   endChatByUpdatingSession(currentSession._id, {
    //     status: 'completed',
    //   });
    // }
  };

  return (
    <div className="  w-full mt-2  flex flex-col h-screen border overflow-y-auto ">
      <div className=" flex flex-row px-2  bg-white border-b-2 rounded-b  w-full h-16">
        <div className="flex p-2 flex-row items-center gap-2">
          <img
            alt=""
            className="rounded-full h-10 w-10  "
            src={`${selectedChat?.sme?.profilePic}`}
          />
          <span>
            {selectedChat?.sme?.firstName} {selectedChat?.sme?.lastName}
          </span>
        </div>
      </div>
      {/* message display section */}
      <div
        ref={chatContainerRef}
        className="bg-white h-full  mt-1 overflow-y-auto "
      >
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader type="spinner-cub" bgColor={"#acadad"} size={50} />
          </div>
        ) : (
          <div className="flex flex-col  ">
            {combinedMessages.length > 0 ? (
              combinedMessages.map((message) => (
                <Message
                  key={message._id}
                  message={message}
                  flex={
                    message.sender !== userInfo._id
                      ? "flex-row ml-4"
                      : "flex-row-reverse"
                  }
                  bg={
                    message.sender !== userInfo._id
                      ? "bg-gray-200"
                      : "bg-green-50"
                  }
                />
              ))
            ) : (
              <p className="flex mt-10 h-full justify-center items-center align-center text-gray-500">
                No messages available !
              </p>
            )}

            {combinedMessages.map((message) => (
              <Message
                key={message._id}
                message={message}
                flex={
                  message.sender !== userInfo._id
                    ? "flex-row ml-4"
                    : "flex-row-reverse"
                }
                bg={
                  message.sender !== userInfo._id
                    ? "bg-gray-200"
                    : "bg-green-50"
                }
              />
            ))}

            {/* <Message flex={"flex-row"} bg={"bg-gray-50"} />
      <Message flex={"flex-row-reverse"} bg={"bg-green-50"} />
      <Message flex={"flex-row"} bg={"bg-gray-50"} />
      <Message flex={"flex-row-reverse"} bg={"bg-green-50"} />
      <Message flex={"flex-row"} bg={"bg-gray-50"} />
      <Message flex={"flex-row-reverse"} bg={"bg-green-50"} />
      <Message flex={"flex-row"} bg={"bg-gray-50"} />
      <Message flex={"flex-row"} bg={"bg-gray-50"} />
      <Message flex={"flex-row"} bg={"bg-gray-50"} /> */}
          </div>
        )}
      </div>

      {/* send message section */}
      <div className="border-t-2 rounded-t flex justify-evenly  mb-4 text-black w-full p-1 py-2">
        <input
          className="pl-4 text-sm w-5/6 border rounded h-8 "
          placeholder="Write your message here"
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
        />
        <button
          onClick={sendMessage}
          className="w-20 bg-purple-700 text-white rounded"
        >
          send
        </button>
      </div>
    </div>
  );
};

export default SingleChat;
