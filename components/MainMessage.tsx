import TopProfile from "./TopProfile";
import InputMessage from "./InputMessage";
import ChatBox from "./ChatBox";
import { useRef } from "react";

const MainMessage = ({ user }: any) => {
  console.log(user);

  const divRef = useRef<HTMLDivElement>(null);
  const goToBottomOfDiv = () => {
    if (divRef.current) {
      const { scrollHeight, clientHeight } = divRef.current;
      divRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="w-[55%]  relative">
      <TopProfile user={user} />
      <ChatBox user={user} divRef={divRef} />
      <InputMessage user={user} goToBottomOfDiv={goToBottomOfDiv} />
    </div>
  );
};

export default MainMessage;
