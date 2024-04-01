"use client";
import MainMessage from "@/components/MainMessage";
import MessagePersons from "@/components/MessagePersons";
import Profile from "@/components/Profile";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { DataContextType, UserContextType, UserType } from "@/model";
import { createContext } from "react";
import { DataContext } from "../_app";

export const UserContext = createContext<UserContextType | null>(null);

const Home = () => {
  const { data } = useContext(DataContext) as DataContextType;

  const [user, setUser] = useState<any>();
  const [otherUser, setOtherUser] = useState<UserType | undefined>();
  const [uid, setUid] = useState<string>("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
    setUser(data?.users.find((user: UserType) => user.uid === uid));
  }, [data]);

  function selectOtherUser(user: UserType | undefined) {
    setOtherUser(user);
  }

  return (
    <UserContext.Provider value={{ user }}>
      <div className="flex h-screen">
        <Profile />
        <MessagePersons selectOtherUser={selectOtherUser} />
        <MainMessage otherUser={otherUser} />
      </div>
    </UserContext.Provider>
  );
};

export default Home;
