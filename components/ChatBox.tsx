"use client";
import { DataContextType, DataType } from "@/model";
import { DataContext } from "@/pages/_app";
import { useContext, useEffect, useRef, useState } from "react";

const chats = {
  person1: "chris",
  person2: "nick",
  chat: [
    {
      person: "chris",
      message: "Hey How are you?",
      time: "10:00",
    },
    {
      person: "chris",
      message:
        "I was asking for your New Year Plans, ask we are going to host a party.  ask we are going to host a party.",
      time: "10:00",
    },
    {
      person: "nick",
      message: "I am good, How about you?",
      time: "10:05",
    },
    {
      person: "chris",
      message: "Great! Let’s meet in the party!",
      time: "10:07",
    },
    {
      person: "nick",
      message: "I am good, How about you?",
      time: "10:05",
    },
    {
      person: "chris",
      message: "Great! Let’s meet in the party!",
      time: "10:07",
    },
    {
      person: "nick",
      message: "I am good, How about you?",
      time: "10:05",
    },
    {
      person: "chris",
      message: "Great! Let’s meet in the party!",
      time: "10:07",
    },
    {
      person: "nick",
      message: "I am good, How about you?",
      time: "10:05",
    },
    {
      person: "chris",
      message: "Great! Let’s meet in the party!",
      time: "10:07",
    },
    {
      person: "nick",
      message: "Sure! I will be there.",
      time: "10:10",
    },
    {
      person: "nick",
      message: "Sure! I will be there.",
      time: "10:10",
    },
    {
      person: "chris",
      message: "Great! Let’s meet in the party!",
      time: "10:07",
    },
    {
      person: "nick",
      message: "Sure! I  be there.",
    },
  ],
};

const ChatBox = ({ user, divRef }: any) => {
  const { data } = useContext(DataContext) as DataContextType;

  const [newData, setNewData] = useState<DataType[]>(data);
  useEffect(() => {
    setNewData(data);
  }, [data]);

  return (
    <div
      ref={divRef}
      className=" py-4 bg-dark-blue-400 px-7 flex flex-col overflow-y-scroll gap-2 message-height">
      {/* {data[0] &&
        data[0].chat.map((item, index) =>
          item.person != user.displayName ? (
            <div key={index} className="flex items-center self-start gap-5">
              <img
                className="rounded-full"
                width={50}
                height={50}
                src={user.photoURL}
                alt="user-profile-pic"
              />
              <div
                className={`max-w-md text-white  bg-text-blue-300 p-3 ${
                  data[0].chat[index + 1] &&
                  data[0].chat[index + 1].person == user.displayName
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
                data[0].chat[index - 1] &&
                data[0].chat[index - 1].person != "chris"
                  ? "rounded-e-none"
                  : ""
              } rounded-xl rounded-ee-none`}>
              <span>{item.message}</span>
            </div>
          )
        )} */}
    </div>
  );
};

export default ChatBox;
