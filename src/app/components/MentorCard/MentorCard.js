"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { setSelectedSME } from "../../Actions/userActions";

const MentorCard = ({
  profileImg,
  firstName,
  lastName,
  bio,
  reviews,
  sessions,
  smeData,
}) => {
  const { allMathcingSME } = useSelector((state) => state.user);
  // console.log("allMathcingSME from card===", allMathcingSME);
  const dispatch = useDispatch();
  // console.log("reviews===", reviews);
  const totalRatings = reviews
    ? reviews.reduce((sum, review) => sum + review.rating, 0)
    : 0;
  const averageRating = reviews ? totalRatings / reviews.length : 0;

  // console.log("sessions====", sessions);

  const completedSessions = sessions?.filter(
    (session) => (session.status = "completed")
  );

  const handleClick = () => {
    // console.log("SelectedSme===", smeData);
    // dispatch(setSelectedSME(smeData));

    // Construct URL with smeData
    const queryString = new URLSearchParams(smeData).toString();
    const newUrl = `${window.location.origin}/somepath?${queryString}`;

    // Open URL in new tab
    window.open(newUrl, "_blank");

    // Save the URL in state for future use if needed
    // setUrl(newUrl);
  };

  return (
    <div
      // onClick={handleClick}
      style={{
        backgroundImage: `url('${profileImg}')`,
      }}
      className="relative hover:cursor-pointer inset-0 bg-cover bg-center flex justify-end items-end sm:w-64 w-64  sm:m-w-64 sm:h-80 h-80 rounded-lg "
    >
      {/* <div className="absolute bottom-0 flex flex-col left-0 right-0 p-4 bg-gradient-to-b from-transparent via-gray-500 to-gray-900 bg-opacity-40 rounded-b-lg"> */}
      <div className="absolute text-white bottom-0 flex flex-col left-0 right-0 p-2 gap-1 bg-gradient-to-b from-transparent via-black-00 to-black bg-opacity-40 rounded-b-lg">
        <span className="font-bold flex flex-row items-center">
          <span className="mr-1">
            <FaStar />
          </span>
          {averageRating.toFixed(1)}
        </span>
        <span className="font-medium">
          {firstName} {lastName}
        </span>

        <span className="text-sm">
          Sessions | {completedSessions ? completedSessions.length : 0}
        </span>

        <span className="flex text-sm flex-row items-center">
          <span className="mr-1">
            <FaBook />
          </span>
          {bio && bio.length > 28 ? bio.substring(0, 28) + "..." : bio}
        </span>
      </div>
    </div>
  );
};

export default MentorCard;

