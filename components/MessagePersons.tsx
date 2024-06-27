import { useContext, useEffect, useState } from "react";
import MessagePerson from "./MessagePerson";
import { DataContextType, UserType } from "@/model";
import { DataContext } from "@/pages/home";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WS_URL } from "@/config/Url";

type MessagePersonsProps = {
  selectOtherUser: (user: UserType | undefined) => void;
};

const MessagePersons = ({ selectOtherUser }: MessagePersonsProps) => {
  const { messages, otherUsers, addMessage, user } = useContext(
    DataContext
  ) as DataContextType;
  const [email, setEmail] = useState<string>("");
  const [users, setUsers] = useState<UserType[]>([]);
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    share: false,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: "getUsersByEmail",
        email,
        uid: user?.uid,
      });
    }
  }, [readyState, email]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      setUsers(data.users);
    }
  }, [lastMessage]);

  return (
    <div className="bg-dark-blue-450 p-2 w-[28%]">
      <div className="relative">
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 text-lg" htmlFor="addMessage">
            Write Email
          </label>
          <input
            onBlur={() => setTimeout(() => setEmail(""), 200)}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="find-email-input rounded-t-md text-black"
            id="addMessage"
            type="email"
            placeholder="Search Email"
            autoComplete="off"
          />
        </div>
        <div className="email-modal absolute rounded-b-md bg-white flex flex-col overflow-hidden gap-1 pt-1 w-full">
          {email &&
            users.map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  if (
                    !messages?.some((u) => u.persons.includes(item.uid)) ||
                    item.uid === user?.uid
                  ) {
                    addMessage(item.uid);
                  }
                  selectOtherUser(item);
                  setEmail("");
                }}
                className="hover:bg-slate-100 cursor-pointer flex gap-3 items-center pl-1 p-2">
                <img
                  width={50}
                  height={50}
                  className="rounded-full"
                  src={item.photo}
                  onError={(e) => (e.currentTarget.src = "/no-profile.jpg")}
                  alt="user photo"
                />
                <div className="flex flex-col text-black">
                  <span>{item.name + " " + item.surname}</span>
                  <span>{item.email}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
      <p className="text-blue-300 mb-3 mt-2 tracking-[6px]">MESSAGES</p>
      <div className="flex flex-col gap-2">
        {otherUsers?.map((user, i) => (
          <MessagePerson
            key={user._id}
            message={messages && messages[i]}
            user={user}
            selectOtherUser={selectOtherUser}
          />
        ))}
      </div>
    </div>
  );
};

export default MessagePersons;
