"use client";
import React, { useEffect, useState } from "react";
import { GoShareAndroid } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import useWindowResize from "@/Hooks/useWindowResize";
import { Dialog, Transition } from "@headlessui/react";
import { FaCalendar } from "react-icons/fa6";
import { BsClockFill } from "react-icons/bs";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  setSessionFormData,
  createSessionRequest,
  createSessionSuccess,
  createSessionFailure,
  fetchSessionRequest,
  fetchSessionSuccess,
  fetchSessionFailure,
} from "../../Actions/sessionActions";
import { useRouter } from "next/navigation";
import { BASE_URL } from "../../utils/assets";
import sessionServices from "../../services/sessionService";

const SmeDetailProfileCard = ({ userDetail }) => {
  const initialState = {
    title: "",
    start: "",
    end: "",
  };
  const router = useRouter();
  const dispatch = useDispatch();
  const isMobile = useWindowResize();
  const [date, setDate] = useState(new Date());
  const [selectedOptions, setSelectedOptions] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFromData] = useState(initialState);
  const { sessionFormData } = useSelector((state) => state.session);
  const { userInfo } = useSelector((state) => state.auth);
  const [sessionId, setSessionId] = useState("");
  const priceTotal = sessionFormData.amount;

  const handleSelect = (optionIndex, selectime) => {
    setSelectedOptions(optionIndex);
    setSelectedTime(selectime);
  };

  useEffect(() => {
    if (selectedTime !== "") {
      const newTotalAmount = Math.floor(
        (userDetail?.hourlyRate / 60) * selectedTime
      );
      setTotalAmount(newTotalAmount);
      setFromData((prevData) => ({
        ...prevData,
        amount: newTotalAmount,
      }));
    }
  }, [selectedTime, userDetail.hourlyRate]);

  const handleChange = (field, value) => {
    setFromData((prevData) => ({
      ...prevData,
      [field]: value,
      sme: userDetail._id,
      subCategory: userDetail?.selectedSubcategories[0]?._id,
    }));
  };

  const handleBooking = async () => {
    dispatch(setSessionFormData(formData));
    // Navigate to payment page with formData using redux state
    // router.push("/payment");

    if (window.Razorpay) {
      handleClickPlaceOrder();
    } else {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        handleClickPlaceOrder();
      };
      document.body.appendChild(script);
    }
  };

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  // ======== Razorpay part start from here ==============

  const handleClickPlaceOrder = () => {
    fetch(`${BASE_URL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceTotal }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const { success, order, razorpayApiKey } = data;
        const options = {
          key: razorpayApiKey,
          description: sessionFormData.title,
          image:
            "https://drive.google.com/file/d/1pMlwdlO7iWMw94RYF3jYxFH9HLt7PiTu/view?usp=sharing", // Update with your logo URL
          order_id: order.id,
          currency: "INR",
          amount: priceTotal * 100,
          name: "advisely",
          prefill: {
            name: `${userInfo.firstName} ${userInfo.lastName}`,
            email: userInfo.email,
            contact: userInfo.phoneNumber,
          },
          notes: {
            address: "Your address here",
          },
          theme: { color: "#7305fa" },
          handler: function (response) {
            // alert(`Payment Succesful ${response}`);

            //   {
            //     "razorpay_order_id": "order_NoyA4tuyeFZold",
            //     "razorpay_payment_id": "pay_NoyABJ2tmK57xq",
            //     "razorpay_signature": "72c9880cf127e3fb23293b2ae1951eb19def78237cd415e292b4d5be7f4a096a"
            // }

            const paymentDetails = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            const sessionData = {
              ...sessionFormData,
              razorpay_payment_id: paymentDetails.razorpay_payment_id,
            };

            sendPaymentDetailsToServer(paymentDetails, sessionData);
          },
        };

        if (success) {
          const razorpay = new window.Razorpay(options);
          razorpay.open();
          // .then((data) => {
          //   console.log("after pymt done data==", data);
          //   const paymentDetails = {
          //     razorpay_order_id: order.id,
          //     razorpay_payment_id: data.razorpay_payment_id,
          //     razorpay_signature: data.razorpay_signature,
          //   };
          //   const sessionData = {
          //     ...sessionFormData,
          //     razorpay_payment_id: paymentDetails.razorpay_payment_id,
          //   };
          //   sendPaymentDetailsToServer(paymentDetails, sessionData);
          // })
          // .catch((error) => {
          //   // Handle payment failure

          //   console.error(
          //     `Razorpay Error: ${error.code} | ${error.description}`
          //   );
          //   handleCancelPayment();
          // });
        } else {
          console.error("Error creating order on the server");
          // You can set a state variable or show an error message to the user here
        }
      })
      .catch((error) => {
        console.error("Error initiating payment on the server:", error);
      });
  };

  const sendPaymentDetailsToServer = (paymentDetails, sessionData) => {
    fetch(`${BASE_URL}/paymentverification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const { success, message } = data;
        if (success) {
          createBooking(sessionData);
        } else {
          // Handle payment verification failure on the client side
        }
      })
      .catch((error) => {
        console.error("Error verifying payment on the server:", error);
        // Handle error in payment verification on the client side
      });
  };

  const createBooking = async (sessionData) => {
    dispatch(createSessionRequest());
    try {
      const response = await sessionServices.createSessions(sessionData);
      if (response.success === true) {
        dispatch(createSessionSuccess(response.result));
        setSessionId(response.result._id);
        await updateSessionStatus(response.result._id, { status: "confirmed" });
        loadMySessions();
      }
    } catch (error) {
      dispatch(createSessionFailure(error.message));
    }
  };

  const loadMySessions = async () => {
    dispatch(fetchSessionRequest());
    try {
      const response = await sessionServices.fetchMySessions();

      if (response.success === true) {
        dispatch(fetchSessionSuccess(response.result));
        // Navigate here after succeess fully pymnt
        router.push("/user/sessions");
      }
    } catch (err) {
      dispatch(fetchSessionFailure(err.message));
    }
  };

  const updateSessionStatus = async (SessionId, updates) => {
    try {
      const response = await sessionServices.updateSessions(SessionId, updates);
      return response;
    } catch (error) {
      console.error("Error updating session status:", error);
    }
  };

  return (
    <div className="  bg-white flex flex-col rounded-lg  gap-4">
      {/* profileSection */}
      <div className="relative border flex flex-col  h-[22rem] rounded-lg    ">
        <div
          style={{
            backgroundImage: `url('/images/bg-Profileimage.jpg')`,
          }}
          className="rounded-t-lg bg-cover h-2/5"
        ></div>
        <div className=" flex flex-col p-1 rounded-lg justify-end items-center bg-white h-3/5 ">
          <div className=" flex items-end   bg-white h-3/5 justify-center  w-full">
            <span className="text-black   w-full justify-center items-center bg-white flex text-center text-xl h-12 font-semibold">
              {userDetail?.firstName} {userDetail?.lastName}
            </span>
          </div>
          <div className="flex items-start bg-white w-full items-start justify-center   gap-2 h-2/5 flex-row">
            <span className="p-2   text-purple-700 hover:bg-purple-700 hover:text-white border text-xl rounded">
              <GoShareAndroid />
            </span>
            <span className="p-2 text-green-600 hover:bg-purple-700 hover:text-white border text-xl rounded">
              <MdVerified />
            </span>
            <span className="p-2 text-purple-700 hover:bg-purple-700 hover:text-white border text-xl rounded">
              <IoMdHeartEmpty />
            </span>
          </div>
        </div>
        {/* circular profile img div */}
        <div
          style={{
            borderColor: "#efedff",
            backgroundImage: `url('${userDetail?.profilePic}')`,
          }}
          className="absolute top-36 inset-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[50%] text-white h-36 w-36 bg-center bg-cover bg-white border-4 "
        ></div>
      </div>
      {/* slot and availability section */}
      <div className="border  flex flex-col rounded-lg">
        <div className=" p-4 flex flex-col">
          <span className="font-semibold text-[1rem] text-black">
            Mentor's available slots
          </span>
          <span style={{ color: "#718096" }} className="text-[0.8rem]">
            In your local timezone (Asia/Calcutta)
          </span>
          {/* horizontal line */}
          <div className="w-full mt-2 flex justify-center">
            <hr className="w-full" />
          </div>
        </div>
        {/* slots */}
        <div className="text-black h-auto   flex flex-col gap-4 p-4  items-center ">
          <div className="w-full gap-4 flex flex-row  justify-center items-center ">
            <span
              onClick={() => handleSelect(1, 5)}
              className={`bg-yellow-100 ${
                selectedOptions === 1 ? "border-yellow-600" : ""
              } hover:border-yellow-600  rounded p-2 h-10 w-20 text-center hover:cursor-pointer border`}
            >
              5 min
            </span>
            <span
              onClick={() => handleSelect(2, 10)}
              className={`bg-yellow-100 ${
                selectedOptions === 2 ? "border-yellow-600" : ""
              } hover:border-yellow-600 rounded p-2 h-10 w-20 text-center hover:cursor-pointer border`}
            >
              10 min
            </span>
            <span
              onClick={() => handleSelect(3, 15)}
              className={`bg-yellow-100 ${
                selectedOptions === 3 ? "border-yellow-600" : ""
              }   hover:border-yellow-600  rounded p-2 h-10 w-20 text-center hover:cursor-pointer border`}
            >
              15 min
            </span>
          </div>
          <div className="w-full gap-4 flex flex-row  justify-center items-center ">
            <span
              onClick={() => handleSelect(4, 20)}
              className={`bg-yellow-100 ${
                selectedOptions === 4 ? "border-yellow-600" : ""
              }  hover:border-yellow-600 rounded p-2 h-10 w-20 text-center hover:cursor-pointer border`}
            >
              20 min
            </span>
            <span
              onClick={() => handleSelect(5, 30)}
              className={`bg-yellow-100 ${
                selectedOptions === 5 ? "border-yellow-600" : ""
              } hover:border-yellow-600 rounded p-2 h-10 w-20 text-center hover:cursor-pointer border`}
            >
              30 min
            </span>
            <span
              onClick={() => handleSelect(6, 60)}
              className={`bg-yellow-100 ${
                selectedOptions === 6 ? "border-yellow-600" : ""
              }  hover:border-yellow-600 rounded p-2 h-10 w-20 text-center hover:cursor-pointer border`}
            >
              60 min
            </span>
          </div>
        </div>
        {/* total calculated amount show */}
        <div className="text-black h-auto border-t border-b  flex flex-row  justify-between gap-4 p-4  items-center ">
          <span className="text-[0.8rem]">Total Amount:</span>
          <span className="text-purple-700">₹ {totalAmount}</span>
        </div>

        {/* date and time picker */}
        <div className="text-black h-auto   flex flex-col    p-4  items-start ">
          <span className="text-[1rem] font-semibold text-black">
            Select Time Slot:
          </span>
          <div className="flex mt-3 gap-4 flex-row">
            <span style={{ color: "#718096" }} className="">
              Session Date:
            </span>
            <span className="text-black font-medium">
              {moment(date).format("DD-MM-YYYY")}
            </span>
          </div>
          <div className="flex mt-1 gap-4 flex-row">
            <span
              style={{ color: "#718096" }}
              className="text-black font-medium"
            >
              Session Time:
            </span>
            <span className="text-black font-medium">
              {moment(date).format("hh:mm A")}
            </span>
          </div>

          <div className="flex mt-2  justify-center items-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  className="hover:cursor-pointer"
                  label="Select date and time"
                  // value={date}
                  onChange={(newDate) => {
                    // Convert Day.js object to JavaScript Date object
                    const jsDate = newDate.toDate();
                    const endDate = moment(jsDate).add(selectedTime, "minutes");
                    setFromData({
                      ...formData,
                      start: jsDate,
                      end: endDate.toDate(),
                    });
                    setDate(jsDate);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>

        {/* book a mentor button */}
        <div className="text-black mb-4 h-auto   flex flex-col     items-center ">
          <button
            onClick={openDialog}
            className="p-2 rounded w-48 bg-purple-700 text-white hover:bg-purple-700 "
          >
            Book a mentor
          </button>
        </div>
      </div>
      {/* profileSection */}
      {!isMobile && (
        <div className="relative flex flex-col  h-[4rem] rounded-lg "></div>
      )}

      {/* Dialog open section */}
      <Transition.Root show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeDialog}
        >
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block align-middle bg-white rounded-lg p-8 text-left overflow-hidden shadow-xl transform transition-all my-8">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Confirm Your Booking
                </Dialog.Title>
                <div className="mt-2 flex items-center gap-1 flex-row bg">
                  <span
                    className={`${
                      isMobile ? "text-xs" : "text-sm"
                    }  text-gray-500`}
                  >
                    Mentorship Session With
                  </span>
                  <span
                    className={`${
                      isMobile ? "text-xs" : "text-sm"
                    } text-purple-700 `}
                  >
                    {userDetail?.firstName} {userDetail?.lastName}
                  </span>
                </div>

                <div className="flex flex-row gap-2 items-center mt-2 ">
                  <span style={{ color: "#718096" }}>
                    <FaCalendar />
                  </span>

                  <span className="text-black">
                    {" "}
                    {moment(date).format("DD-MM-YYYY")}
                  </span>
                </div>

                <div className="flex flex-row gap-2 items-center mt-1 ">
                  <span style={{ color: "#718096" }}>
                    <BsClockFill />
                  </span>

                  <span className="text-black">
                    {moment(date).format("hh:mm A")} (Asia/Calcutta)
                  </span>
                </div>

                <div className="flex flex-row gap-4 mt-2">
                  <span className="text-black">Total Amount:</span>
                  <span className="text-black font-semibold">
                    ₹{totalAmount}
                  </span>
                </div>

                <div className="flex justify-center items-center mt-2">
                  <input
                    className="border h-16 px-4 w-full rounded-lg text-black"
                    placeholder="Type your question here...."
                    onChange={(event) =>
                      handleChange("title", event.target.value)
                    }
                  />
                </div>

                <div className="mt-4 flex items-center justify-center w-full">
                  {/* <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500"
                    onClick={closeDialog}
                  >
                    Close
                  </button> */}
                  <button
                    type="button"
                    className="inline-flex justify-center w-4/5 px-4 py-2 text-sm font-medium text-white bg-purple-700 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500"
                    onClick={handleBooking}
                  >
                    Confirm & Pay
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default SmeDetailProfileCard;
