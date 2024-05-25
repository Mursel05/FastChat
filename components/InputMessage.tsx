import { DataContextType, UserType } from "@/model";
import { DataContext } from "@/pages/home";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

type InputMessageProps = {
  otherUser: UserType;
  file: any;
  setFile: any;
  submitBtnRef: React.RefObject<HTMLButtonElement>;
};

const InputMessage = ({
  otherUser,
  file,
  setFile,
  submitBtnRef,
}: InputMessageProps) => {
  const { addChat } = useContext(DataContext) as DataContextType;
  const [message, setMessage] = useState("");

  function toDataURL(
    url: string,
    callback: (dataUrl: string | ArrayBuffer | null) => void
  ) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader: any = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  function handleForm(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (file) {
      toDataURL(URL.createObjectURL(file), (url: any) =>
        file.type.split("/")[0] == "image"
          ? addChat(otherUser.uid, url, "image")
          : file.type.split("/")[0] == "video"
          ? addChat(otherUser.uid, url, "video")
          : addChat(otherUser.uid, url, file.name)
      );
      setFile(null);
    } else {
      if (message.trim()) {
        addChat(otherUser.uid, message.trim(), "text");
        setMessage("");
      }
    }
  }

  return (
    <form
      onSubmit={handleForm}
      className="bg-dark-blue-500 gap-2 p-2 flex items-center absolute bottom-0 w-full">
      <input
        type="file"
        onChange={(e: any) => {
          setFile(e.target.files[0]);
          e.target.value = "";
        }}
        className="hidden"
        id="uploadInput"
      />
      <label htmlFor="uploadInput">
        <Image
          className="cursor-pointer hover:bg-slate-600 p-1 rounded-xl "
          src="/attachment.png"
          alt="attachment"
          height={45}
          width={45}
        />
      </label>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="text-white outline-none w-full bg-dark-blue-500"
        type="text"
        placeholder="Type your Message..."
      />
      <div className="flex gap-2 items-center">
        <label htmlFor="">
          <Image
            className="cursor-pointer hover:bg-slate-600 p-1 rounded-xl "
            src="/voice.png"
            alt="voice"
            height={45}
            width={45}
          />
        </label>
        <button ref={submitBtnRef}>
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
