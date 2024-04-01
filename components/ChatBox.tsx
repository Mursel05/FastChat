"use client";
import {
  ChatType,
  DataContextType,
  DataType,
  MessagesDataType,
  UserContextType,
  UserType,
} from "@/model";
import { DataContext } from "@/pages/_app";
import { UserContext } from "@/pages/home";
import { useContext, useEffect, useRef, useState } from "react";

type ChatBoxProps = {
  divRef: React.RefObject<HTMLDivElement>;
  messages: MessagesDataType | undefined;
  otherUser: UserType;
};

const ChatBox = ({ divRef, messages, otherUser }: ChatBoxProps) => {
  const { user } = useContext(UserContext) as UserContextType;

  return (
    <div
      ref={divRef}
      className=" py-4 bg-dark-blue-400 px-7 flex flex-col overflow-y-scroll gap-2 message-height">
      {messages?.chat?.map((item, index) =>
        item.personUid != user.uid ? (
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
                messages?.chat[index + 1] &&
                messages?.chat[index + 1].personUid == otherUser.uid
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
              messages?.chat[index - 1] &&
              messages?.chat[index - 1].personUid != user.uid
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
