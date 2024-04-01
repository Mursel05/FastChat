"use client";
import { db } from "@/config/firebase";
import { DataContextType, DataType } from "@/model";
import "@/styles/globals.css";
import { collection, getDocs } from "firebase/firestore";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const DataContext = createContext<DataContextType | null>(null);

export default function App({ Component, pageProps }: AppProps) {
  const [data, setData] = useState<any>();

  const fetchData = async () => {
    const MessagesDataRef = collection(db, "Fastchat");
    const data = await getDocs(MessagesDataRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setData(filteredData[0]);
  };
  
  setInterval(() => {
    fetchData();
  }, 1000);
  
  return (
    <DataContext.Provider value={{ data }}>
      <Component {...pageProps} />;
    </DataContext.Provider>
  );
}


// async function addMessage() {
//   try {
//     await updateDoc(doc(db, "Fastchat", data.id), {
//       ...data,
//       users: [
//         ...data.users,
//         {
//           surname: "haxverdiyev",
//           email: "mursal.haxverdiyev@gmail.com",
//           lastSeen: "02:56",
//           name: "mursal",
//           photo:
//             "https://lh3.googleusercontent.com/a/ACg8ocLjjFuW4EHiq9E0Dm5IssuxHSYipOBzRIR7lIbcyPyn=s96-c",
//           uid: "IMJxLimlirPwTHnB1tRfJ5VoQNq1",
//         },
//       ],
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }