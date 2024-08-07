import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../../atoms/UserAtom";
import UserTile from "./UserTile";
import UserProperties from "./UserProperties";

export default function Profile() {
  const user = useRecoilValue(UserAtom);
  const navigate = useNavigate();


  return (
    <div className="h-auto py-4 px-2 md:px-10 min-h-screen mb-20  ">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 pt-2 pb-7">
        {user.isOwner && (
          <div
            className=" flex px-8 pr-4 gap-3 my-2 cursor-pointer bg-purple-500 hover:bg-purple-700 rounded-full h-12 max-w-72  items-center justify-around text-white text-xl"
            onClick={() => {
              navigate("/property");
            }}
          >
            <h1 className="cursor-pointer">Add New Property</h1>
            <div className="size-10 p-1 flex items-center  border-2 rounded-full ">
              <img src="/plus.svg" alt="Add New Property" />
            </div>
          </div>
        )}
        <div
          className={`px-8 cursor-pointer   ${
            user.isOwner
              ? "bg-purple-500 hover:bg-purple-700"
              : "bg-red-500 hover:bg-red-700"
          } rounded-full h-12 flex items-center justify-around text-white text-xl max-w-72`}
          onClick={() => {
            navigate(`/booking/${user.id}`)
          }}
        >
          <p>My Bookings</p>
        </div>
      </div>
      <div className={`flex flex-col items-center  lg:grid  ${user.isOwner ? "grid-cols-[1fr,3fr]" : "grid-cols-1 place-items-center" } gap-6 px-10`}>
        <div className="w-72 ">

        <UserTile />
        </div>
        {user.isOwner && (
          <div className="bg-purple-200 h-[40rem] min-w-40 border-2 border-gray-200 shadow-lg pb-8 rounded-xl overflow-y-scroll customScrollbar">
            <UserProperties />
          </div>
        )}
        {/* hideScrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-300 */}
      </div>
    </div>
  );
}
