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

  if (user)
    return (
      <div
        onClick={() => selectOtherUser(user)}
        className="cursor-pointer flex items-center gap-3 p-4 bg-dark-blue-400">
        <img
          src={user?.photo}
          className="rounded-full"
          alt="person"
          width={70}
          height={70}
        />
        <div className="text-white flex flex-col gap-1">
          <p className="text-gray-200">{user.name + " " + user.surname}</p>
          <span>In front of the bar, about whic...</span>
        </div>
      </div>
    );
};

export default MessagePerson;
