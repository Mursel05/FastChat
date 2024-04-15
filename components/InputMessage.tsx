import { db } from "@/config/firebase";
import { DataContextType, UserType } from "@/model";
import { DataContext } from "@/pages/home";
import { doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

type InputMessageProps = {
  user: UserType;
  goToBottomOfDiv: () => void;
  otherUser: UserType;
};

const InputMessage = ({
  user,
  goToBottomOfDiv,
  otherUser,
}: InputMessageProps) => {
  const [message, setMessage] = useState("");
  const { data } = useContext(DataContext) as DataContextType;

  async function addMessage() {
    try {
      await updateDoc(doc(db, "Fastchat", data.id), {
        ...data,
        messages: [
          {
            ...data.messages[0],
            chat: [
              ...data.messages[0].chat,
              {
                time: "10-10-2024 11:23",
                message,
                personUid: user.uid,
                id: Date.now(),
              },
            ],
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleForm(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    addMessage();
    setTimeout(() => {
      goToBottomOfDiv();
    }, 100);
  }
  useEffect(() => {
    setTimeout(() => {
      goToBottomOfDiv();
    }, 100);
  }, [data]);

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
