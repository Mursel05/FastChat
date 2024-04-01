import TopProfile from "./TopProfile";
import InputMessage from "./InputMessage";
import ChatBox from "./ChatBox";
import { useContext, useEffect, useRef, useState } from "react";
import {
  ChatType,
  DataContextType,
  MessagesDataType,
  UserContextType,
  UserType,
} from "@/model";
import { DataContext } from "@/pages/_app";
import { UserContext } from "@/pages/home";

type MainMessageProps = {
  otherUser: UserType | any;
};

const MainMessage = ({ otherUser }: MainMessageProps) => {
  const { data } = useContext(DataContext) as DataContextType;
  const { user } = useContext(UserContext) as UserContextType;

  const divRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessagesDataType>();
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
    setMessages(
      data?.messages.find(
        (item) =>
          item.persons.includes(otherUser?.uid) &&
          item.persons.includes(user?.uid)
      )
    );
  }, [otherUser, data]);
  if (otherUser)
    return (
      <div className="w-[55%]  relative">
        <TopProfile otherUser={otherUser} />
        <ChatBox divRef={divRef} messages={messages} otherUser={otherUser} />
        <InputMessage user={user} goToBottomOfDiv={goToBottomOfDiv} otherUser={otherUser} />
      </div>
    );
  else return <div className="w-[55%]"></div>;
};

export default MainMessage;
