import { makeAutoObservable } from "mobx";
import { LoginType } from "./types";

class LoginStore {
  name: string = "";
  roomId: string = "";
  loginType = LoginType.Create;

  constructor() {
    makeAutoObservable(this);
  }

  public setName(name: string) {
    this.name = name;
  }

  public setRoomId(roomId: string) {
    this.roomId = roomId;
  }

  public setLoginType(type: LoginType) {
    this.loginType = type
  }

  public async joinRoom() {}

  public async createRoom() {}
}

export const loginStore = new LoginStore();
