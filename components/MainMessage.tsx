import TopProfile from "./TopProfile";
import InputMessage from "./InputMessage";
import ChatBox from "./ChatBox";
import { useContext, useEffect, useRef, useState } from "react";
import { ChatType, DataContextType, MessagesDataType, UserType } from "@/model";
import { DataContext } from "@/pages/home";

type MainMessageProps = {
  otherUser: UserType | undefined;
  user: UserType | undefined;
};

const MainMessage = ({ otherUser, user }: MainMessageProps) => {
  const { messages } = useContext(DataContext) as DataContextType;
  const divRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<MessagesDataType>();

  const goToBottomOfDiv = () => {
    if (divRef.current) {
      const { scrollHeight, clientHeight } = divRef.current;
      divRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  };
  // console.log(messages);

  useEffect(() => {
    setMessage(
      messages?.find(
        (item) =>
          item.persons.includes(otherUser?.uid || "") &&
          item.persons.includes(user?.uid || "")
      )
    );
  }, [otherUser, messages]);

  if (otherUser)
    return (
      <div className="w-[55%]  relative">
        <TopProfile otherUser={otherUser} />
        <ChatBox divRef={divRef} message={message} otherUser={otherUser} />
        <InputMessage goToBottomOfDiv={goToBottomOfDiv} otherUser={otherUser} />
      </div>
    );
  else return <div className="w-[55%]"></div>;
};

export default MainMessage;
