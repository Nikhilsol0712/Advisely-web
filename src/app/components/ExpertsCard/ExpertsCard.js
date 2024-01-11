"use client";

import Image from "next/image";

const includedFeatures = [
  "Private forum access",
  "Member resources",
  "Entry to annual conference",
  "Official member t-shirt",
];

export default function ExpetsCard() {
  return (
    <div className=" p-2 lg:mt-0 lg:w-full max-w-64 lg:flex-shrink-0">
      <div className="rounded-2xl mt-5 py-5 text-center shadow-lg ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-5">
        <div className="mx-auto max-w-xs px-3">
          <div className="mt-1  flex flex-col items-center justify-center gap-2">
            <div>
              <img
                className="w-28 h-28 bg-red-200 rounded-full"
                src="/images/nikhil.jpeg"
                alt="Profile Image"
              />
            </div>

            <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
              Nikhil Solanki
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-gray-600">
            Invoices and receipts available for easy company reimbursement
          </p>
          <a
            href="#"
            className="mt-2 block w-full rounded-md bg-purple-950 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm "
          >
            Book Session
          </a>
        </div>
      </div>
    </div>
  );
}
