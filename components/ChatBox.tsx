"use client";
import { ChatType, DataContextType, MessagesDataType, UserType } from "@/model";
import { DataContext } from "@/pages/home";
import { useContext, useEffect, useRef, useState } from "react";

const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

interface OtherUserChatProps {
  chatBoxRef: React.RefObject<HTMLDivElement>;
  item: ChatType;
  index: number;
  otherUser: UserType;
  message: MessagesDataType;
}

const OtherUserChat = ({
  item,
  index,
  otherUser,
  chatBoxRef,
  message,
}: OtherUserChatProps) => {
  const seenRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const wasInView = usePrevious(isInView);
  const { changeSeen } = useContext(DataContext) as DataContextType;

  const checkInView = () => {
    const ele: any = seenRef.current;
    if (!ele) {
      return;
    }
    const rect = ele.getBoundingClientRect();
    setIsInView(rect.top < window.innerHeight - 50);
  };

  useEffect(() => {
    checkInView();
  }, []);

  useEffect(() => {
    chatBoxRef.current?.addEventListener("scroll", checkInView);
    chatBoxRef.current?.addEventListener("resize", checkInView);
    return () => {
      chatBoxRef.current?.removeEventListener("scroll", checkInView);
      chatBoxRef.current?.removeEventListener("resize", checkInView);
    };
  }, []);

  useEffect(() => {
    const ele = seenRef.current;
    if (!ele) {
      return;
    }
    if (!wasInView && isInView && !item.seen) {
      changeSeen(otherUser.uid);
    }
  }, [isInView]);

  useEffect(() => {
    if (!item.seen) {
      seenRef.current?.scrollIntoView(true);
    }
  }, [item.seen]);

  return (
    <div ref={seenRef} className="flex items-center self-start gap-5">
      <img
        className="rounded-full"
        width={50}
        height={50}
        src={otherUser.photo}
        onError={(e) => (e.currentTarget.src = "/no-profile.jpg")}
        alt="user-profile-pic"
      />
      <div
        className={`max-w-md text-white bg-text-blue-300 p-3 rounded-xl ${
          message.chats.toReversed()[index - 1]?.sender == otherUser.uid
            ? "rounded-s-none"
            : ""
        } rounded-ss-none`}>
        <span className="break-all">{item.message}</span>
      </div>
      <span className="text-gray-400 text-sm">{item.time.slice(12)}</span>
    </div>
  );
};

type ChatBoxProps = {
  chatBoxRef: React.RefObject<HTMLDivElement>;
  message: MessagesDataType | undefined;
  otherUser: UserType;
};

const ChatBox = ({ chatBoxRef, message, otherUser }: ChatBoxProps) => {
  const { user } = useContext(DataContext) as DataContextType;

  if (message)
    return (
      <div
        ref={chatBoxRef}
        className="py-4 bg-dark-blue-400 px-7 flex flex-col-reverse overflow-y-scroll gap-2 message-height">
        {message.chats.toReversed().map((item, index) => {
          return item.sender != user?.uid ? (
            <OtherUserChat
              chatBoxRef={chatBoxRef}
              key={item._id}
              item={item}
              index={index}
              otherUser={otherUser}
              message={message}
            />
          ) : (
            <div key={item._id} className="self-end flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">
                  {item.time.slice(12)}
                </span>
                <div
                  key={index}
                  className={`max-w-md text-white bg-dark-blue-500 p-3 ${
                    message.chats.toReversed()[index + 1]?.sender == user.uid
                      ? "rounded-e-none"
                      : ""
                  } rounded-xl rounded-ee-none`}>
                  <span className="break-all">{item.message}</span>
                </div>
              </div>
              <span
                // ref={seenRef}
                className={`${
                  !item.seen && "hidden"
                } self-end text-gray-400 text-xs pr-1`}>
                Seen
              </span>
            </div>
          );
        })}
      </div>
    );
};

export default ChatBox;
