export enum WebGameEvents {
  Disconnect = "disconnect",
  Connection = "connection",
  SendMessage = "send-message",
  JoinRoom = "join-room",
  ReciveMessage = "recive-message",
  LeaveRoom = "leave-room",
  UserLeft = "user-left",
  UserJoined = "user-joined",
}

export type TRoom = {
  code: string;
};

export type TUser = {
  id: string;
  name: string;
};

export type TMessage = {
  content: string;
};

export type TJoinRoomParams = {
  room: TRoom;
  user: TUser;
};

export type TLeaveRoomParams = {
  room: TRoom;
  user: TUser;
};

export type TUserJoinedParams = {
  room: TRoom;
  user: TUser;
};
