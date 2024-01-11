import Image from "next/image";
import { dynamicUI } from "@/app/utils/assets";

export default function HomeFlow() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-10/12 flex flex-row justify-evenly gap-4 rounded-lg border border-slate-400 mt-16 mb-9">
        <div className=" p-10 flex flex-col items-center w-2/3">
          <Image width={200} height={100} src="/images/sinupIcon.jpg" />
          <p
            style={{ color: dynamicUI["COLOR-PRIMARY"] }}
            className="text-center mt-7"
          >
            Step 1: Register as an applicant/parent on Advisely
          </p>
        </div>
        <div className=" p-10 flex flex-col items-center w-2/3">
          <Image width={200} height={100} src="/images/scheduleIcon.jpg" />
          <p
            style={{ color: dynamicUI["COLOR-PRIMARY"] }}
            className="text-center mt-7"
          >
            Step 2: Schedule a session with the best students/alumni around the
            world
          </p>
        </div>
        <div className=" p-10 flex flex-col items-center w-2/3">
          <Image width={300} height={200} src="/images/mentorshipIcon.jpg" />
          <p
            style={{ color: dynamicUI["COLOR-PRIMARY"] }}
            className="text-center mt-10"
          >
            Step 3: Learn from your mentor and make better college decisions
          </p>
        </div>
      </div>
    </div>
  );
}