//   {
//     "workingHours": {
//         "Monday": [
//             {
//                 "start": "08:00 AM",
//                 "end": "05:00 PM"
//             }
//         ],
//         "Tuesday": [
//             {
//                 "start": "08:00 AM",
//                 "end": "05:00 PM"
//             }
//         ],
//         "Wednesday": [],
//         "Thursday": [],
//         "Friday": [
//             {
//                 "start": "08:00 AM",
//                 "end": "05:00 PM"
//             }
//         ],
//         "Saturday": [],
//         "Sunday": [
//             {
//                 "start": "08:00 AM",
//                 "end": "05:00 PM"
//             }
//         ]
//     },
//     "packages": [],
//     "_id": "65685304307c9cd23431e687",
//     "firstName": "Vari",
//     "lastName": "Soni",
//     "email": "vari@gmail.com",
//     "password": "$2a$11$bCJ/QdEPR6ArP4I9o.GeSenqe2.9Y./da6oGtdHwl.Le70IiFYlOC",
//     "profilePic": "https://advisely.blr1.digitaloceanspaces.com/1702881726469-803504393-indian-woman-standing-office-with-her-arms-crossed_893012-48076.jpg",
//     "identity": "https://advisely.blr1.digitaloceanspaces.com/1702696856344-312475946-IMG-20231213-WA0007.jpg",
//     "userType": "SME",
//     "dateOfBirth": "Thu Nov 30 2000 14:42:00 GMT+0530 (IST)",
//     "registrationSource": "email",
//     "phoneNumber": "+919388160227",
//     "zipcode": "454775",
//     "linkedinProfile": "https://www.linkedin.com/in/nikhil-solanki-9662ba254",
//     "bio": "Empowering students on their educational journey, our education and touring experts offer personalized support in subjects ranging from STEM to humanities.",
//     "selectedCategory": [
//         "65684d0d307c9cd23431e631"
//     ],
//     "selectedSubcategories": [
//         "65684e6a307c9cd23431e657"
//     ],
//     "hourlyRate": 1,
//     "paymentHistory": [
//         {
//             "amount": 97.2,
//             "transactionType": "credit",
//             "closingBalance": 97.2,
//             "date": "2023-12-04T06:11:26.055Z"
//         },
//         {
//             "amount": 54,
//             "transactionType": "credit",
//             "closingBalance": 151.2,
//             "date": "2023-12-13T05:08:15.068Z"
//         },
//         {
//             "amount": 54,
//             "transactionType": "credit",
//             "closingBalance": 205.2,
//             "date": "2023-12-13T05:08:17.606Z"
//         },
//         {
//             "amount": "100",
//             "transactionType": "debit",
//             "closingBalance": 105.19999999999999,
//             "date": "2023-12-13T05:20:08.500Z"
//         },
//         {
//             "amount": 54,
//             "transactionType": "credit",
//             "closingBalance": 159.2,
//             "date": "2023-12-13T05:32:14.132Z"
//         },
//         {
//             "amount": "50",
//             "transactionType": "debit",
//             "closingBalance": 109.19999999999999,
//             "date": "2023-12-13T06:54:21.842Z"
//         },
//         {
//             "amount": "100",
//             "transactionType": "debit",
//             "closingBalance": 9.199999999999989,
//             "date": "2023-12-13T07:13:09.657Z"
//         },
//         {
//             "amount": "50",
//             "transactionType": "debit",
//             "closingBalance": 300,
//             "date": "2023-12-13T07:36:57.114Z"
//         },
//         {
//             "amount": "100",
//             "transactionType": "debit",
//             "closingBalance": 200,
//             "date": "2023-12-13T07:48:58.477Z"
//         },
//         {
//             "amount": 0.9,
//             "transactionType": "credit",
//             "closingBalance": 200.9,
//             "date": "2023-12-26T09:29:48.783Z"
//         },
//         {
//             "amount": 0.9,
//             "transactionType": "credit",
//             "closingBalance": 201.8,
//             "date": "2023-12-26T09:29:49.932Z"
//         },
//         {
//             "amount": 0.9,
//             "transactionType": "credit",
//             "closingBalance": 202.70000000000002,
//             "date": "2023-12-26T10:21:24.315Z"
//         },
//         {
//             "amount": 0.9,
//             "transactionType": "credit",
//             "closingBalance": 203.60000000000002,
//             "date": "2023-12-26T11:55:11.735Z"
//         },
//         {
//             "amount": 0.9,
//             "transactionType": "credit",
//             "closingBalance": 204.50000000000003,
//             "date": "2023-12-26T12:03:17.814Z"
//         },
//         {
//             "amount": 0.9,
//             "transactionType": "credit",
//             "closingBalance": 205.40000000000003,
//             "date": "2023-12-26T12:17:04.916Z"
//         },
//         {
//             "amount": 0.9,
//             "transactionType": "credit",
//             "closingBalance": 206.30000000000004,
//             "date": "2023-12-26T12:23:09.368Z"
//         },
//         {
//             "amount": 0.9,
//             "transactionType": "credit",
//             "closingBalance": 207.20000000000005,
//             "date": "2023-12-26T12:23:34.698Z"
//         },
//         {
//             "amount": 0.9,
//             "transactionType": "credit",
//             "closingBalance": 208.10000000000005,
//             "date": "2023-12-26T12:45:47.810Z"
//         },
//         {
//             "amount": 0.9,
//             "transactionType": "credit",
//             "closingBalance": 209.00000000000006,
//             "date": "2023-12-26T12:57:11.074Z"
//         },
//         {
//             "amount": 0.9,
//             "transactionType": "credit",
//             "closingBalance": 209.90000000000006,
//             "date": "2023-12-27T04:49:05.153Z"
//         },
//         {
//             "amount": "400",
//             "transactionType": "debit",
//             "closingBalance": 400,
//             "date": "2023-12-28T03:34:30.949Z"
//         },
//         {
//             "amount": 0.9,
//             "transactionType": "credit",
//             "closingBalance": 400.9,
//             "date": "2023-12-29T05:20:55.366Z"
//         },
//         {
//             "amount": 0.9,
//             "transactionType": "credit",
//             "closingBalance": 401.79999999999995,
//             "date": "2023-12-29T06:37:46.430Z"
//         },
//         {
//             "amount": 0.9,
//             "transactionType": "credit",
//             "closingBalance": 402.69999999999993,
//             "date": "2024-01-01T09:56:27.684Z"
//         }
//     ],
//     "bankDetails": [
//         "65793ed5cf0629b002dd0379",
//         "6579e1fd00845785efbe347e",
//         "65802053eb792ab59c49694f",
//         "6580221ceb792ab59c496a47",
//         "6580248beb792ab59c496a78",
//         "6580250deb792ab59c496aad",
//         "6580260aeb792ab59c496ab6",
//         "65802709eb792ab59c496ae3",
//         "658a9f1b80d77d5f0e424285"
//     ],
//     "balance": 402.69999999999993,
//     "reviews": [
//         {
//             "_id": "656eaea4717d4188e96a39a7",
//             "rating": 4,
//             "customer": "656846a6307c9cd23431e609",
//             "sme": "65685304307c9cd23431e687",
//             "session": "656d763fd70d1fb7b601e7e0",
//             "comment": "moye moye moye moye moye moye moye moye",
//             "updatedAt": "2024-03-14T05:48:38.861Z"
//         },
//         {
//             "_id": "656eaeb8717d4188e96a39a8",
//             "rating": 3,
//             "customer": "656846a6307c9cd23431e609",
//             "sme": "65685304307c9cd23431e687",
//             "session": "656d763fd70d1fb7b601e7e0",
//             "comment": "moye moye moye moye moye moye moye moye",
//             "updatedAt": "2024-03-14T05:48:38.861Z"
//         },
//         {
//             "_id": "65793c53cf0629b002dd0301",
//             "customer": "656846a6307c9cd23431e609",
//             "sme": "65685304307c9cd23431e687",
//             "rating": 3,
//             "comment": "Good",
//             "session": "65784daaad00142696640993",
//             "createdAt": "2023-12-13T05:08:35.652Z",
//             "updatedAt": "2023-12-13T05:08:35.653Z",
//             "__v": 0
//         },
//         {
//             "_id": "657941eccf0629b002dd0402",
//             "customer": "656846a6307c9cd23431e609",
//             "sme": "65685304307c9cd23431e687",
//             "rating": 4,
//             "comment": "",
//             "session": "65793c08cf0629b002dd02cd",
//             "createdAt": "2023-12-13T05:32:28.104Z",
//             "updatedAt": "2023-12-13T05:32:28.104Z",
//             "__v": 0
//         },
//         {
//             "_id": "65828d944cacc3e743725c7b",
//             "customer": "656846a6307c9cd23431e609",
//             "sme": "65685304307c9cd23431e687",
//             "rating": 3,
//             "comment": "Fhjk",
//             "session": "65793c08cf0629b002dd02cd",
//             "createdAt": "2023-12-20T06:45:40.353Z",
//             "updatedAt": "2023-12-20T06:45:40.353Z",
//             "__v": 0
//         },
//         {
//             "_id": "658292f94cacc3e743725cc1",
//             "customer": "656846a6307c9cd23431e609",
//             "sme": "65685304307c9cd23431e687",
//             "rating": 3,
//             "comment": "",
//             "session": "65793c08cf0629b002dd02cd",
//             "createdAt": "2023-12-20T07:08:41.309Z",
//             "updatedAt": "2023-12-20T07:08:41.309Z",
//             "__v": 0
//         },
//         {
//             "_id": "658acb1a16c46f9fddd9a824",
//             "customer": "656846a6307c9cd23431e609",
//             "sme": "65685304307c9cd23431e687",
//             "rating": 3,
//             "comment": "",
//             "session": "658abd0172fb0a4325ee05e3",
//             "createdAt": "2023-12-26T12:46:18.142Z",
//             "updatedAt": "2023-12-26T12:46:18.143Z",
//             "__v": 0
//         },
//         {
//             "_id": "658bdfb31d39958c50ee1a22",
//             "customer": "656846a6307c9cd23431e609",
//             "sme": "65685304307c9cd23431e687",
//             "rating": 4,
//             "comment": "New comment from y2",
//             "session": "65898e5d8ae87159afe5edda",
//             "createdAt": "2023-12-27T08:26:27.604Z",
//             "updatedAt": "2023-12-27T08:26:27.604Z",
//             "__v": 0
//         },
//         {
//             "_id": "65928f6f02a029a5183a1c0a",
//             "customer": "656846a6307c9cd23431e609",
//             "sme": "65685304307c9cd23431e687",
//             "rating": 4,
//             "comment": "Nice chat with vari",
//             "session": "659288a402a029a5183a1a41",
//             "createdAt": "2024-01-01T10:09:51.554Z",
//             "updatedAt": "2024-01-01T10:09:51.554Z",
//             "__v": 0
//         }
//     ],
//     "sessions": [
//         {
//             "_id": "658abd0172fb0a4325ee05e3",
//             "customer": "656846a6307c9cd23431e609",
//             "sme": "65685304307c9cd23431e687",
//             "title": "5:13 session",
//             "razorpay_payment_id": "pay_NGxhoco4B3Hqfj",
//             "amount": 1,
//             "start": "2023-12-26T11:52:00.000Z",
//             "end": "2023-12-26T12:52:00.000Z",
//             "reviews": [],
//             "ratedByUsers": [
//                 "656846a6307c9cd23431e609"
//             ],
//             "subCategory": "65684e6a307c9cd23431e657",
//             "status": "rejected",
//             "createdAt": "2023-12-26T11:46:09.271Z",
//             "__v": 0,
//             "chat": "658abd336f98f91a44f5b0a2"
//         },
//         {
//             "_id": "658abd0172fb0a4325ee05e3",
//             "customer": "656846a6307c9cd23431e609",
//             "sme": "65685304307c9cd23431e687",
//             "title": "5:13 session",
//             "razorpay_payment_id": "pay_NGxhoco4B3Hqfj",
//             "amount": 1,
//             "start": "2023-12-26T11:52:00.000Z",
//             "end": "2023-12-26T12:52:00.000Z",
//             "reviews": [],
//             "ratedByUsers": [
//                 "656846a6307c9cd23431e609"
//             ],
//             "subCategory": "65684e6a307c9cd23431e657",
//             "status": "rejected",
//             "createdAt": "2023-12-26T11:46:09.271Z",
//             "__v": 0,
//             "chat": "658abd336f98f91a44f5b0a2"
//         },
//         {
//             "_id": "658abd0172fb0a4325ee05e3",
//             "customer": "656846a6307c9cd23431e609",
//             "sme": "65685304307c9cd23431e687",
//             "title": "5:13 session",
//             "razorpay_payment_id": "pay_NGxhoco4B3Hqfj",
//             "amount": 1,
//             "start": "2023-12-26T11:52:00.000Z",
//             "end": "2023-12-26T12:52:00.000Z",
//             "reviews": [],
//             "ratedByUsers": [
//                 "656846a6307c9cd23431e609"
//             ],
//             "subCategory": "65684e6a307c9cd23431e657",
//             "status": "rejected",
//             "createdAt": "2023-12-26T11:46:09.271Z",
//             "__v": 0,
//             "chat": "658abd336f98f91a44f5b0a2"
//         },
//         {
//             "_id": "658abd0172fb0a4325ee05e3",
//             "customer": "656846a6307c9cd23431e609",
//             "sme": "65685304307c9cd23431e687",
//             "title": "5:13 session",
//             "razorpay_payment_id": "pay_NGxhoco4B3Hqfj",
//             "amount": 1,
//             "start": "2023-12-26T11:52:00.000Z",
//             "end": "2023-12-26T12:52:00.000Z",
//             "reviews": [],
//             "ratedByUsers": [
//                 "656846a6307c9cd23431e609"
//             ],
//             "subCategory": "65684e6a307c9cd23431e657",
//             "status": "rejected",
//             "createdAt": "2023-12-26T11:46:09.271Z",
//             "__v": 0,
//             "chat": "658abd336f98f91a44f5b0a2"
//         },
//         {
//             "_id": "658abd0172fb0a4325ee05e3",
//             "customer": "656846a6307c9cd23431e609",
//             "sme": "65685304307c9cd23431e687",
//             "title": "5:13 session",
//             "razorpay_payment_id": "pay_NGxhoco4B3Hqfj",
//             "amount": 1,
//             "start": "2023-12-26T11:52:00.000Z",
//             "end": "2023-12-26T12:52:00.000Z",
//             "reviews": [],
//             "ratedByUsers": [
//                 "656846a6307c9cd23431e609"
//             ],
//             "subCategory": "65684e6a307c9cd23431e657",
//             "status": "rejected",
//             "createdAt": "2023-12-26T11:46:09.271Z",
//             "__v": 0,
//             "chat": "658abd336f98f91a44f5b0a2"
//         },
//         {
//             "_id": "658abd0172fb0a4325ee05e3",
//             "customer": "656846a6307c9cd23431e609",
//             "sme": "65685304307c9cd23431e687",
//             "title": "5:13 session",
//             "razorpay_payment_id": "pay_NGxhoco4B3Hqfj",
//             "amount": 1,
//             "start": "2023-12-26T11:52:00.000Z",
//             "end": "2023-12-26T12:52:00.000Z",
//             "reviews": [],
//             "ratedByUsers": [
//                 "656846a6307c9cd23431e609"
//             ],
//             "subCategory": "65684e6a307c9cd23431e657",
//             "status": "rejected",
//             "createdAt": "2023-12-26T11:46:09.271Z",
//             "__v": 0,
//             "chat": "658abd336f98f91a44f5b0a2"
//         },
//         {
//             "_id": "658abd0172fb0a4325ee05e3",
//             "customer": "656846a6307c9cd23431e609",
//             "sme": "65685304307c9cd23431e687",
//             "title": "5:13 session",
//             "razorpay_payment_id": "pay_NGxhoco4B3Hqfj",
//             "amount": 1,
//             "start": "2023-12-26T11:52:00.000Z",
//             "end": "2023-12-26T12:52:00.000Z",
//             "reviews": [],
//             "ratedByUsers": [
//                 "656846a6307c9cd23431e609"
//             ],
//             "subCategory": "65684e6a307c9cd23431e657",
//             "status": "rejected",
//             "createdAt": "2023-12-26T11:46:09.271Z",
//             "__v": 0,
//             "chat": "658abd336f98f91a44f5b0a2"
//         },
//         {
//             "_id": "658e4e568aeda0457f57e7d5",
//             "customer": "656846a6307c9cd23431e609",
//             "sme": "65685304307c9cd23431e687",
//             "title": "session to check cht ended for both side",
//             "razorpay_payment_id": "pay_NI26aOFV2ggmic",
//             "amount": 1,
//             "start": "2023-12-29T05:00:00.000Z",
//             "end": "2023-12-29T07:00:00.000Z",
//             "reviews": [],
//             "ratedByUsers": [],
//             "subCategory": "65684e6a307c9cd23431e657",
//             "status": "expired",
//             "createdAt": "2023-12-29T04:43:02.769Z",
//             "__v": 0,
//             "chat": "658e4ecf8aeda0457f57e7ed"
//         },
//         {
//             "_id": "658e4e568aeda0457f57e7d5",
//             "customer": "656846a6307c9cd23431e609",
//             "sme": "65685304307c9cd23431e687",
//             "title": "session to check cht ended for both side",
//             "razorpay_payment_id": "pay_NI26aOFV2ggmic",
//             "amount": 1,
//             "start": "2023-12-29T05:00:00.000Z",
//             "end": "2023-12-29T07:00:00.000Z",
//             "reviews": [],
//             "ratedByUsers": [],
//             "subCategory": "65684e6a307c9cd23431e657",
//             "status": "expired",
//             "createdAt": "2023-12-29T04:43:02.769Z",
//             "__v": 0,
//             "chat": "658e4ecf8aeda0457f57e7ed"
//         },
//         {
//             "_id": "659288a402a029a5183a1a41",
//             "customer": "656846a6307c9cd23431e609",
//             "sme": "65685304307c9cd23431e687",
//             "title": "After deploying ?",
//             "razorpay_payment_id": "pay_NJImOk96Tv4LQr",
//             "amount": 1,
//             "start": "2024-01-01T09:50:00.000Z",
//             "end": "2024-01-01T10:50:00.000Z",
//             "reviews": [],
//             "ratedByUsers": [
//                 "656846a6307c9cd23431e609"
//             ],
//             "subCategory": "65684e6a307c9cd23431e657",
//             "status": "completed",
//             "createdAt": "2024-01-01T09:40:52.030Z",
//             "__v": 0,
//             "chat": "65928ae602a029a5183a1a64"
//         }
//     ],
//     "smeStatus": "approved",
//     "userStatus": "approved",
//     "createdAt": "2023-11-30T09:16:52.386Z",
//     "updatedAt": "2023-11-30T09:16:52.386Z",
//     "__v": 0,
//     "otp": 167418
// }
