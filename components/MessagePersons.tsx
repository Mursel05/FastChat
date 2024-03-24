import MessagePerson from "./MessagePerson";

const MessagePersons = () => {
  return (
    <div className="bg-dark-blue-450 p-2 w-[28%]">
      <p className="text-blue-300 mb-3 mt-2 tracking-[6px]">MESSAGES</p>
      <div className="flex flex-col gap-2">
        <MessagePerson />
        <MessagePerson />
        <MessagePerson />
      </div>
    </div>
  );
};

export default MessagePersons;
