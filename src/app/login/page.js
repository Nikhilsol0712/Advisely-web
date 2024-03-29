"use client";
import React, { useState } from "react";
import Image from "next/image";

const Login = () => {
  const [activeForm, setActiveForm] = useState("login");

  const toggleForm = (formType) => {
    setActiveForm(formType);
  };

  return (
    <div className="w-full h-fit bg-white flex justify-evenly items-center">
      <Image width={450} height={300} src="/images/loginArt.jpg" />

      {/* =========================================================== */}
      <div className="relative z-0 flex  flex-col w-4/12 bg-white break-words ">
        <div className="p-1  text-center flex  justify-around items-center border-b-0 ">
          <div className="flex border rounded-2xl justify-between mt-5 p-1 w-11/12">
            <div
              onClick={() => toggleForm("login")}
              className={`font-semibold rounded-lg flex items-center justify-center w-52 h-10  text-black   ${
                activeForm === "login" ? "bg-purple-200" : ""
              }`}
            >
              Log In
            </div>
            <div
              onClick={() => toggleForm("signup")}
              className={`font-semibold rounded-xl flex items-center justify-center w-52 h-10 text-black   ${
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
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  // onChange={(e) => handleChange(e)}
                  // value={formData.email}
                  required
                  className="text-sm h-10 focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="email-addon"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  // onChange={(e) => handleChange(e)}
                  // value={formData.password}
                  required
                  className="text-sm h-10  focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="password-addon"
                />
              </div>
              <div className="min-h-6 mb-0.5 block pl-12">
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
              </div>
              <div className="text-center">
                <button
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   handleSignin(e);
                  // }}
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
              <div className="mb-4 flex justify-between">
                <input
                  type="text"
                  name="firstName"
                  // onChange={(e) => handleChange(e)}
                  // value={formData.email}
                  required
                  className="text-sm h-10 focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-44 appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  placeholder="First Name"
                  aria-label="first name"
                  aria-describedby="firstName-addon"
                />

                <input
                  type="text"
                  name="lastName"
                  // onChange={(e) => handleChange(e)}
                  // value={formData.email}
                  required
                  className="text-sm h-10 focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-44 appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  placeholder="Last Name"
                  aria-label="last name"
                  aria-describedby="firstName-addon"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  // onChange={(e) => handleChange(e)}
                  // value={formData.email}
                  required
                  className="text-sm h-10 focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="email-addon"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  // onChange={(e) => handleChange(e)}
                  // value={formData.password}
                  required
                  className="text-sm h-10  focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="password-addon"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="phoneNumber"
                  // onChange={(e) => handleChange(e)}
                  // value={formData.password}
                  required
                  className="text-sm h-10  focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  placeholder="Phone Number"
                  aria-label="phoneNumber"
                  aria-describedby="phoneNumber-addon"
                />
              </div>
              <div className="mb-4 flex justify-between">
                <input
                  type="text"
                  name="zipcode"
                  // onChange={(e) => handleChange(e)}
                  // value={formData.email}
                  required
                  className="text-sm h-10 focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-44 appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  placeholder="zip code"
                  aria-label="zip code"
                  aria-describedby="zipcode-addon"
                />

                <input
                  type="text"
                  name="dateOfBirth"
                  // onChange={(e) => handleChange(e)}
                  // value={formData.email}
                  required
                  className="text-sm h-10 focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-44 appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  placeholder="DOB"
                  aria-label="DOB"
                  aria-describedby="DOB-addon"
                />
              </div>

              <div className="text-center">
                <button
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   handleSignin(e);
                  // }}
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
