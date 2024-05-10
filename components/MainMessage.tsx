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
import { DataContextType, MessagesDataType, UserType } from "@/model";
import { DataContext } from "@/pages/home";

type MainMessageProps = {
  otherUser: UserType | undefined;
  user: UserType | undefined;
};

const MainMessage = ({ otherUser, user }: MainMessageProps) => {
  const { messages } = useContext(DataContext) as DataContextType;
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<MessagesDataType>();
  const [file, setFile] = useState<any>(null);

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
          file={file}
          chatBoxRef={chatBoxRef}
          setFile={setFile}
          message={message}
          otherUser={otherUser}
        />
        <InputMessage otherUser={otherUser} file={file} setFile={setFile} />
      </div>
    );
  } else return <div className="w-[55%]"></div>;
};

export default MainMessage;
