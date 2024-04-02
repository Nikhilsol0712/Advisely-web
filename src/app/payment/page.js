"use client";
import React, { useState, useEffect } from "react";
import {
  createSessionRequest,
  createSessionSuccess,
  createSessionFailure,
  fetchSessionRequest,
  fetchSessionSuccess,
  fetchSessionFailure,
} from "../Actions/sessionActions";
import { BASE_URL } from "../utils/assets";
import sessionServices from "../services/sessionService";
import { useDispatch, useSelector } from "react-redux";

const Payment = () => {
  const dispatch = useDispatch();
  const { sessionFormData } = useSelector((state) => state.session);
  const { userInfo } = useSelector((state) => state.auth);
  const [sessionId, setSessionId] = useState("");

  const priceTotal = sessionFormData.amount;

  useEffect(() => {
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
  }, []);

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
        };

        if (success) {
          const razorpay = new window.Razorpay(options);
          razorpay
            .open()
            .then((data) => {
              const paymentDetails = {
                razorpay_order_id: order.id,
                razorpay_payment_id: data.razorpay_payment_id,
                razorpay_signature: data.razorpay_signature,
              };
              const sessionData = {
                ...sessionFormData,
                razorpay_payment_id: paymentDetails.razorpay_payment_id,
              };
              sendPaymentDetailsToServer(paymentDetails, sessionData);
            })
            .catch((error) => {
              // Handle payment failure
              
              console.error(
                `Razorpay Error: ${error.code} | ${error.description}`
              );
              handleCancelPayment();
            });
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

  return <div>Payment</div>;
};

export default Payment;
