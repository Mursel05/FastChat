"use client";
import { DataContextType, MessagesDataType, UserType } from "@/model";
import { DataContext } from "@/pages/home";
import { useContext } from "react";

type ChatBoxProps = {
  divRef: React.RefObject<HTMLDivElement>;
  message: MessagesDataType | undefined;
  otherUser: UserType;
};

const ChatBox = ({ divRef, message, otherUser }: ChatBoxProps) => {
  const { user } = useContext(DataContext) as DataContextType;
  
  if (message)
    return (
      <div
        ref={divRef}
        className=" py-4 bg-dark-blue-400 px-7 flex flex-col overflow-y-scroll gap-2 message-height">
        {message.chats.map((item, index) =>
          item.sender != user?.uid ? (
            <div key={index} className="flex items-center self-start gap-5">
              <img
                className="rounded-full"
                width={50}
                height={50}
                src={otherUser.photo}
                alt="user-profile-pic"
              />
              <div
                className={`max-w-md text-white  bg-text-blue-300 p-3 ${
                  message.chats[index + 1] &&
                  message.chats[index + 1].sender == otherUser.uid
                    ? "rounded-s-none"
                    : ""
                } rounded-xl rounded-ss-none`}>
                <span>{item.message}</span>
              </div>
            </div>
          ) : (
            <div
              key={index}
              className={`max-w-md text-white self-end bg-dark-blue-500  p-3 ${
                message.chats[index - 1] &&
                message.chats[index - 1].sender != user.uid
                  ? "rounded-e-none"
                  : ""
              } rounded-xl rounded-ee-none`}>
              <span>{item.message}</span>
            </div>
          )
        )}
      </div>
    );
};

export default ChatBox;
