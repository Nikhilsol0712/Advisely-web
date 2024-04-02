"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setAccessTokenHeader } from "../utils/assets";
import { authServices } from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  setToken,
  setUserType,
} from "../Actions/authActions";
import {
  loginSchema,
  signupSchema,
} from "../utils/validations/authValidationSchema";

const Login = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: null,
    phoneNumber: "",
    zipcode: "",
  };

  const [activeForm, setActiveForm] = useState("login");
  const [formData, setFormData] = useState(initialState);
  const [selected, setSelected] = useState(null);
  const [errors, setErrors] = useState({});

  const route = useRouter();
  const dispatch = useDispatch();

  const toggleForm = (formType) => {
    setErrors({});
    setActiveForm(formType);
  };

  const validateField = async (fieldName, value, schema) => {
    try {
      await schema.validateAt(fieldName, { [fieldName]: value });
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: undefined,
      }));
    } catch (err) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: err.message,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    //validate field based on the schema
    if (activeForm === "signup") {
      validateField(name, value, signupSchema);
    } else if (activeForm === "login") {
      validateField(name, value, loginSchema);
    }
  };

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      dateOfBirth: date,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signupSchema.validate(formData, { abortEarly: false });
      const response = await authServices.registerUser(formData);
      if (response.success === true) {
        setActiveForm("login");
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        const ValidationErrors = {};
        err.inner.forEach((error) => {
          ValidationErrors[error.path] = error.message;
        });
        setErrors(ValidationErrors);
      }
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      await loginSchema.validate(formData, { abortEarly: false });

      dispatch(userLoginRequest());
      const response = await authServices.signinUSer(formData);
      if (
        response.success === true &&
        response?.userData?.userType === "customer"
      ) {
        dispatch(userLoginSuccess(response));
        dispatch(setToken(response.token));
        dispatch(setUserType(response?.userData?.userType));
        localStorage.setItem("x-access-token", response.token);
        localStorage.setItem("userType", response?.userData?.userType);
        route.push("/user/home");
      }
      if (response.success === true && response?.userData?.userType === "SME") {
        dispatch(userLoginSuccess(response));
        dispatch(setToken(response.token));
        dispatch(setUserType(response?.userData?.userType));
        localStorage.setItem("x-access-token", response.token);
        localStorage.setItem("userType", response?.userData?.userType);

        route.push("mentors");
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        const ValidationErrors = {};
        err.inner.forEach((error) => {
          ValidationErrors[error.path] = error.message;
        });
        setErrors(ValidationErrors);
      }
    }
  };

  return (
    <div className="w-full h-fit bg-white flex sm:flex-row flex-col justify-evenly items-center">
      <Image
        width={450}
        height={300}
        className="mt-20"
        src="/images/loginArt.jpg"
      />

      {/* =========================================================== */}
      <div className="relative z-0 flex mt-20  flex-col w-4/12 bg-white break-words ">
        <div className="p-1  text-center flex  justify-around items-center border-b-0 ">
          <div className="flex border rounded-2xl justify-between mt-5 p-1 w-11/12">
            <div
              onClick={() => toggleForm("login")}
              className={`font-semibold rounded-lg flex hover:cursor-pointer items-center justify-center w-52 h-10  text-black   ${
                activeForm === "login" ? "bg-purple-200" : ""
              }`}
            >
              Log In
            </div>
            <div
              onClick={() => toggleForm("signup")}
              className={`font-semibold rounded-xl flex hover:cursor-pointer items-center justify-center w-52 h-10 text-black   ${
                activeForm === "signup"
                  ? "bg-purple-950 text-white"
                  : "active:bg-white"
              }`}
            >
              Sign Up
            </div>
          </div>
        </div>

        <div className="flex-auto p-4">
          {/* <div role="form text-left"> */}
          {activeForm === "login" && (
            <form>
              <div className={`${errors.email ? "" : "mb-4"}`}>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  value={formData.email}
                  required
                  className="text-sm h-10 focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="email-addon"
                />
                {errors.email && (
                  <p className=" text-xs mt-1 ml-1 flex items-start text-start text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className={`${errors.password ? "" : "mb-4"}`}>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                  value={formData.password}
                  required
                  className="text-sm h-10  focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="password-addon"
                />
                {errors.password && (
                  <p className=" text-xs mt-1 ml-1 flex items-start text-start text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>
              {/* <div className="min-h-6 mb-0.5 block pl-12">
                <input
                  id="rememberMe"
                  className="mt-0.5 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.3 h-5 relative float-left -ml-12 w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                  type="checkbox"
                  checked=""
                />
                <label
                  className="mb-2 ml-1 font-normal cursor-pointer select-none text-sm text-slate-700"
                  for="rememberMe"
                >
                  Remember me
                </label>
              </div> */}
              <div className="text-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSignin(e);
                  }}
                  style={{ backgroundColor: "#5D3587" }}
                  className="inline-block h-10 w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all  border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md  bg-x-25   to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                >
                  Sign-in
                </button>
              </div>
            </form>
          )}

          {/* ============== signup form ============== */}
          {activeForm === "signup" && (
            <form>
              <div
                className={`${
                  errors.firstName && errors.lastName ? "" : "mb-4"
                } flex flex-col`}
              >
                <div className="flex w-full justify-between ">
                  <input
                    type="text"
                    name="firstName"
                    onChange={(e) => handleChange(e)}
                    value={formData.firstName}
                    required
                    className={` text-sm h-10 focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-44 appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow`}
                    placeholder="First Name"
                    aria-label="first name"
                    aria-describedby="firstName-addon"
                  />

                  <input
                    type="text"
                    name="lastName"
                    onChange={(e) => handleChange(e)}
                    value={formData.lastName}
                    required
                    className={`  text-sm h-10 focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-44 appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow`}
                    placeholder="Last Name"
                    aria-label="last name"
                    aria-describedby="firstName-addon"
                  />
                </div>

                <div className="flex justify-between w-full">
                  <div className="flex text-start w-1/2 ">
                    {errors.firstName && (
                      <p className=" text-xs mt-1 ml-1 flex items-start text-start text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="flex text-start w-1/2  ">
                    {errors.lastName && (
                      <p className=" ml-6 text-xs mt-1 ml-1 flex items-start text-start text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className={`${errors.email ? "" : "mb-4"}  flex flex-col`}>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  value={formData.email}
                  required
                  className={` text-sm h-10 focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow`}
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="email-addon"
                />
                {errors.email && (
                  <p className=" text-xs mt-1 ml-1 flex items-start text-start text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className={`${errors.password ? "" : "mb-4"}`}>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                  value={formData.password}
                  required
                  className="text-sm h-10  focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="password-addon"
                />
                {errors.password && (
                  <p className=" text-xs mt-1 ml-1 flex items-start text-start text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className={`${errors.phoneNumber ? "" : "mb-4"}`}>
                <input
                  type="text"
                  name="phoneNumber"
                  onChange={(e) => handleChange(e)}
                  value={formData.phoneNumber}
                  required
                  className="text-sm h-10  focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  placeholder="Phone Number"
                  aria-label="phoneNumber"
                  aria-describedby="phoneNumber-addon"
                />
                {errors.phoneNumber && (
                  <p className=" text-xs mt-1 ml-1 flex items-start text-start text-red-500">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
              <div className="mb-4 flex justify-between">
                <input
                  type="text"
                  name="zipcode"
                  onChange={(e) => handleChange(e)}
                  value={formData.zipcode}
                  required
                  className="text-sm h-10 focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-44 appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  placeholder="zip code"
                  aria-label="zip code"
                  aria-describedby="zipcode-addon"
                />

                <DatePicker
                  selected={formData.dateOfBirth}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Choose DOB"
                  className="text-sm h-10 focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-44 appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                />

                {/* <input
                  type="text"
                  name="dateOfBirth"
                  onChange={(e) => handleChange(e)}
                  value={formData.dateOfBirth}
                  required
                  className="text-sm h-10 focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-44 appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  placeholder="DOB"
                  aria-label="DOB"
                  aria-describedby="DOB-addon"
                /> */}
              </div>

              <div className="text-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSignup(e);
                  }}
                  style={{ backgroundColor: "#5D3587" }}
                  className="inline-block h-10 w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all  border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md  bg-x-25   to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                >
                  Sign-up
                </button>
              </div>
            </form>
          )}

          {/* {error && (
            <p className=" text-center text-sm text-red-600">{error}</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Login;
