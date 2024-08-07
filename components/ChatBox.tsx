"use client";
import { ChatType, DataContextType, MessagesDataType, UserType } from "@/model";
import { DataContext } from "@/pages/home";
import { useContext, useEffect, useRef, useState } from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import FileSaver from "file-saver";

const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

interface OtherUserChatProps {
  chatBoxRef: React.RefObject<HTMLDivElement>;
  item: ChatType;
  index: number;
  otherUser: UserType;
  message: MessagesDataType;
}

const messageShow = (item: ChatType) => {
  return (
    <>
      {item.chatType == "text" ? (
        <span className="break-all">{item.message}</span>
      ) : item.chatType == "video" ? (
        <video controls src={item.message}></video>
      ) : item.chatType == "image" ? (
        <img alt="img" src={item.message} />
      ) : item.chatType == "audio" ? (
        <audio controls src={item.message}></audio>
      ) : (
        <div className="w-[150px] text-center flex flex-col gap-2">
          <FileIcon
            {...defaultStyles[
              item.chatType.split(".")[
                item.chatType.split(".").length - 1
              ] as keyof typeof defaultStyles
            ]}
          />
          <span className="break-all">{item.chatType}</span>
        </div>
      )}
    </>
  );
};

const OtherUserChat = ({
  item,
  index,
  otherUser,
  chatBoxRef,
  message,
}: OtherUserChatProps) => {
  const seenRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const wasInView = usePrevious(isInView);
  const { changeSeen } = useContext(DataContext) as DataContextType;

  const checkInView = () => {
    const ele: any = seenRef.current;
    if (!ele) {
      return;
    }
    const rect = ele.getBoundingClientRect();
    setIsInView(rect.top < window.innerHeight - 50);
  };

  useEffect(() => {
    checkInView();
  }, []);

  useEffect(() => {
    chatBoxRef.current?.addEventListener("scroll", checkInView);
    chatBoxRef.current?.addEventListener("resize", checkInView);
    return () => {
      chatBoxRef.current?.removeEventListener("scroll", checkInView);
      chatBoxRef.current?.removeEventListener("resize", checkInView);
    };
  }, []);

  useEffect(() => {
    const ele = seenRef.current;
    if (!ele) {
      return;
    }
    if (!wasInView && isInView && !item.seen) {
      changeSeen(otherUser.uid);
    }
  }, [isInView]);

  useEffect(() => {
    if (!item.seen) {
      seenRef.current?.scrollIntoView(true);
    }
  }, [item.seen]);

  return (
    <div ref={seenRef} className="flex items-center self-start gap-5">
      <img
        className="rounded-full"
        width={50}
        height={50}
        src={otherUser.photo}
        onError={(e) => (e.currentTarget.src = "/no-profile.jpg")}
        alt="user-profile-pic"
      />
      <div className="flex flex-col gap-1">
        <div
          className={`max-w-md flex justify-center text-white bg-text-blue-300 p-3 rounded-xl ${
            message.chats.toReversed()[index - 1]?.sender == otherUser.uid
              ? "rounded-s-none"
              : ""
          } rounded-ss-none ${
            item.chatType !== "text" &&
            item.chatType !== "video" &&
            item.chatType !== "audio" &&
            "rounded-b-none"
          }`}>
          {messageShow(item)}
        </div>
        {item.chatType !== "text" &&
          item.chatType !== "video" &&
          item.chatType !== "audio" && (
            <button
              onClick={() => FileSaver.saveAs(item.message, item.chatType)}
              className="bg-dark-blue-500 text-white py-2 w-full rounded-b-xl px-2">
              Download
            </button>
          )}
      </div>
      <span className="text-gray-400 text-sm">{item.time.slice(12)}</span>
    </div>
  );
};

type ChatBoxProps = {
  chatBoxRef: React.RefObject<HTMLDivElement>;
  message: MessagesDataType | undefined;
  otherUser: UserType;
  file: any;
  setFile: any;
  goToBottomOfDiv: () => void;
  submitBtnRef: React.RefObject<HTMLButtonElement>;
};

const ChatBox = ({
  chatBoxRef,
  message,
  otherUser,
  file,
  setFile,
  goToBottomOfDiv,
  submitBtnRef,
}: ChatBoxProps) => {
  const { user } = useContext(DataContext) as DataContextType;

  useEffect(() => {
    goToBottomOfDiv();
  }, [message]);

  return (
    <div
      ref={chatBoxRef}
      className="py-4 bg-dark-blue-400 px-5 flex flex-col-reverse overflow-y-auto gap-2 scroll-design message-height relative">
      {message?.chats.toReversed().map((item, index) => {
        return item.sender != user?.uid ? (
          <OtherUserChat
            chatBoxRef={chatBoxRef}
            key={item._id}
            item={item}
            index={index}
            otherUser={otherUser}
            message={message}
          />
        ) : (
          <div key={item._id} className="self-end flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">
                {item.time.slice(12)}
              </span>
              <div className="flex flex-col gap-1">
                <div
                  key={index}
                  className={`max-w-md flex justify-center text-white bg-dark-blue-500 p-3 ${
                    message.chats.toReversed()[index + 1]?.sender == user.uid
                      ? "rounded-e-none"
                      : ""
                  } rounded-xl rounded-ee-none ${
                    item.chatType !== "text" &&
                    item.chatType !== "video" &&
                    item.chatType !== "audio" &&
                    "rounded-es-none"
                  }`}>
                  {messageShow(item)}
                </div>
                {item.chatType !== "text" &&
                  item.chatType !== "video" &&
                  item.chatType !== "audio" && (
                    <button
                      onClick={() =>
                        FileSaver.saveAs(item.message, item.chatType)
                      }
                      className="bg-text-blue-300 text-white py-2 w-full rounded-b-xl px-2">
                      Download
                    </button>
                  )}
              </div>
            </div>
            <span
              className={`${
                item.seen &&
                !message.chats.toReversed()[index - 1] &&
                message.chats.toReversed()[index].sender == user.uid
                  ? ""
                  : "hidden"
              } self-end text-gray-400 text-xs pr-1`}>
              Seen
            </span>
          </div>
        );
      })}

      {file && (
        <div className="absolute self-center flex flex-col items-center gap-4 bg-white mb-[-16px] p-3 w-2/3">
          <div className="flex w-full justify-between">
            <button
              onClick={() => setFile(null)}
              className="mr-3 hover:bg-slate-500 px-3 py-2 rounded-lg text-white bg-slate-400">
              Discard
            </button>
            <button
              onClick={() => submitBtnRef.current?.click()}
              className="smr-3 hover:bg-blue-600 px-3 py-2 rounded-lg text-white bg-text-blue-300">
              Send
            </button>
          </div>
          {file.type.includes("image") ? (
            <img src={URL.createObjectURL(file)} alt={file.name} />
          ) : file.type.includes("video") ? (
            <video controls src={URL.createObjectURL(file)}></video>
          ) : file.type.includes("audio") ? (
            <audio controls src={URL.createObjectURL(file)}></audio>
          ) : (
            <div className="w-[150px] text-center">
              <FileIcon
                {...defaultStyles[
                  file.name.split(".")[
                    file.name.split(".").length - 1
                  ] as keyof typeof defaultStyles
                ]}
              />
              <span className="break-all">{file.name}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBox;
