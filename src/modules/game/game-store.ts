import { makeAutoObservable } from "mobx";
import { WebGameEvents, type TUser } from "../../types";
import { socket } from "../../socket/socket";
import { LoginType } from "./types";

type TLoginForm = {
  name: string;
  roomId: string;
  loginType: LoginType;
};

const defaultLoginForm: TLoginForm = {
  name: "",
  roomId: "",
  loginType: LoginType.Join,
};

class GameStore {
  roomId: string = "";
  currentUser: TUser | undefined = undefined;
  users: TUser[] = [];

  loginForm = defaultLoginForm;

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
}

export const gameStore = new GameStore();
