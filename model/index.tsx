import exp from "constants";

export type ChatType = {
  id: number;
  message: string;
  person: string;
  time: string;
};
export type MessagesDataType = {
  id: string;
  chat: ChatType[];
  // idPersons: string[];
  // person1: string;
  persons: string[];
};
export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  status: string;
  lastSeen: string;
};
export type DataType = {
  messages: MessagesDataType[];
  users: UserType[];
};
export type DataContextType = {
  data: DataType[];
  fetchData: () => void;
};
