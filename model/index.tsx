export type ChatType = {
  _id: string;
  message: string;
  sender: string;
  time: string;
  seen: boolean;
};
export type MessagesDataType = {
  _id: string;
  chats: ChatType[];
  persons: string[];
};
export type UserType = {
  _id: string;
  uid: string;
  name: string;
  surname: string;
  email: string;
  photo: string;
  lastSeen: string;
};
export type DataContextType = {
  messages: MessagesDataType[] | undefined;
  user: UserType | undefined;
  addChat: (otherUserUid: string, message: string) => void;
  addMessage: (uid: string) => void;
  otherUsers: UserType[] | undefined;
  changeSeen: (otherUserUid: string) => void;
};
