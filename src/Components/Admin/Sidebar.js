import React, { useState } from "react";
import { Link } from "react-router-dom";

const Slidebar = () => {
  let commonClass =
    "inline-flex items-center w-full px-4 py-2 mt-1 text-base transition duration-500 ease-in-out transform border-none rounded-lg text-neutral-200 focus:bg-neutral-900 focus:border-neutral-900 focus:shadow-outline";

  return (
    <>
      <div className="w-64 h-screen shadow hidden lg:block bg-white">
        <div className="flex flex-col md:flex md:flex-shrink-0">
          <div className="flex flex-col md:w-64 md:h-screen">
            <div className="flex flex-col flex-grow md:pt-5 overflow-y-auto border-r bg-neutral-800">
              <div className="flex flex-col flex-grow px-4 mt-5">
                <nav className="flex-1 space-y-1 bg-neutral-800">
                  <ul
                    className={
                      "md:flex md:flex-col md:w-60 bg-inherit w-64 h-full md:h-auto pl-4 md:pb-0 pb-12 absolute md:z-auto z[-50]  right-0 md:left-0"
                    }
                  >
                    <li>
                        <Link to="/connect-admin/home" className="inline-flex items-center w-full px-4 py-2 text-neutral-200 text-xl font-bold">Admin Console</Link>
                    </li>
                    <li>
                      <Link
                        className="inline-flex items-center w-full px-4 py-2 mt-1 text-base transition duration-500 ease-in-out transform border rounded-lg text-neutral-200 border-neutral-800 hover:border-neutral-800 focus:shadow-outline hover:bg-neutral-900"
                        to={"/connect-admin/new-doctor"}
                      >
                      <i class="fa-solid fa-user-doctor"></i>
                        <span className="ml-4">Doctor Registration</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-flex items-center w-full px-4 py-2 mt-1 text-base transition duration-500 ease-in-out transform border rounded-lg text-neutral-200 border-neutral-800 hover:border-neutral-800 focus:shadow-outline hover:bg-neutral-900"
                        to={"/connect-admin/book-appointment"}
                      >
                        <i class="fa-regular fa-calendar-check"></i>
                        <span className="ml-4">Book appointment</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-flex items-center w-full px-4 py-2 mt-1 text-base transition duration-500 ease-in-out transform border rounded-lg text-neutral-200 border-neutral-800 hover:border-neutral-800 focus:shadow-outline hover:bg-neutral-900"
                        to={"/connect-admin/new-patient"}
                      >
                        <i class="fa-regular fa-user"></i>
                        <span className="ml-4">Patient Registration</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-flex items-center w-full px-4 py-2 mt-1 text-base transition duration-500 ease-in-out transform border rounded-lg text-neutral-200 border-neutral-800 hover:border-neutral-800 focus:shadow-outline hover:bg-neutral-900"
                        to={"/connect-admin/update-patient"}
                      >
                      <i class="fa-solid fa-bed"></i>
                        <span className="ml-4">Update Patient</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-flex items-center w-full px-4 py-2 mt-1 text-base transition duration-500 ease-in-out transform border rounded-lg text-neutral-200 border-neutral-800 hover:border-neutral-800 focus:shadow-outline hover:bg-neutral-900"
                        to={"/connect-admin/check-appointment"}
                      >
                        <i class="fa-regular fa-bookmark"></i>
                        <span className="ml-4">Check appointment</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="hidden md:flex md:flex-shrink-0 md:p-4 md:bg-neutral-900">
                <Link to={"/"} className="flex-shrink-0 block w-full group">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block rounded-full h-9 w-9"
                        src="/images/logo.png"
                        alt="logo"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-neutral-200">
                        Swasthya
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Slidebar;