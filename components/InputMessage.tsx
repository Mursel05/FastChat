import { DataContextType, UserType } from "@/model";
import { DataContext } from "@/pages/home";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

type InputMessageProps = {
  goToBottomOfDiv: () => void;
  otherUser: UserType;
};

const InputMessage = ({ goToBottomOfDiv, otherUser }: InputMessageProps) => {
  const { messages, addChat } = useContext(DataContext) as DataContextType;
  const [message, setMessage] = useState("");

  function handleForm(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    message && addChat(otherUser.uid, message);
    setMessage("");
    
  }
  // useEffect(() => {
  //   setTimeout(() => {
  //     goToBottomOfDiv();
  //   }, 100);
  // }, [messages]);

  return (
    <form
      onSubmit={handleForm}
      className="bg-dark-blue-500 gap-2 p-2 flex items-center absolute bottom-0 w-full">
      <button>
        <Image
          className="cursor-pointer hover:bg-slate-600 p-1 rounded-xl "
          src="/attachment.png"
          alt="attachment"
          height={45}
          width={45}
        />
      </button>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="text-white outline-none w-full bg-dark-blue-500"
        type="text"
        placeholder="Type your Message..."
      />
      <div className="flex gap-2 items-center">
        <button>
          <Image
            className="cursor-pointer hover:bg-slate-600 p-1 rounded-xl "
            src="/voice.png"
            alt="voice"
            height={45}
            width={45}
          />
        </button>
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
