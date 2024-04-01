"use client";
import { db } from "@/config/firebase";
import { DataContextType, DataType } from "@/model";
import "@/styles/globals.css";
import { collection, getDocs } from "firebase/firestore";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const DataContext =
  createContext<DataContextType | null>(null);

export default function App({ Component, pageProps }: AppProps) {
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    const MessagesDataRef = collection(db, "Fastchat");
    const data = await getDocs(MessagesDataRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setData(filteredData);
  };
  useEffect(() => {
    // fetchData();
  }, []);
  console.log(data[0] && data[0]);

  return (
    <DataContext.Provider value={{ data, fetchData }}>
      <Component {...pageProps} />;
    </DataContext.Provider>
  );
}
