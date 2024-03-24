import TopProfile from "./TopProfile";
import InputMessage from "./InputMessage";
import ChatBox from "./ChatBox";

const MainMessage = () => {
  return (
    <div className="w-[55%]  relative">
      <TopProfile />
      <ChatBox />
      {/* <InputMessage /> */}
    </div>
  );
};

export default MainMessage;
