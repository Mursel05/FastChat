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
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

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

  const fetchData = async () => {
    const MessagesDataRef = collection(db, "Fastchat");
    const dt = await getDocs(MessagesDataRef);
    const filteredData: any = dt.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const id: any = localStorage.getItem("uid");
    const NewData = filteredData[0]?.messages.filter(
      (message: MessagesDataType) => message.persons.includes(id)
    );
    if (NewData[0].change || refresh) {
      setData(filteredData[0]);
      setRefresh(false);
      console.log(refresh);
    }
    await updateDoc(doc(db, "Fastchat", "PYLbhhrvT3TatitYKg1J"), {
      ...filteredData[0],
      messages: [
        {
          ...filteredData[0].messages[0],
          change: false,
        },
      ],
    });
  };
  setInterval(() => {
    // fetchData();
  }, 7000);

  useEffect(() => {
    fetchData();
  }, []);

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
