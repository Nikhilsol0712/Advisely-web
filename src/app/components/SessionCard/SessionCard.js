import React from "react";
import moment from "moment";
import session from "redux-persist/lib/storage/session";
import sessionServices from "../../services/sessionService";
import {
  updateSessionRequest,
  updateSessionSuccess,
  updateSessionFailure,
} from "../../Actions/sessionActions";
import {
  createChatRequest,
  createChatSuccess,
  createChatFailure,
} from "../../Actions/chatActions";
import { useDispatch, useSelector } from "react-redux";
import chatServices from "@/app/services/chatService";

export const SessionCard = ({ session }) => {
  const dispatch = useDispatch();

  const timeUntilStart = moment(session?.start).diff(moment(), "hours");
  const userType = localStorage.getItem("userType");

  const updateSessionStatus = async (Session, updates) => {
    dispatch(updateSessionRequest());
    try {
      const response = await sessionServices.updateSessions(
        Session._id,
        updates
      );
      if (response.success === true) {
        // setSessionUpdated(response.result);
        dispatch(updateSessionSuccess(response.result));

        if (response.result.status === "accepted") {
          dispatch(createChatRequest());
          try {
            const chatCreated = await chatServices.createNewChat({
              customerId: response.result.customer,
              smeId: response.result.sme,
              sessionId: response.result._id,
            });
            if (chatCreated.result === true) {
              dispatch(createChatSuccess(chatCreated.result));
            }
          } catch (err) {
            dispatch(createChatFailure(err.message));
          }
        }
      }

      return response;
    } catch (error) {
      console.error("Error updating session status:", error);
      // dispatch(updateSessionFailure(response.error));
    }
  };

  const updateSessionStatusToCancel = async (Session, updates) => {
    dispatch(updateSessionRequest());
    try {
      const response = await sessionServices.updateSessions(
        Session._id,
        updates
      );
      if (response.success === true) {
        // setSessionUpdated(response.result);
        dispatch(updateSessionSuccess(response.result));
      }

      return response;
    } catch (error) {
      console.error("Error updating session status:", error);
      // dispatch(updateSessionFailure(response.error));
    }
  };

  return (
    <div className="bg-white flex flex-col text-black shadow w-80 min-w-80 rounded border border-stone-300 ">
      {/* seprator 1 */}
      <div className="flex p-2  justify-between bg-white rounded  flex-row">
        <div className="flex flex-row ">
          <div className="flex  flex-col  ">
            <img
              alt=""
              className="rounded-full h-12 w-12"
              src="https://picsum.photos/id/1/200/300"
            />
          </div>
          <div className="flex ml-2   justify-center flex-col">
            <span className="text-sm  font-medium">
              {session?.sme?.firstName} {session?.sme?.lastName}
            </span>
            <span className="text-[0.6rem]  font-medium">
              {session?.subCategory?.name}
            </span>

            <span className="text-[0.6rem]  font-medium">
              Status : {session?.status}
            </span>
          </div>
        </div>

        {userType === "customer" &&
          session?.status === "comfirmed" &&
          session?.status === "rejected" && (
            <div className="flex flex-col">
              <span
                onClick={updateSessionStatusToCancel(session, {
                  status: "cancelled",
                })}
                className="border p-1 rounded-md  hover:cursor-pointer text-xs"
              >
                cancel session
              </span>
            </div>
          )}
      </div>
      {/* seprator 2 */}
      <div className=" flex flex-col p-2 pb-4 border-b">
        <span className="text-[0.7rem] font-light">Question Title: </span>
        <p className="text-[0.6rem] leading-tight font-medium text-pretty">
          {session?.title.length > 110
            ? `${session?.title.substring(0, 110)}...`
            : session?.title}
        </p>
      </div>
      {/* seprator 3 */}
      <div className="flex flex-col  p-2">
        <span className="text-xs">Booked on-</span>
        <div className="flex justify-between items-center flex-row">
          <span className="text-yellow-500 text-xs">
            {moment.utc(session?.start).format("MMMM D, YYYY [at] hh:mm A")}
          </span>
          {timeUntilStart >= 0 ? (
            <span className="bg-purple-700 text-white text-xs p-1 rounded-lg">
              {timeUntilStart} hrs to go
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* seprator 4 */}

      {session.status === "confirmed" && userType === "SME" && (
        <div className="flex flex-row   items-center gap-4 p-1">
          <span
            onClick={() => updateSessionStatus(session, { status: "accepted" })}
            className="bg-green-400 text-white rounded-lg   text-xs p-2 "
          >
            Accept
          </span>
          <span
            onClick={() => updateSessionStatus(session, { status: "rejected" })}
            className="bg-red-300 text-white rounded-lg text-xs p-2"
          >
            Reject
          </span>
        </div>
      )}
    </div>
  );
};

// const formattedStartTime = moment
//   .utc(session?.start)
//   .format("MMMM D, YYYY [at] hh:mm A");

// const { sessions } = useSelector((state) => state.session);

//   {
//     "_id": "65fc0d629a86cda0e796281b",
//     "customer": {
//         "workingHours": {
//             "Monday": [],
//             "Tuesday": [],
//             "Wednesday": [],
//             "Thursday": [],
//             "Friday": [],
//             "Saturday": [],
//             "Sunday": []
//         },
//         "_id": "65f184a5b1d91a04ffecc201",
//         "firstName": "nikhil",
//         "lastName": "solanki",
//         "email": "nikhil1212@gmail.com",
//         "password": "$2a$11$JuON/kczb6g9sd1A8lRjH.oMZp3yMYmA.Mj3X7My2M0/Frsus3k92",
//         "profilePic": "default_image.jpg",
//         "identity": null,
//         "userType": "customer",
//         "dateOfBirth": "2024-03-17T18:30:00.000Z",
//         "registrationSource": "email",
//         "phoneNumber": "8637367333",
//         "zipcode": "356636",
//         "selectedCategory": [],
//         "selectedSubcategories": [],
//         "packages": [],
//         "paymentHistory": [],
//         "bankDetails": [],
//         "balance": 0,
//         "reviews": [],
//         "sessions": [],
//         "smeStatus": "pending",
//         "userStatus": "approved",
//         "createdAt": "2024-03-13T10:49:09.884Z",
//         "updatedAt": "2024-03-13T10:49:09.885Z",
//         "__v": 0,
//         "otp": 454545
//     },
//     "sme": {
//         "workingHours": {
//             "Monday": [
//                 {
//                     "start": "08:00 AM",
//                     "end": "05:00 PM"
//                 }
//             ],
//             "Tuesday": [
//                 {
//                     "start": "08:00 AM",
//                     "end": "05:00 PM"
//                 }
//             ],
//             "Wednesday": [],
//             "Thursday": [],
//             "Friday": [
//                 {
//                     "start": "08:00 AM",
//                     "end": "05:00 PM"
//                 }
//             ],
//             "Saturday": [],
//             "Sunday": [
//                 {
//                     "start": "08:00 AM",
//                     "end": "05:00 PM"
//                 }
//             ]
//         },
//         "packages": [],
//         "_id": "65685304307c9cd23431e687",
//         "firstName": "Vari",
//         "lastName": "Soni",
//         "email": "vari@gmail.com",
//         "password": "$2a$11$bCJ/QdEPR6ArP4I9o.GeSenqe2.9Y./da6oGtdHwl.Le70IiFYlOC",
//         "profilePic": "https://advisely.blr1.digitaloceanspaces.com/1702881726469-803504393-indian-woman-standing-office-with-her-arms-crossed_893012-48076.jpg",
//         "identity": "https://advisely.blr1.digitaloceanspaces.com/1702696856344-312475946-IMG-20231213-WA0007.jpg",
//         "userType": "SME",
//         "dateOfBirth": "Thu Nov 30 2000 14:42:00 GMT+0530 (IST)",
//         "registrationSource": "email",
//         "phoneNumber": "+919388160227",
//         "zipcode": "454775",
//         "linkedinProfile": "https://www.linkedin.com/in/nikhil-solanki-9662ba254",
//         "bio": "Empowering students on their educational journey, our education and touring experts offer personalized support in subjects ranging from STEM to humanities.",
//         "selectedCategory": [
//             "65684d0d307c9cd23431e631"
//         ],
//         "selectedSubcategories": [
//             "65684e6a307c9cd23431e657"
//         ],
//         "hourlyRate": 6,
//         "paymentHistory": [
//             {
//                 "amount": 97.2,
//                 "transactionType": "credit",
//                 "closingBalance": 97.2,
//                 "date": "2023-12-04T06:11:26.055Z"
//             },
//             {
//                 "amount": 54,
//                 "transactionType": "credit",
//                 "closingBalance": 151.2,
//                 "date": "2023-12-13T05:08:15.068Z"
//             },
//             {
//                 "amount": 54,
//                 "transactionType": "credit",
//                 "closingBalance": 205.2,
//                 "date": "2023-12-13T05:08:17.606Z"
//             },
//             {
//                 "amount": "100",
//                 "transactionType": "debit",
//                 "closingBalance": 105.19999999999999,
//                 "date": "2023-12-13T05:20:08.500Z"
//             },
//             {
//                 "amount": 54,
//                 "transactionType": "credit",
//                 "closingBalance": 159.2,
//                 "date": "2023-12-13T05:32:14.132Z"
//             },
//             {
//                 "amount": "50",
//                 "transactionType": "debit",
//                 "closingBalance": 109.19999999999999,
//                 "date": "2023-12-13T06:54:21.842Z"
//             },
//             {
//                 "amount": "100",
//                 "transactionType": "debit",
//                 "closingBalance": 9.199999999999989,
//                 "date": "2023-12-13T07:13:09.657Z"
//             },
//             {
//                 "amount": "50",
//                 "transactionType": "debit",
//                 "closingBalance": 300,
//                 "date": "2023-12-13T07:36:57.114Z"
//             },
//             {
//                 "amount": "100",
//                 "transactionType": "debit",
//                 "closingBalance": 200,
//                 "date": "2023-12-13T07:48:58.477Z"
//             },
//             {
//                 "amount": 0.9,
//                 "transactionType": "credit",
//                 "closingBalance": 200.9,
//                 "date": "2023-12-26T09:29:48.783Z"
//             },
//             {
//                 "amount": 0.9,
//                 "transactionType": "credit",
//                 "closingBalance": 201.8,
//                 "date": "2023-12-26T09:29:49.932Z"
//             },
//             {
//                 "amount": 0.9,
//                 "transactionType": "credit",
//                 "closingBalance": 202.70000000000002,
//                 "date": "2023-12-26T10:21:24.315Z"
//             },
//             {
//                 "amount": 0.9,
//                 "transactionType": "credit",
//                 "closingBalance": 203.60000000000002,
//                 "date": "2023-12-26T11:55:11.735Z"
//             },
//             {
//                 "amount": 0.9,
//                 "transactionType": "credit",
//                 "closingBalance": 204.50000000000003,
//                 "date": "2023-12-26T12:03:17.814Z"
//             },
//             {
//                 "amount": 0.9,
//                 "transactionType": "credit",
//                 "closingBalance": 205.40000000000003,
//                 "date": "2023-12-26T12:17:04.916Z"
//             },
//             {
//                 "amount": 0.9,
//                 "transactionType": "credit",
//                 "closingBalance": 206.30000000000004,
//                 "date": "2023-12-26T12:23:09.368Z"
//             },
//             {
//                 "amount": 0.9,
//                 "transactionType": "credit",
//                 "closingBalance": 207.20000000000005,
//                 "date": "2023-12-26T12:23:34.698Z"
//             },
//             {
//                 "amount": 0.9,
//                 "transactionType": "credit",
//                 "closingBalance": 208.10000000000005,
//                 "date": "2023-12-26T12:45:47.810Z"
//             },
//             {
//                 "amount": 0.9,
//                 "transactionType": "credit",
//                 "closingBalance": 209.00000000000006,
//                 "date": "2023-12-26T12:57:11.074Z"
//             },
//             {
//                 "amount": 0.9,
//                 "transactionType": "credit",
//                 "closingBalance": 209.90000000000006,
//                 "date": "2023-12-27T04:49:05.153Z"
//             },
//             {
//                 "amount": "400",
//                 "transactionType": "debit",
//                 "closingBalance": 400,
//                 "date": "2023-12-28T03:34:30.949Z"
//             },
//             {
//                 "amount": 0.9,
//                 "transactionType": "credit",
//                 "closingBalance": 400.9,
//                 "date": "2023-12-29T05:20:55.366Z"
//             },
//             {
//                 "amount": 0.9,
//                 "transactionType": "credit",
//                 "closingBalance": 401.79999999999995,
//                 "date": "2023-12-29T06:37:46.430Z"
//             },
//             {
//                 "amount": 0.9,
//                 "transactionType": "credit",
//                 "closingBalance": 402.69999999999993,
//                 "date": "2024-01-01T09:56:27.684Z"
//             }
//         ],
//         "bankDetails": [
//             "65793ed5cf0629b002dd0379",
//             "6579e1fd00845785efbe347e",
//             "65802053eb792ab59c49694f",
//             "6580221ceb792ab59c496a47",
//             "6580248beb792ab59c496a78",
//             "6580250deb792ab59c496aad",
//             "6580260aeb792ab59c496ab6",
//             "65802709eb792ab59c496ae3",
//             "658a9f1b80d77d5f0e424285"
//         ],
//         "balance": 402.69999999999993,
//         "reviews": [
//             "656dcd98b98a1f226fcac9a1",
//             "656eaea4717d4188e96a39a7",
//             "656eaeb8717d4188e96a39a8",
//             "65793c53cf0629b002dd0301",
//             "657941eccf0629b002dd0402",
//             "65828d944cacc3e743725c7b",
//             "658292f94cacc3e743725cc1",
//             "658acb1a16c46f9fddd9a824",
//             "658bdfb31d39958c50ee1a22",
//             "65928f6f02a029a5183a1c0a"
//         ],
//         "sessions": [
//             "658abd0172fb0a4325ee05e3",
//             "658abd0172fb0a4325ee05e3",
//             "658abd0172fb0a4325ee05e3",
//             "658abd0172fb0a4325ee05e3",
//             "658abd0172fb0a4325ee05e3",
//             "658abd0172fb0a4325ee05e3",
//             "658abd0172fb0a4325ee05e3",
//             "658e4e568aeda0457f57e7d5",
//             "658e4e568aeda0457f57e7d5",
//             "659288a402a029a5183a1a41"
//         ],
//         "smeStatus": "approved",
//         "userStatus": "approved",
//         "createdAt": "2023-11-30T09:16:52.386Z",
//         "updatedAt": "2023-11-30T09:16:52.386Z",
//         "__v": 0,
//         "otp": 167418
//     },
//     "title": "First session from web",
//     "razorpay_payment_id": "pay_NoyS4847tRwRNB",
//     "amount": 1,
//     "start": "2024-03-21T20:39:00.000Z",
//     "end": "2024-03-21T20:49:00.000Z",
//     "reviews": [],
//     "ratedByUsers": [],
//     "subCategory": {
//         "_id": "65684e6a307c9cd23431e657",
//         "name": "Exam Preparation",
//         "category": "65684d0d307c9cd23431e631",
//         "selectedByUsers": [],
//         "createdAt": "2023-11-30T08:57:14.523Z",
//         "updatedAt": "2023-11-30T08:57:14.523Z",
//         "__v": 0
//     },
//     "status": "confirmed",
//     "createdAt": "2024-03-21T10:35:14.568Z",
//     "__v": 0
// }
