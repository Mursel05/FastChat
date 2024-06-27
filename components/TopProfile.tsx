import { DataContextType, MessagesDataType, UserType } from "@/model";
import { DataContext } from "@/pages/home";
import Image from "next/image";
import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";

type TopProfileProps = {
  otherUser: UserType | undefined;
  setOtherUser: (user: UserType | undefined) => void;
  message: MessagesDataType | undefined;
};

const TopProfile = ({ otherUser, setOtherUser, message }: TopProfileProps) => {
  const { deleteMessage } = useContext(DataContext) as DataContextType;
  const [showOpt, setShowOpt] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", function (e: any) {
      if (
        !btnRef.current?.contains(e.target) &&
        !dropRef.current?.contains(e.target)
      ) {
        setShowOpt(false);
      }
    });
  }, []);
  return (
    <div className="bg-dark-blue-500 justify-between items-center flex p-6 pr-3">
      <div className="flex gap-3 items-center">
        <img
          src={otherUser?.photo}
          onError={(e) => (e.currentTarget.src = "/no-profile.jpg")}
          className="rounded-full"
          alt="person"
          width={70}
          height={70}
        />
        <div className="text-white flex flex-col">
          <p className="text-xl mb-1">
            {otherUser?.name + " " + otherUser?.surname}
          </p>
          <span className="text-gray-400 font-normal">
            {otherUser?.lastSeen == "Online"
              ? otherUser?.lastSeen
              : `Last seen ${otherUser?.lastSeen.slice(12)}`}
          </span>
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
        <div
          ref={btnRef}
          onClick={() => setShowOpt(!showOpt)}
          className="cursor-pointer w-10 h-10 rounded-full hover:bg-slate-600 text-white flex flex-col gap-1 items-center justify-center ">
          <div className="h-1 w-1 rounded-full bg-white"></div>
          <div className="h-1 w-1 rounded-full bg-white"></div>
          <div className="h-1 w-1 rounded-full bg-white"></div>
        </div>
        <div
          ref={dropRef}
          className={`bg-white absolute right-0 top-20 z-30 ${
            showOpt ? "flex" : "hidden"
          } gap-1 flex-col rounded-md mr-1 overflow-hidden`}>
          <div
            onClick={() => {
              deleteMessage(message?._id, otherUser?.uid);
              setOtherUser(undefined);
            }}
            className="hover:bg-slate-200 cursor-pointer py-2 px-4">
            Delete chat
          </div>
          <div
            onClick={() => setOtherUser(undefined)}
            className="hover:bg-slate-200 cursor-pointer py-2 px-4">
            Close chat
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopProfile;
