import Image from "next/image";
import { dynamicUI } from "@/app/utils/assets";
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "400", style: "normal" });

export default function HomeTextTitle() {
  return (
    <div
      style={{ backgroundColor: dynamicUI["COLOR-PRIMARY"] }}
      className="w-full h-full flex justify-center"
    >
      <div className="text-white w-11/12 flex-col justify-center items-center align-center">
        <p className="px-20 text-5xl mt-14 text-center font-bold ">
          You only go to college once or twice in your life, if you're lucky.
        </p>
        <p className="px-20 mt-6 text-2xl text-center text-gray-200">
          The college you go to and the course you study could decide: <br />
        </p>
        <p className="px-20 text-g text-center text-gray-200">
          1. What will be your first job? 💼 <br />
          2. Where will you live? 🏠 <br />
          3. Who will be your lifelong friends? 🧑‍🤝‍🧑
        </p>
        <p className="px-52 mt-6 text-lg text-center text-gray-200">
          You will be spending thousands of dollars and years of time away from
          your family for your college education, and choosing the wrong
          university and course can cost you dearly. ☹️
        </p>{" "}
        <p className="px-52 mt-3 text-lg text-center text-gray-200">
          By talking to current students and alumni through Horse’s Mouth you
          can make a more informed college decision.
        </p>
        <div className="flex justify-center items-center mb-10 mt-10">
          <button
            style={{ color: "rgb(151,122,241)" }}
            className=" bg-white w-72 h-12 font-bold rounded-lg"
          >
            Start talking to students
          </button>
        </div>
      </div>
    </div>
  );
}
