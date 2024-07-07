import TopProfile from "./TopProfile";
import InputMessage from "./InputMessage";
import ChatBox from "./ChatBox";
import { useContext, useEffect, useRef, useState } from "react";
import { DataContextType, MessagesDataType, UserType } from "@/model";
import { DataContext } from "@/pages/home";
import Image from "next/image";

type MainMessageProps = {
  otherUser: UserType | undefined;
  user: UserType | undefined;
  setOtherUser: (user: UserType | undefined) => void;
  settings: boolean;
  setSettings: (settings: boolean) => void;
};

const MainMessage = ({
  otherUser,
  user,
  setOtherUser,
  settings,
  setSettings,
}: MainMessageProps) => {
  const { messages, updateUser } = useContext(DataContext) as DataContextType;
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<MessagesDataType>();
  const [file, setFile] = useState<any>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const [userDetail, setUserDetail] = useState<UserType>();

  useEffect(() => {
    if (user) {
      setUserDetail(user);
    }
  }, [user]);

  const goToBottomOfDiv = () => {
    setTimeout(() => {
      if (chatBoxRef.current) {
        const { scrollHeight, clientHeight } = chatBoxRef.current;
        chatBoxRef.current.scrollTo({
          top: scrollHeight - clientHeight,
        });
      }
    }, 1);
  };

  useEffect(() => {
    setMessage(
      messages?.find((item) => item.persons.includes(otherUser?.uid || ""))
    );
  }, [otherUser, messages]);

  useEffect(() => {
    if (!message) {
      setOtherUser(undefined);
    }
  }, [message]);

  useEffect(() => {
    goToBottomOfDiv();
  }, [otherUser]);

  function toDataURL(url: string, callback: (dataUrl: string) => void) {
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

  if (otherUser)
    return (
      <div className="w-[55%]  relative">
        <TopProfile
          otherUser={otherUser}
          setOtherUser={setOtherUser}
          message={message}
        />
        <ChatBox
          file={file}
          chatBoxRef={chatBoxRef}
          setFile={setFile}
          message={message}
          otherUser={otherUser}
          goToBottomOfDiv={goToBottomOfDiv}
          submitBtnRef={submitBtnRef}
        />
        <InputMessage
          submitBtnRef={submitBtnRef}
          otherUser={otherUser}
          file={file}
          setFile={setFile}
        />
      </div>
    );
  else if (settings)
    return (
      <div className="flex flex-col items-center w-[55%] justify-center gap-10 relative">
        <span className="text-xl">YOUR PROFILE</span>
        <div className="flex flex-col gap-3 items-center">
          <div className="flex items-center gap-3">
            <img
              className="rounded-full"
              src={userDetail?.photo || "/no-profile.jpg"}
              alt="user photo"
              width={100}
              height={100}
            />
            <input
              onChange={(e) => {
                if (e.target.files)
                  toDataURL(URL.createObjectURL(e.target.files[0]), (url) =>
                    setUserDetail({
                      ...userDetail,
                      photo: url,
                    } as UserType)
                  );
              }}
              className="hidden"
              type="file"
              ref={uploadRef}
            />
            <button
              className="px-2 py-1 bg-slate-500 text-gray-100 hover:bg-slate-600 rounded-lg"
              onClick={() => uploadRef.current?.click()}>
              Change photo
            </button>
          </div>
          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>
                  <input
                    onChange={(e) =>
                      setUserDetail({
                        ...userDetail,
                        name: e.target.value,
                      } as UserType)
                    }
                    value={userDetail?.name}
                    className=" outline-none ml-2 mb-1 rounded-md px-2 py-1"
                    type="text"
                  />
                </td>
              </tr>
              <tr>
                <td>Surname:</td>
                <td>
                  <input
                    onChange={(e) =>
                      setUserDetail({
                        ...userDetail,
                        surname: e.target.value,
                      } as UserType)
                    }
                    value={userDetail?.surname}
                    className=" rounded-md ml-2 outline-none px-2 py-1"
                    type="email"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-around w-full">
            <button
              onClick={() => setUserDetail(user)}
              className="bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded-md text-gray-100">
              Reset
            </button>
            <button
              onClick={() => {
                updateUser(userDetail);
                setSettings(false);
              }}
              className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md text-gray-100">
              Save
            </button>
          </div>
        </div>
        <Image
          onClick={() => setSettings(false)}
          className="cursor-pointer absolute top-20 right-20"
          src="/close-icon.png"
          alt="close"
          width={24}
          height={24}
        />
      </div>
    );
  else
    return (
      <div className="w-[55%] grid place-items-center">
        <div className="flex items-center gap-2">
          <Image
            className="h-[35px]"
            alt="logo"
            src="/favicon.png"
            width={40}
            height={40}
          />
          <div>
            <span className="text-blue-950 font-bold tracking-wider text-3xl">
              FAST
            </span>
            <span className="text-blue-500 font-semibold -tracking-normal text-3xl">
              CHAT
            </span>
          </div>
        </div>
      </div>
    );
};

export default MainMessage;
