import React from "react";
import { Link } from "react-router-dom";

export default function Root() {
  return (
    <div className="w-full h-screen text-white bg-cover bg-hero-pattern-1 overflow-hidden">
      <div className="fixed top-3 p-5 m-5 w-full flex justify-between items-center text-xl md:text-2xl">
        <div className="text-4xl">IPS</div>
        <div className="flex flex-row justify-evenly items-center w-1/2">
          <button className="border-2 rounded-md p-3 cursor-pointer hover:bg-white hover:text-black">
            <Link to={"rooms"}>MANAGE ROOMS</Link>
          </button>
          <button className="border-2 rounded-md p-3 cursor-pointer hover:bg-white hover:text-black">
            <Link to={"live"}>LIVE</Link>
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center h-full">
        <div className="text-5xl md:text-7xl mb-5">
          Indoor Positioning System
        </div>
        <div className="text-2xl md:text-4xl mt-2 mb-5">
          Manage rooms access with ease
        </div>
        <div className="mt-12 text-white flex flex-col justify-center">
          <button className="border-2 rounded-md p-3 cursor-pointer text-xl md:text-2xl hover:bg-white hover:text-black">
            <Link to={"rooms"}>MANAGE ROOMS</Link>
          </button>
        </div>
      </div>
      <div className="fixed bottom-3 p-5 w-full flex justify-center items-center text-xl md:text-2xl">
        © 2024 IPS. All rights reserved.
      </div>
    </div>
  );
}
