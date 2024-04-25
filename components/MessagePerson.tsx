import {
  DataContextType,
  MessagesDataType,
  UserContextType,
  UserType,
} from "@/model";
import { DataContext, UserContext } from "@/pages/home";
import { useContext, useEffect, useState } from "react";

type MessagePersonProps = {
  message: MessagesDataType;
  selectOtherUser: (user: UserType | undefined) => void;
};

const MessagePerson = ({ message, selectOtherUser }: MessagePersonProps) => {
  const { data } = useContext(DataContext) as DataContextType;
  const { user } = useContext(UserContext) as UserContextType;
  const [otherUser, setOtherUser] = useState<UserType | undefined>();

  useEffect(() => {
    const otherUserUid =
      message.persons[0] == user?.uid ? message.persons[1] : message.persons[0];
    setOtherUser(
      data?.users.find((user: UserType) => user.uid === otherUserUid)
    );
  }, [data]);

  return (
    <div
      onClick={() => selectOtherUser(otherUser)}
      className="cursor-pointer flex items-center gap-3 p-4 bg-dark-blue-400">
      <img
        src={otherUser?.photo}
        onError={(e) => (e.currentTarget.src = "/no-profile.jpg")}
        className="rounded-full"
        alt="person"
        width={70}
        height={70}
      />
      <div className="text-white flex flex-col gap-1">
        <p className="text-gray-200">
          {otherUser?.name + " " + otherUser?.surname}
        </p>
        <span>In front of the bar, about whic...</span>
      </div>
    </div>
  );
};

export default MessagePerson;
