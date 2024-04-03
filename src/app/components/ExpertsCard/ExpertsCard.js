import { motion } from "framer-motion";
import Image from "next/image";

const includedFeatures = [
  "Private forum access",
  "Member resources",
  "Entry to annual conference",
  "Official member t-shirt",
];

export default function ExpetsCard({ smeDetail }) {
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: "-100%" }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
        duration: 5,
        delay: 1,
      }}
      className="p-2 lg:mt-0 lg:w-full max-w-64 lg:flex-shrink-0"
      style={{ zIndex: -1 }}
    >
      <div className="rounded-2xl min-h-[50vh] mt-5 py-5 text-center shadow-lg ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-5">
        <div className="mx-auto w-full flex flex-col justify-center items-center  px-3">
          <div className="mt-1 flex flex-col items-center justify-center gap-2">
            <div
              className="w-28 h-28 bg-cover rounded-full"
              style={{
                backgroundImage: `url(${
                  smeDetail?.profilePic
                    ? smeDetail.profilePic
                    : "/images/dummyUser.jpg"
                })`,
              }}
            ></div>

            <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
              {smeDetail?.firstName} {smeDetail?.lastName}
            </span>
          </div>

          <p className="mt-2 text-xs h-12  leading-5 text-gray-600">
            {smeDetail?.bio && smeDetail.bio.length > 50
              ? smeDetail.bio.substring(0, 50) + "..."
              : smeDetail.bio}
          </p>
          <a
            href="#"
            style={{ backgroundColor: "#F9B408" }}
            className="mt-2 block w-40 rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm "
          >
            View more
          </a>
        </div>
      </div>
    </motion.div>
  );
}
