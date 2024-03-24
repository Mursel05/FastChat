const MessagePerson = () => {
  return (
    <div className="flex items-center gap-3 p-4 bg-dark-blue-400">
      <img src="/demo.png" alt="person" width={70} height={70} />
      <div className="text-white flex flex-col gap-1">
        <p className="text-gray-200">Christoper Campbell</p>
        <span>In front of the bar, about whic...</span>
      </div>
    </div>
  );
};

export default MessagePerson;
