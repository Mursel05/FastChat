import { MessagesDataType, UserType } from "@/model";

type MessagePersonProps = {
  message: MessagesDataType | undefined;
  user: UserType | undefined;
  selectOtherUser: (user: UserType | undefined) => void;
};
const MessagePerson = ({
  message,
  user,
  selectOtherUser,
}: MessagePersonProps) => {
  if (user) {
    const unSeenChats = message?.chats.filter(
      (chat) => chat.sender == user?.uid && !chat.seen
    ).length;
    return (
      <div
        onClick={() => selectOtherUser(user)}
        className="cursor-pointer flex items-center gap-3 p-4 bg-dark-blue-400">
        <img
          src={user?.photo}
          onError={(e) => (e.currentTarget.src = "/no-profile.jpg")}
          className="rounded-full"
          alt="person"
          width={70}
          height={70}
        />
        <div className="text-white flex flex-col gap-1 w-[calc(100%-80px)]">
          <p className="text-gray-200 last-three-dots">
            {user.name + " " + user.surname}
          </p>
          <div className="text-white flex items-center justify-between gap-1 w-[calc(100%-5px)]">
            <span className="last-three-dots">
              {message?.chats.slice(-1)[0]?.chatType == "text"
                ? message?.chats.slice(-1)[0]?.message
                : message?.chats.slice(-1)[0]?.chatType}
            </span>
            {unSeenChats ? (
              <span className="flex items-center justify-center rounded-full bg-green-900 p-3 w-2 h-2 text-sm">
                {unSeenChats}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default MessagePerson;
