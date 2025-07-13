import { makeAutoObservable } from "mobx";
import { LoginType } from "./types";
import { socket } from "../../socket";
import { WebGameEvents, type TUser } from "../../types";
import { gameStore } from "../game/game-store";

class LoginStore {
  name: string = "";
  roomId: string = "";
  loginType = LoginType.Join;

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
    this.loginType = type;
  }

  public async joinRoom() {
    const user: TUser = {
      name: this.name,
      id: crypto.randomUUID(),
    };

    socket.emit(WebGameEvents.JoinRoom, {
      room: {
        code: this.roomId,
      },
      user,
    });

    gameStore.setCurrentUser(user);
  }

  public async createRoom() {}
}

export const loginStore = new LoginStore();
