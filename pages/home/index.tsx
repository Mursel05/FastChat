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
  const [otherUser, setOtherUser] = useState<UserType | undefined>();
  const [uid, setUid] = useState<string>("");
  const [messages, setMessages] = useState<MessagesDataType[]>();

  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    share: false,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
  }, [messages]);

  function selectOtherUser(user: UserType | undefined) {
    setOtherUser(user);
  }

  async function addChat(otherUserUid: string, message: string) {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: "addChat",
        persons: [user?.uid, otherUserUid],
        chat: {
          time: "4/16/2024",
          message,
          sender: user?.uid,
        },
        uid: user?.uid,
      });
    }
  }

  function demo() {
    // if (readyState === ReadyState.OPEN) {
    //   sendJsonMessage({
    //     type: "addChat",
    //     persons: [
    //       "2Nrf31AOdQRKtP3nFmV8v9NGnH33",
    //       "IMJxLimlirPwTHnB1tRfJ5VoQNq1",
    //     ],
    //     chat: {
    //       time: "4/16/2024",
    //       message: "aq",
    //       sender: "2Nrf31AOdQRKtP3nFmV8v9NGnH33",
    //     },
    //   });
    // }

    // if (readyState === ReadyState.OPEN) {
    //   sendJsonMessage({
    //     type: "addMessage",
    //     persons: [
    //       "2Nrf31AOdQRKtP3nFmV8v9NGnH33",
    //       "IMJxLimlirPwTHnB1tRfJ5VoQNq1",
    //     ],
    //   });
    // }

    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: "getData",
        uid,
      });
    }

    // if (readyState === ReadyState.OPEN) {
    //   sendJsonMessage({
    //     type: "addUser",
    //     email: "mursal.haxverdiyev@gmail.com",
    //     lastSeen: "02:56",
    //     name: "mursal",
    //     photo:
    //       "https://lh3.googleusercontent.com/a/ACg8ocLjjFuW4EHiq9E0Dm5IssuxHSYipOBzRIR7lIbcyPyn=s96-c",
    //     surname: "haxverdiyev",
    //     uid: "IMJxLimlirPwTHnB1tRfJ5VoQNq1",
    //   });
    // }
  }

  useEffect(() => {
    demo();
  }, [readyState, uid]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      data.user && setUser(data.user);
      setMessages(data.messages);
      console.log(data);
    }
  }, [lastMessage]);

  return (
    <DataContext.Provider value={{ messages, user, addChat }}>
      <div className="flex h-screen">
        <Profile />
        <MessagePersons selectOtherUser={selectOtherUser} />
        <MainMessage otherUser={otherUser} user={user} />
      </div>
    </DataContext.Provider>
  );
};

export default Home;
