import TopProfile from "./TopProfile";
import InputMessage from "./InputMessage";
import ChatBox from "./ChatBox";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ChatType, DataContextType, MessagesDataType, UserType } from "@/model";
import { DataContext } from "@/pages/home";

type MainMessageProps = {
  otherUser: UserType | undefined;
  user: UserType | undefined;
};

const MainMessage = ({ otherUser, user }: MainMessageProps) => {
  const { messages, changeSeen } = useContext(DataContext) as DataContextType;
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<MessagesDataType>();

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
        <TopProfile otherUser={otherUser} />
        <ChatBox
          chatBoxRef={chatBoxRef}
          message={message}
          otherUser={otherUser}
        />
        <InputMessage goToBottomOfDiv={goToBottomOfDiv} otherUser={otherUser} />
      </div>
    );
  } else return <div className="w-[55%]"></div>;
};

export default MainMessage;
