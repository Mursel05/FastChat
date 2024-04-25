export type ChatType = {
  _id: number;
  message: string;
  sender: string;
  time: string;
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
};
