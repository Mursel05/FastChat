"use client";
import MainMessage from "@/components/MainMessage";
import MessagePersons from "@/components/MessagePersons";
import Profile from "@/components/Profile";
import { auth } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { WS_URL } from "@/config/Url";
import { DataContextType, MessagesDataType, UserType } from "@/model";
import { createContext } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useRouter } from "next/router";

export const DataContext = createContext<DataContextType | null>(null);

const Home = () => {
  const [user, setUser] = useState<UserType>();
  const [uid, setUid] = useState<string>();
  const [otherUser, setOtherUser] = useState<UserType | undefined>();
  const [otherUsers, setOtherUsers] = useState<UserType[] | undefined>();
  const [messages, setMessages] = useState<MessagesDataType[]>();
  const [error, setError] = useState<string>("");
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    share: false,
    shouldReconnect: () => true,
  });
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUid(user.uid);
      else router.push("/signup");
    });
  }, []);

  function selectOtherUser(user: UserType | undefined) {
    setOtherUser(user);
  }

  async function addChat(
    otherUserUid: string,
    message: string,
    chatType: string
  ): Promise<void> {
    if (readyState === ReadyState.OPEN) {
      const d = new Date();
      sendJsonMessage({
        type: "addChat",
        persons: [uid, otherUserUid],
        chat: {
          time: d.toString().slice(4, 21),
          message,
          sender: uid,
          seen: false,
          chatType,
        },
        uid,
      });
    }
  }

  async function changeSeen(otherUserUid: string): Promise<void> {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: "changeSeen",
        persons: [uid, otherUserUid],
        otherUserUid,
        uid,
      });
    }
  }

  async function deleteMessage(
    messageId: string | undefined,
    otherUserUid: string | undefined
  ): Promise<void> {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: "deleteMessage",
        messageId,
        uid,
        persons: [uid, otherUserUid],
      });
    }
  }

  async function addMessage(otherUserUid: string): Promise<void> {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: "addMessage",
        uid,
        persons: [uid, otherUserUid],
      });
    }
  }

  async function signOutUser() {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: "getData",
        uid: uid,
      });
    }
  }, [readyState, uid]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      setMessages(data.messages);
      data.user && setUser(data.user);
      data.otherUsers && setOtherUsers(data.otherUsers);
      data.error && setError(data.error);
    }
  }, [lastMessage]);

  return (
    <DataContext.Provider
      value={{
        addMessage,
        changeSeen,
        otherUsers,
        messages,
        user,
        addChat,
        deleteMessage,
        signOutUser,
      }}>
      <div className="flex h-screen w-100">
        <Profile />
        <MessagePersons selectOtherUser={selectOtherUser} />
        <MainMessage
          otherUser={otherUser}
          user={user}
          setOtherUser={setOtherUser}
        />
        <div className={`${error ? "w-full h-full bg-black opacity-50 absolute grid place-items-center" : "hidden"}`}>
          <div className={`${error ? "" : "hidden"}`}>
            <span>{error}</span>
          </div>
        </div>
      </div>
    </DataContext.Provider>
  );
};

export default Home;
