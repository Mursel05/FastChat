import { UserContextType, UserType } from "@/model";
import { UserContext } from "@/pages/home";
import Image from "next/image";
import { useContext } from "react";

type TopProfileProps = {
  otherUser: UserType | undefined;
};

const TopProfile = ({ otherUser }: TopProfileProps) => {

  return (
    <div className="bg-dark-blue-500 justify-between items-center flex p-6 pr-3">
      <div className="flex gap-3 items-center">
        <img
          src={otherUser?.photo}
          className="rounded-full"
          alt="person"
          width={70}
          height={70}
        />
        <div className="text-white flex flex-col">
          <p className="text-xl mb-1">
            {otherUser?.name + " " + otherUser?.surname}
          </p>
          <span className="text-gray-400 font-normal">Last seen 02:55 pm</span>
        </div>
      </div>
      <div className="flex items-center gap-12">
        <div className="flex gap-3">
          <Image
            className="hover:bg-slate-600 p-2 rounded-full cursor-pointer"
            src="/video.png"
            alt="video"
            width={45}
            height={45}
          />
          <Image
            className="hover:bg-slate-600 p-2 rounded-full cursor-pointer"
            src="/phone-1.png"
            alt="call"
            width={45}
            height={45}
          />
        </div>
        <div className="cursor-pointer w-10 h-10 rounded-full hover:bg-slate-600 text-white flex flex-col gap-1 items-center justify-center ">
          <div className="h-1 w-1 rounded-full bg-white"></div>
          <div className="h-1 w-1 rounded-full bg-white"></div>
          <div className="h-1 w-1 rounded-full bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default TopProfile;
