import { makeAutoObservable } from "mobx";
import { WebGameEvents, type TMessage, type TUser } from "../../types";
import { socket } from "../../socket/socket";
import { LoginType } from "./types";

type TLoginForm = {
  name: string;
  roomId: string;
  loginType: LoginType;
};

type TChat = {
  messages: TMessage[];
  yourMessage: string;
};

const defaultLoginForm: TLoginForm = {
  name: "",
  roomId: "",
  loginType: LoginType.Join,
};

const defaultChatSate: TChat = {
  messages: [],
  yourMessage: "",
};

class GameStore {
  roomId: string = "";
  currentUser: TUser | undefined = undefined;
  users: TUser[] = [];
  loginForm = defaultLoginForm;
  chat: TChat = defaultChatSate;

  constructor() {
    makeAutoObservable(this);
  }

  public setUsers(users: TUser[]) {
    this.users = users;
  }

  public setCurrentUser(user: TUser | undefined) {
    this.currentUser = user;
  }

  public leaveRoom() {
    if (this.currentUser === undefined) return;

    socket.emit(WebGameEvents.LeaveRoom, {
      roomCode: this.roomId,
      userId: this.currentUser.id,
    });

    this.roomId = "";
    this.currentUser = undefined;
  }

  public setFormName(name: string) {
    this.loginForm.name = name;
  }

  public setFormLoginType(type: LoginType) {
    this.loginForm.loginType = type;
  }

  public setFormRoomId(roomId: string) {
    this.loginForm.roomId = roomId;
  }

  public setRoomId(roomId: string) {
    this.roomId = roomId;
  }

  public setYourMessage(message: string) {
    this.chat.yourMessage = message;
  }

  public joinRoom() {
    socket.emit(WebGameEvents.JoinRoom, {
      roomCode: this.loginForm.roomId,
      userName: this.loginForm.name,
    });

    this.loginForm = defaultLoginForm;
  }

  public sendPoo(userId: string) {
    socket.emit(WebGameEvents.SendPoo, userId);
  }

  public createRoom() {
    socket.emit(WebGameEvents.CreateRoom, this.loginForm.name);
  }

  public sendMessage() {
    if (this.currentUser === undefined || this.chat.yourMessage === "") return;

    socket.emit(WebGameEvents.SendMessage, {
      message: {
        content: this.chat.yourMessage,
        sender: this.currentUser,
      },
      roomCode: this.roomId,
    });

    this.chat.yourMessage = "";
  }

  public reciveMessage(message: TMessage) {
    this.chat.messages.push(message);
  }
}

export const gameStore = new GameStore();
