"use client";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getToken,
  getUserType,
  setUserToken,
  removeUserToken,
  removeUserType,
} from "../../token";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setUserType } from "../../Actions/authActions";
import { deleteCookie } from "cookies-next";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const route = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.auth.token);
  const userInfo = useSelector((state) => state.auth.userInfo);

  console.log("userToken====", userToken);
  console.log("userInfo====", userInfo);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   console.log("token from header===", token);
  // }, []);

  const handleLogin = () => {
    route.push("/login");
  };

  const onLogout = () => {
    deleteCookie("x-access-token");
    deleteCookie("userType");
    removeUserToken();
    removeUserType();
    dispatch(setToken(null));
    dispatch(setUserType(null));
    route.push("/login");
  };

  const bookMentorClick = (e) => {
    e.preventDefault();
    if (userToken && userInfo?.userType === "customer") {
      route.push("/user/book-mentor");
    } else if (userToken && userInfo?.userType === "SME") {
      route.push("/mentors");
    } else {
      route.push("/login");
    }
  };

  return (
    <header style={{ zIndex: 999 }} className="bg-white shadow-sm ">
      <nav
        className="mx-auto overflow-hidden flex max-w-7xl items-center justify-between h-16  lg:px-8"
        aria-label="Global"
      >
        <div className="flex mt-1  h-full  lg:flex-1">
          <a href="#" className=" ">
            {/* <span className="sr-only text-black">Your Company</span> */}
            <img
              onClick={() => route.push("/")}
              className="h-full  bg-white w-16 ml-14"
              src="/logo.jpeg"
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {!userToken && (
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <a
              onClick={bookMentorClick}
              href=""
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Book a mentor
            </a>
            <a
              onClick={bookMentorClick}
              href=""
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Find Advisor
            </a>
          </Popover.Group>
        )}

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="flex w-80 justify-end items-center flex-row">
            {userToken && userInfo?.userType === "customer" && (
              <div
                onClick={() => route.push("/user/book-mentor")}
                className="transform hover:scale-105 mr-5 transition-transform duration-300 font-semibold  leading-6 p-2 rounded-md bg-purple-300 text-white hover:bg-purple-700 hover:cursor-pointer"
              >
                Book a mentor
              </div>
            )}

            {userToken && (
              <div
                // onClick={() => route.push("/user/profile")}
                className=" uppercase mr-5 hover:cursor-pointer  rounded-full flex text-center items-center justify-center h-8 p-1 w-8 bg-red-400"
              >
                {userInfo?.firstName[0]}
                {userInfo?.lastName[0]}
              </div>
            )}

            <div
              onClick={userToken ? onLogout : handleLogin}
              className=" flex border mr-5  hover:cursor-pointer border-gray-400 p-1 px-2 text-xs font-medium text-black hover:shadow items-center rounded-md "
            >
              {userToken !== null ? "Logout" : "Login"}
            </div>
          </div>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div style={{ zIndex: 999 }} className="fixed inset-0 " />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Product
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
