"use client";
import MainMessage from "@/components/MainMessage";
import MessagePersons from "@/components/MessagePersons";
import Profile from "@/components/Profile";
import { auth, db } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  DataContextType,
  MessagesDataType,
  UserContextType,
  UserType,
} from "@/model";
import { createContext } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export const UserContext = createContext<UserContextType | null>(null);
export const DataContext = createContext<DataContextType | null>(null);

const Home = () => {
  const [user, setUser] = useState<any>();
  const [otherUser, setOtherUser] = useState<UserType | undefined>();
  const [uid, setUid] = useState<string>("");
  const [data, setData] = useState<any>();
  const [refresh, setRefresh] = useState<boolean>(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        localStorage.setItem("uid", user.uid);
      }
    });
    setUser(data?.users.find((user: UserType) => user.uid === uid));
  }, [data]);

  function selectOtherUser(user: UserType | undefined) {
    setOtherUser(user);
  }
  //!
  const WS_URL = "ws://127.0.0.1:8080";
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    share: false,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: "addMessage",
        persons: [
          "2Nrf31AOdQRKtP3nFmV8v9NGnH33",
          "IMJxLimlirPwTHnB1tRfJ5VoQNq1",
        ],
        chat: {
          time: "4/16/2024",
          message: "salama",
          sender: "2Nrf31AOdQRKtP3nFmV8v9NGnH33",
        },
      });
    }
  }, [readyState]);

  useEffect(() => {
    if (lastMessage !== null) {
      console.log(lastMessage.data);
    }
  }, [lastMessage]);
  //!
  return (
    <DataContext.Provider value={{ data }}>
      <UserContext.Provider value={{ user }}>
        <div className="flex h-screen">
          <Profile />
          <MessagePersons selectOtherUser={selectOtherUser} />
          <MainMessage otherUser={otherUser} />
        </div>
      </UserContext.Provider>
    </DataContext.Provider>
  );
};

export default Home;
