export type ChatType = {
  id: number;
  message: string;
  personUid: string;
  time: string;
};
export type MessagesDataType = {
  id: string;
  chat: ChatType[];
  persons: string[];
};
export type UserType = {
  uid: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  photo: string;
  lastSeen: string;
};
export type DataType = {
  messages: MessagesDataType[];
  users: UserType[];
  id: string;
};
export type DataContextType = {
  data: DataType;
};

export type UserContextType = {
  user: UserType;
};
