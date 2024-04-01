import { useContext } from "react";
import MessagePerson from "./MessagePerson";
import { DataContext } from "@/pages/_app";
import { DataContextType, UserContextType, UserType } from "@/model";
import { UserContext } from "@/pages/home";

type MessagePersonsProps = {
  selectOtherUser: (user: UserType|undefined) => void;
};

const MessagePersons = ({selectOtherUser}:MessagePersonsProps) => {
  const { data } = useContext(DataContext) as DataContextType;
  const { user } = useContext(UserContext) as UserContextType;
  const NewData = data?.messages.filter((message) =>
    message.persons.includes(user?.uid)
  );

  return (
    <div className="bg-dark-blue-450 p-2 w-[28%]">
      <p className="text-blue-300 mb-3 mt-2 tracking-[6px]">MESSAGES</p>
      <div className="flex flex-col gap-2">
        {NewData?.map((message) => (
          <MessagePerson key={message.id} message={message} selectOtherUser={selectOtherUser}/>
        ))}
      </div>
    </div>
  );
};

export default MessagePersons;
