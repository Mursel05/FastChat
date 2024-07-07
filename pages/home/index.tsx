"use client";
import MainMessage from "@/components/MainMessage";
import MessagePersons from "@/components/MessagePersons";
import Profile from "@/components/Profile";
import { auth } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { DataContextType, MessagesDataType, UserType } from "@/model";
import { createContext } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useRouter } from "next/router";
import Image from "next/image";

const WS_URL: any = process.env.NEXT_PUBLIC_WS_URL;
export const DataContext = createContext<DataContextType | null>(null);

const Home = () => {
  const [user, setUser] = useState<UserType>();
  const [uid, setUid] = useState<string>();
  const [otherUser, setOtherUser] = useState<UserType | undefined>();
  const [settings, setSettings] = useState<boolean>(false);
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

  useEffect(() => {
    if (otherUser) {
      setSettings(false);
    }
  }, [otherUser]);

  useEffect(() => {
    if (settings) {
      setOtherUser(undefined);
    }
  }, [settings]);

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

  async function updateUser(userDetail: UserType | undefined): Promise<void> {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: "updateUser",
        uid,
        user: userDetail,
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
    if (readyState === ReadyState.OPEN && uid) {
      sendJsonMessage({
        type: "getData",
        uid: uid,
      });
    }
  }, [readyState, uid]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      data.messages && setMessages(data.messages);
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
        updateUser,
      }}>
      <div className="flex h-screen w-100">
        <Profile setSettings={setSettings} />
        <MessagePersons selectOtherUser={selectOtherUser} />
        <MainMessage
          otherUser={otherUser}
          user={user}
          setOtherUser={setOtherUser}
          settings={settings}
          setSettings={setSettings}
        />
      </div>
      {error && (
        <>
          <div className="w-full h-full bg-black opacity-50 absolute top-0 left-0"></div>
          <div className="absolute top-0 left-0 grid place-items-center w-full h-full">
            <div className="bg-white flex flex-col pt-3 pr-3 rounded-md">
              <Image
                onClick={() => setError("")}
                src={"/close-icon.png"}
                alt="error"
                width={24}
                height={24}
                className="self-end cursor-pointer"
              />
              <div className="flex items-center gap-2 p-8 pt-5">
                <Image
                  src={"/error-icon.png"}
                  alt="error"
                  width={35}
                  height={35}
                />
                <span>{error}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </DataContext.Provider>
  );
};

export default Home;
