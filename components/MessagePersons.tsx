import { useContext } from "react";
import MessagePerson from "./MessagePerson";
import { DataContextType, UserType } from "@/model";
import { DataContext } from "@/pages/home";

type MessagePersonsProps = {
  selectOtherUser: (user: UserType | undefined) => void;
};

const MessagePersons = ({ selectOtherUser }: MessagePersonsProps) => {
  const { messages } = useContext(DataContext) as DataContextType;

  return (
    <div className="bg-dark-blue-450 p-2 w-[28%]">
      <p className="text-blue-300 mb-3 mt-2 tracking-[6px]">MESSAGES</p>
      <div className="flex flex-col gap-2">
        {messages?.map((message) => (
          <MessagePerson
            key={message._id}
            message={message}
            selectOtherUser={selectOtherUser}
          />
        ))}
      </div>
    </div>
  );
};

export default MessagePersons;
