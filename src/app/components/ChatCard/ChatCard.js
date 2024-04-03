import React from "react";
import { selectedChat } from "../../Actions/chatActions";
import { useDispatch, useSelector } from "react-redux";

const ChatCard = ({ chatData }) => {
  const dispatch = useDispatch();

  const handleClick = async () => {
    dispatch(selectedChat(chatData));
  };

  return (
    <div
      onClick={handleClick}
      className="flex w-full hover:cursor-pointer bg-white flex-row rounded-lg border shadow  justify-around"
    >
      <div className="py-2  ">
        <img
          alt=""
          className="w-12 h-12  rounded-full"
          src={`${chatData?.sme?.profilePic}`}
        />
      </div>
      <div className="flex  ml-1 flex-col justify-center">
        <span className="text-sm font-medium">
          {chatData?.sme?.firstName} {chatData?.sme?.lastName}
        </span>
        <span className="text-xs">
          {chatData.messages.length > 0
            ? chatData.messages[chatData.messages.length - 1].text
                .split(" ")
                .slice(0, 18)
                .join(" ") +
              (chatData.messages[chatData.messages.length - 1].text.split(" ")
                .length > 18
                ? "..."
                : "")
            : "No messages available"}
        </span>
      </div>
      <div className="px-1 ">
        <span className="text-[0.4rem]">5:30PM</span>
      </div>
    </div>
  );
};

export default ChatCard;

