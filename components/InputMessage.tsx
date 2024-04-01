import { db } from "@/config/firebase";
import { MessagesDataContextType } from "@/model";
import { MessagesDataContext } from "@/pages/_app";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

const InputMessage = ({ user, goToBottomOfDiv }: any) => {
  const [message, setMessage] = useState("");
  const { messagesData, fetchData } = useContext(
    MessagesDataContext
  ) as MessagesDataContextType;

  async function addMessage() {
    try {
      await updateDoc(doc(db, "movies", messagesData[0].id), {
        ...messagesData[0],
        chat: [
          ...messagesData[0].chat,
          {
            id: Date.now(),
            message,
            person: "Mürsəl Haxverdiyev",
            time: "10-10-2024 10:23",
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
    setTimeout(() => {
      fetchData();
    }, 100);
    addMessage();
  }
  useEffect(() => {
    setTimeout(() => {
      goToBottomOfDiv();
    }, 100);
  }, [messagesData]);
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
