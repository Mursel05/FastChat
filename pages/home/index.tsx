"use client";
import MainMessage from "@/components/MainMessage";
import MessagePersons from "@/components/MessagePersons";
import Profile from "@/components/Profile";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { WS_URL } from "@/config/Url";
import { DataContextType, MessagesDataType, UserType } from "@/model";
import { createContext } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export const DataContext = createContext<DataContextType | null>(null);

const Home = () => {
  const [user, setUser] = useState<UserType>();
  const [uid, setUid] = useState<string>();
  const [otherUser, setOtherUser] = useState<UserType | undefined>();
  const [otherUsers, setOtherUsers] = useState<UserType[] | undefined>();
  const [messages, setMessages] = useState<MessagesDataType[]>();
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    share: false,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUid(user.uid);
    });
  }, []);

  function selectOtherUser(user: UserType | undefined) {
    setOtherUser(user);
  }

  async function addChat(otherUserUid: string, message: string): Promise<void> {
    if (readyState === ReadyState.OPEN) {
      const d = new Date();
      sendJsonMessage({
        type: "addChat",
        persons: [user?.uid, otherUserUid],
        chat: {
          time: d.toString().slice(4, 21),
          message,
          sender: user?.uid,
          seen: false,
        },
        uid: user?.uid,
      });
    }
  }

  async function changeSeen(otherUserUid: string): Promise<void> {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: "changeSeen",
        persons: [user?.uid, otherUserUid],
        uid: otherUserUid,
      });
    }
  }

  async function addMessage(uid: string): Promise<void> {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: "addMessage",
        uid: user?.uid,
        persons: [user?.uid, uid],
      });
    }
  }

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: "getData",
        uid,
      });
    }
  }, [readyState, uid]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      setMessages(data.messages);
      data.user && setUser(data.user);
      data.otherUsers && setOtherUsers(data.otherUsers);
    }
  }, [lastMessage]);

  return (
    <DataContext.Provider
      value={{ addMessage, changeSeen, otherUsers, messages, user, addChat }}>
      <div className="flex h-screen w-100">
        <Profile />
        <MessagePersons selectOtherUser={selectOtherUser} />
        <MainMessage otherUser={otherUser} user={user} />
      </div>
    </DataContext.Provider>
  );
};

export default Home;