// {
//   "messages": [],
//   "_id": "65fd744780c68ee45980c468",
//   "customer": {
//       "workingHours": {
//           "Monday": [],
//           "Tuesday": [],
//           "Wednesday": [],
//           "Thursday": [],
//           "Friday": [],
//           "Saturday": [],
//           "Sunday": []
//       },
//       "_id": "65f184a5b1d91a04ffecc201",
//       "firstName": "nikhil",
//       "lastName": "solanki",
//       "email": "nikhil1212@gmail.com",
//       "password": "$2a$11$JuON/kczb6g9sd1A8lRjH.oMZp3yMYmA.Mj3X7My2M0/Frsus3k92",
//       "profilePic": "default_image.jpg",
//       "identity": null,
//       "userType": "customer",
//       "dateOfBirth": "2024-03-17T18:30:00.000Z",
//       "registrationSource": "email",
//       "phoneNumber": "8637367333",
//       "zipcode": "356636",
//       "selectedCategory": [],
//       "selectedSubcategories": [],
//       "packages": [],
//       "paymentHistory": [],
//       "bankDetails": [],
//       "balance": 0,
//       "reviews": [],
//       "sessions": [],
//       "smeStatus": "pending",
//       "userStatus": "approved",
//       "createdAt": "2024-03-13T10:49:09.884Z",
//       "updatedAt": "2024-03-13T10:49:09.885Z",
//       "__v": 0,
//       "otp": 454545
//   },
//   "sme": {
//       "workingHours": {
//           "Monday": [
//               {
//                   "start": "08:00 AM",
//                   "end": "05:00 PM"
//               }
//           ],
//           "Tuesday": [
//               {
//                   "start": "08:00 AM",
//                   "end": "05:00 PM"
//               }
//           ],
//           "Wednesday": [],
//           "Thursday": [],
//           "Friday": [
//               {
//                   "start": "08:00 AM",
//                   "end": "05:00 PM"
//               }
//           ],
//           "Saturday": [],
//           "Sunday": [
//               {
//                   "start": "08:00 AM",
//                   "end": "05:00 PM"
//               }
//           ]
//       },
//       "packages": [],
//       "_id": "65685304307c9cd23431e687",
//       "firstName": "Vari",
//       "lastName": "Soni",
//       "email": "vari@gmail.com",
//       "password": "$2a$11$bCJ/QdEPR6ArP4I9o.GeSenqe2.9Y./da6oGtdHwl.Le70IiFYlOC",
//       "profilePic": "https://advisely.blr1.digitaloceanspaces.com/1702881726469-803504393-indian-woman-standing-office-with-her-arms-crossed_893012-48076.jpg",
//       "identity": "https://advisely.blr1.digitaloceanspaces.com/1702696856344-312475946-IMG-20231213-WA0007.jpg",
//       "userType": "SME",
//       "dateOfBirth": "Thu Nov 30 2000 14:42:00 GMT+0530 (IST)",
//       "registrationSource": "email",
//       "phoneNumber": "+919388160227",
//       "zipcode": "454775",
//       "linkedinProfile": "https://www.linkedin.com/in/nikhil-solanki-9662ba254",
//       "bio": "Empowering students on their educational journey, our education and touring experts offer personalized support in subjects ranging from STEM to humanities.",
//       "selectedCategory": [
//           "65684d0d307c9cd23431e631"
//       ],
//       "selectedSubcategories": [
//           "65684e6a307c9cd23431e657"
//       ],
//       "hourlyRate": 6,
//       "paymentHistory": [
//           {
//               "amount": 97.2,
//               "transactionType": "credit",
//               "closingBalance": 97.2,
//               "date": "2023-12-04T06:11:26.055Z"
//           },
//           {
//               "amount": 54,
//               "transactionType": "credit",
//               "closingBalance": 151.2,
//               "date": "2023-12-13T05:08:15.068Z"
//           },
//           {
//               "amount": 54,
//               "transactionType": "credit",
//               "closingBalance": 205.2,
//               "date": "2023-12-13T05:08:17.606Z"
//           },
//           {
//               "amount": "100",
//               "transactionType": "debit",
//               "closingBalance": 105.19999999999999,
//               "date": "2023-12-13T05:20:08.500Z"
//           },
//           {
//               "amount": 54,
//               "transactionType": "credit",
//               "closingBalance": 159.2,
//               "date": "2023-12-13T05:32:14.132Z"
//           },
//           {
//               "amount": "50",
//               "transactionType": "debit",
//               "closingBalance": 109.19999999999999,
//               "date": "2023-12-13T06:54:21.842Z"
//           },
//           {
//               "amount": "100",
//               "transactionType": "debit",
//               "closingBalance": 9.199999999999989,
//               "date": "2023-12-13T07:13:09.657Z"
//           },
//           {
//               "amount": "50",
//               "transactionType": "debit",
//               "closingBalance": 300,
//               "date": "2023-12-13T07:36:57.114Z"
//           },
//           {
//               "amount": "100",
//               "transactionType": "debit",
//               "closingBalance": 200,
//               "date": "2023-12-13T07:48:58.477Z"
//           },
//           {
//               "amount": 0.9,
//               "transactionType": "credit",
//               "closingBalance": 200.9,
//               "date": "2023-12-26T09:29:48.783Z"
//           },
//           {
//               "amount": 0.9,
//               "transactionType": "credit",
//               "closingBalance": 201.8,
//               "date": "2023-12-26T09:29:49.932Z"
//           },
//           {
//               "amount": 0.9,
//               "transactionType": "credit",
//               "closingBalance": 202.70000000000002,
//               "date": "2023-12-26T10:21:24.315Z"
//           },
//           {
//               "amount": 0.9,
//               "transactionType": "credit",
//               "closingBalance": 203.60000000000002,
//               "date": "2023-12-26T11:55:11.735Z"
//           },
//           {
//               "amount": 0.9,
//               "transactionType": "credit",
//               "closingBalance": 204.50000000000003,
//               "date": "2023-12-26T12:03:17.814Z"
//           },
//           {
//               "amount": 0.9,
//               "transactionType": "credit",
//               "closingBalance": 205.40000000000003,
//               "date": "2023-12-26T12:17:04.916Z"
//           },
//           {
//               "amount": 0.9,
//               "transactionType": "credit",
//               "closingBalance": 206.30000000000004,
//               "date": "2023-12-26T12:23:09.368Z"
//           },
//           {
//               "amount": 0.9,
//               "transactionType": "credit",
//               "closingBalance": 207.20000000000005,
//               "date": "2023-12-26T12:23:34.698Z"
//           },
//           {
//               "amount": 0.9,
//               "transactionType": "credit",
//               "closingBalance": 208.10000000000005,
//               "date": "2023-12-26T12:45:47.810Z"
//           },
//           {
//               "amount": 0.9,
//               "transactionType": "credit",
//               "closingBalance": 209.00000000000006,
//               "date": "2023-12-26T12:57:11.074Z"
//           },
//           {
//               "amount": 0.9,
//               "transactionType": "credit",
//               "closingBalance": 209.90000000000006,
//               "date": "2023-12-27T04:49:05.153Z"
//           },
//           {
//               "amount": "400",
//               "transactionType": "debit",
//               "closingBalance": 400,
//               "date": "2023-12-28T03:34:30.949Z"
//           },
//           {
//               "amount": 0.9,
//               "transactionType": "credit",
//               "closingBalance": 400.9,
//               "date": "2023-12-29T05:20:55.366Z"
//           },
//           {
//               "amount": 0.9,
//               "transactionType": "credit",
//               "closingBalance": 401.79999999999995,
//               "date": "2023-12-29T06:37:46.430Z"
//           },
//           {
//               "amount": 0.9,
//               "transactionType": "credit",
//               "closingBalance": 402.69999999999993,
//               "date": "2024-01-01T09:56:27.684Z"
//           }
//       ],
//       "bankDetails": [
//           "65793ed5cf0629b002dd0379",
//           "6579e1fd00845785efbe347e",
//           "65802053eb792ab59c49694f",
//           "6580221ceb792ab59c496a47",
//           "6580248beb792ab59c496a78",
//           "6580250deb792ab59c496aad",
//           "6580260aeb792ab59c496ab6",
//           "65802709eb792ab59c496ae3",
//           "658a9f1b80d77d5f0e424285"
//       ],
//       "balance": 402.69999999999993,
//       "reviews": [
//           "656dcd98b98a1f226fcac9a1",
//           "656eaea4717d4188e96a39a7",
//           "656eaeb8717d4188e96a39a8",
//           "65793c53cf0629b002dd0301",
//           "657941eccf0629b002dd0402",
//           "65828d944cacc3e743725c7b",
//           "658292f94cacc3e743725cc1",
//           "658acb1a16c46f9fddd9a824",
//           "658bdfb31d39958c50ee1a22",
//           "65928f6f02a029a5183a1c0a"
//       ],
//       "sessions": [
//           "658abd0172fb0a4325ee05e3",
//           "658abd0172fb0a4325ee05e3",
//           "658abd0172fb0a4325ee05e3",
//           "658abd0172fb0a4325ee05e3",
//           "658abd0172fb0a4325ee05e3",
//           "658abd0172fb0a4325ee05e3",
//           "658abd0172fb0a4325ee05e3",
//           "658e4e568aeda0457f57e7d5",
//           "658e4e568aeda0457f57e7d5",
//           "659288a402a029a5183a1a41"
//       ],
//       "smeStatus": "approved",
//       "userStatus": "approved",
//       "createdAt": "2023-11-30T09:16:52.386Z",
//       "updatedAt": "2023-11-30T09:16:52.386Z",
//       "__v": 0,
//       "otp": 167418
//   },
//   "session": {
//       "_id": "65fc0d629a86cda0e796281b",
//       "customer": "65f184a5b1d91a04ffecc201",
//       "sme": "65685304307c9cd23431e687",
//       "title": "\"What are the most effective strategies for preparing comprehensively for exams? Could you provide insights into optimizing study methods and time management for exam success? How can I develop a structured study plan that covers all necessary topics while maximizing retention? Are there specific resources or tools you recommend for efficient exam preparation? Additionally, how do I maintain focus and motivation throughout the study process? Can you offer advice on overcoming exam-related stress and anxiety? Lastly, what techniques or approaches can I employ to simulate exam conditions and enhance performance during actual tests?",
//       "razorpay_payment_id": "pay_NoyS4847tRwRNB",
//       "amount": 1,
//       "start": "2024-03-22T20:39:00.000Z",
//       "end": "2024-03-22T20:49:00.000Z",
//       "reviews": [],
//       "ratedByUsers": [],
//       "subCategory": "65684e6a307c9cd23431e657",
//       "status": "confirmed",
//       "createdAt": "2024-03-21T10:35:14.568Z",
//       "__v": 0
//   },
//   "createdAt": "2024-03-22T09:50:30.145Z",
//   "updatedAt": "2024-03-22T09:50:30.145Z"
// }
