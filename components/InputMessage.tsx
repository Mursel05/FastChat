import { WS_URL } from "@/config/Url";
import { DataContextType, UserType } from "@/model";
import { DataContext } from "@/pages/home";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

type InputMessageProps = {
  goToBottomOfDiv: () => void;
  otherUser: UserType;
};

const InputMessage = ({ goToBottomOfDiv, otherUser }: InputMessageProps) => {
  const { messages, addChat } = useContext(DataContext) as DataContextType;
  const [message, setMessage] = useState("");
  const { lastMessage, sendJsonMessage, readyState } = useWebSocket(WS_URL, {
    share: false,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      console.log(data);
    }
  }, [lastMessage]);

  function handleForm(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    message && addChat(otherUser.uid, message);
    setMessage("");
    setTimeout(() => {
      goToBottomOfDiv();
    }, 100);
  }
  useEffect(() => {
    setTimeout(() => {
      goToBottomOfDiv();
    }, 100);
  }, [messages]);

  return (
    <form
      onSubmit={handleForm}
      className="bg-dark-blue-500 gap-2 p-2 flex items-center absolute bottom-0 w-full">
      <Image
        className="cursor-pointer hover:bg-slate-600 p-1 rounded-xl "
        src="/attachment.png"
        alt="attachment"
        height={45}
        width={45}
      />
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="text-white outline-none w-full bg-dark-blue-500"
        type="text"
        placeholder="Type your Message..."
      />
      <div className="cursor-pointer flex gap-2 items-center">
        <Image
          className="hover:bg-slate-600 p-1 rounded-xl "
          src="/voice.png"
          alt="voice"
          height={45}
          width={45}
        />
        <button>
          <Image
            className="cursor-pointer hover:bg-slate-600 p-1 rounded-xl "
            src="/send.png"
            alt="send"
            height={45}
            width={45}
          />
        </button>
      </div>
    </form>
  );
};

export default InputMessage;
