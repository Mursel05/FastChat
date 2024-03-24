const chats = {
  person1: "chris",
  person2: "nick",
  chat: [
    {
      person: "chris",
      message: "Hey How are you?",
      time: "10:00",
    },
    {
      person: "chris",
      message:
        "I was asking for your New Year Plans, ask we are going to host a party.  ask we are going to host a party.",
      time: "10:00",
    },
    {
      person: "nick",
      message: "I am good, How about you?",
      time: "10:05",
    },
    // {
    //   person: "chris",
    //   message: "Great! Let’s meet in the party!",
    //   time: "10:07",
    // },
    // {
    //   person: "nick",
    //   message: "I am good, How about you?",
    //   time: "10:05",
    // },
    // {
    //   person: "chris",
    //   message: "Great! Let’s meet in the party!",
    //   time: "10:07",
    // },
    {
      person: "nick",
      message: "I am good, How about you?",
      time: "10:05",
    },
    {
      person: "chris",
      message: "Great! Let’s meet in the party!",
      time: "10:07",
    },
    {
      person: "nick",
      message: "I am good, How about you?",
      time: "10:05",
    },
    // {
    //   person: "chris",
    //   message: "Great! Let’s meet in the party!",
    //   time: "10:07",
    // },
    // {
    //   person: "nick",
    //   message: "Sure! I will be there.",
    //   time: "10:10",
    // },
    // {
    //   person: "nick",
    //   message: "Sure! I will be there.",
    //   time: "10:10",
    // },
    // {
    //   person: "chris",
    //   message: "Great! Let’s meet in the party!",
    //   time: "10:07",
    // },
    // {
    //   person: "nick",
    //   message: "Sure! I will be there.",
    // },
  ],
};
const ChatBox = () => {
  return (
    <div className="pb-4 bg-dark-blue-400 px-7 flex flex-col overflow-y-scroll gap-2 h-">
      {chats.chat.map((item, index) =>
        item.person === "chris" ? (
          <div className="flex items-center self-start gap-5">
            <img width={50} height={50} src="/demo.png" alt="demo" />
            <div
              className={`max-w-md text-white  bg-text-blue-300 p-3 ${
                chats.chat[index + 1].person == "chris" ? "rounded-s-none" : ""
              } rounded-xl rounded-ss-none`}>
              <span>{item.message}</span>
            </div>
          </div>
        ) : (
          <div
            className={`max-w-md text-white self-end bg-dark-blue-500  p-3 ${
              chats.chat[index - 1] && chats.chat[index - 1].person != "chris"
                ? "rounded-e-none"
                : ""
            } rounded-xl rounded-ee-none`}>
            <span>{item.message}</span>
          </div>
        )
      )}
    </div>
  );
};

export default ChatBox;
