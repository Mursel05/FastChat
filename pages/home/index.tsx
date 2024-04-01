"use client";
import MainMessage from "@/components/MainMessage";
import MessagePersons from "@/components/MessagePersons";
import Profile from "@/components/Profile";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

const Home = () => {
  const [user, setUser] = useState<any>();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    }
  });
  return (
    <div className="flex h-screen">
      <Profile user={user} />
      <MessagePersons />
      <MainMessage user={user} />
    </div>
  );
};

export default Home;
