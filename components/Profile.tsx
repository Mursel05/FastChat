"use client";
import { DataContextType } from "@/model";
import { DataContext } from "@/pages/home";
import Image from "next/image";
import { useContext } from "react";

const Profile = () => {
  const { user } = useContext(DataContext) as DataContextType;

  return (
    <div className="bg-dark-blue-500 p-9 flex flex-col w-[17%] gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Image className="h-[35px]" alt="logo" src="/favicon.png" width={35} height={35} />
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
          <img
            className="rounded-full"
            alt="profile picture"
            src={user?.photo}
            onError={(e) => (e.currentTarget.src = "/no-profile.jpg")}
            width={100}
            height={100}
          />
          <p className="text-white">{user?.name + " " + user?.surname}</p>
        </div>
        <button className="p-1 mt-5 flex items-center justify-center gap-1 px-4 text-white bg-text-blue-300  rounded-xl rounded-ss-none">
          <Image alt="message" src="/message.png" width={15} height={15} />
          Messages
        </button>
      </div>
      <div className="flex gap-4 flex-col">
        <div className="flex gap-2 items-center text-gray-300">
          <Image alt="groups" src="/group.png" width={18} height={18} />
          <span>Groups</span>
        </div>
        <div className="flex gap-2 items-center text-gray-300">
          <Image className="h-[18px]"  alt="contacts" src="/vector.png" width={18} height={18} />
          <span>Contacts</span>
        </div>
        <div className="flex gap-2 items-center text-gray-300">
          <Image alt="calls" src="/phone.png" width={18} height={18} />
          <span>Calls</span>
        </div>
        <div className="flex gap-2 items-center text-gray-300">
          <Image alt="settings" src="/home.png" width={18} height={18} />
          <span>Settings</span>
        </div>
        <div className="flex gap-2 items-center text-gray-300">
          <Image className="h-[18px]" alt="night mode" src="/moon.png" width={18} height={18} />
          <span>Night Mode</span>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
