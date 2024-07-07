"use client";
import { DataContextType } from "@/model";
import { DataContext } from "@/pages/home";
import Image from "next/image";
import { useContext } from "react";

interface ProfileProps {
  setSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile = ({ setSettings }: ProfileProps) => {
  const { user, signOutUser } = useContext(DataContext) as DataContextType;

  return (
    <div className="bg-dark-blue-500 p-9 flex flex-col w-[17%] gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Image
            className="h-[35px]"
            alt="logo"
            src="/favicon.png"
            width={35}
            height={35}
          />
          <div>
            <span className="text-white font-bold tracking-wider text-xl">
              FAST
            </span>
            <span className="text-blue-500 font-semibold -tracking-normal text-xl">
              CHAT
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          {user ? (
            <img
              className="rounded-full"
              alt="profile picture"
              src={user?.photo}
              onError={(e) => (e.currentTarget.src = "/no-profile.jpg")}
              width={100}
              height={100}
            />
          ) : (
            <div className="w-[100px] h-[100px] rounded-full bg-[#242c31]"></div>
          )}
          {user ? (
            <p className="text-white">{user?.name + " " + user?.surname}</p>
          ) : (
            <div className="bg-[#242c31] my-2 w-full h-2 rounded-3xl"></div>
          )}
        </div>
        <button className="p-1 mt-5 flex items-center justify-center gap-1 px-4 text-white bg-text-blue-300  rounded-xl rounded-ss-none">
          <Image alt="message" src="/message.png" width={15} height={15} />
          Messages
        </button>
      </div>
      <div className="flex gap-4 flex-col">
        <div
          onClick={() => setSettings(true)}
          className="flex gap-2 items-center text-gray-300 cursor-pointer">
          <Image
            className="mt-[1px]"
            alt="settings"
            src="/home.png"
            width={18}
            height={18}
          />
          <span>Settings</span>
        </div>
        <div
          onClick={() => signOutUser()}
          className="flex gap-2 items-center text-gray-300 cursor-pointer">
          <Image
            className="mt-[1px]"
            alt="calls"
            src="/log-out.png"
            width={18}
            height={18}
          />
          <span>Sign out</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
