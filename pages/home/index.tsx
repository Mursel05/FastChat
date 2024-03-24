import MainMessage from "@/components/MainMessage";
import Messages from "@/components/Messages";
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
    <div className="flex h-[100vh]">
      <Profile user={user} />
      <Messages />
      <MainMessage />
    </div>
  );
};

export default Home;
