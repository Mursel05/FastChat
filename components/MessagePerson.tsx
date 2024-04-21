import { WS_URL } from "@/config/Url";
import { DataContextType, MessagesDataType, UserType } from "@/model";
import { DataContext } from "@/pages/home";
import { useContext, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

type MessagePersonProps = {
  message: MessagesDataType;
  selectOtherUser: (user: UserType | undefined) => void;
};

const MessagePerson = ({ message, selectOtherUser }: MessagePersonProps) => {
  const { user } = useContext(DataContext) as DataContextType;
  const [otherUser, setOtherUser] = useState<UserType | undefined>();
  const { lastMessage, sendJsonMessage, readyState } = useWebSocket(WS_URL, {
    share: true,
    shouldReconnect: () => true,
  });

  function findOtherUser(uid: string) {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: "getUserByUid",
        uid: user?.uid,
        otherUid: uid,
      });
    }
  }

  useEffect(() => {
    const otherUserUid =
      message.persons[0] == user?.uid ? message.persons[1] : message.persons[0];
    findOtherUser(otherUserUid);
  }, [readyState]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      if (data.otherUser) {
        setOtherUser(data.otherUser);
      }
    }
  }, [lastMessage]);

  if (otherUser)
    return (
      <div
        onClick={() => selectOtherUser(otherUser)}
        className="cursor-pointer flex items-center gap-3 p-4 bg-dark-blue-400">
        <img
          src={otherUser?.photo}
          className="rounded-full"
          alt="person"
          width={70}
          height={70}
        />
        <div className="text-white flex flex-col gap-1">
          <p className="text-gray-200">
            {otherUser.name + " " + otherUser.surname}
          </p>
          <span>In front of the bar, about whic...</span>
        </div>
      </div>
    );
};

export default MessagePerson;
