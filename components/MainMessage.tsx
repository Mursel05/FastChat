import TopProfile from "./TopProfile";
import InputMessage from "./InputMessage";
import ChatBox from "./ChatBox";
import { useContext, useEffect, useRef, useState } from "react";
import { DataContextType, MessagesDataType, UserType } from "@/model";
import { DataContext } from "@/pages/home";
import Image from "next/image";

type MainMessageProps = {
  otherUser: UserType | undefined;
  user: UserType | undefined;
  setOtherUser: (user: UserType | undefined) => void;
};

const MainMessage = ({
  otherUser,
  user,
  setOtherUser,
}: MainMessageProps) => {
  const { messages } = useContext(DataContext) as DataContextType;
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<MessagesDataType>();
  const [file, setFile] = useState<any>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const goToBottomOfDiv = () => {
    setTimeout(() => {
      if (chatBoxRef.current) {
        const { scrollHeight, clientHeight } = chatBoxRef.current;
        chatBoxRef.current.scrollTo({
          top: scrollHeight - clientHeight,
        });
      }
    }, 1);
  };

  useEffect(() => {
    setMessage(
      messages?.find(
        (item) =>
          item.persons.includes(otherUser?.uid || "") &&
          item.persons.includes(user?.uid || "")
      )
    );
  }, [otherUser, messages]);

  useEffect(() => {
    goToBottomOfDiv();
  }, [otherUser]);

  if (otherUser) {
    return (
      <div className="w-[55%]  relative">
        <TopProfile
          otherUser={otherUser}
          setOtherUser={setOtherUser}
          message={message}
        />
        <ChatBox
          file={file}
          chatBoxRef={chatBoxRef}
          setFile={setFile}
          message={message}
          otherUser={otherUser}
          goToBottomOfDiv={goToBottomOfDiv}
          submitBtnRef={submitBtnRef}
        />
        <InputMessage
          submitBtnRef={submitBtnRef}
          otherUser={otherUser}
          file={file}
          setFile={setFile}
        />
      </div>
    );
  } else
    return (
      <div className="w-[55%] grid place-items-center">
        <div className="flex items-center gap-2">
          <Image
            className="h-[35px]"
            alt="logo"
            src="/favicon.png"
            width={40}
            height={40}
          />
          <div>
            <span className="text-blue-950 font-bold tracking-wider text-3xl">
              FAST
            </span>
            <span className="text-blue-500 font-semibold -tracking-normal text-3xl">
              CHAT
            </span>
          </div>
        </div>
      </div>
    );
};

export default MainMessage;
