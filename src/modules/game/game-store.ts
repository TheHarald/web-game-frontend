import { makeAutoObservable } from "mobx";
import { WebGameEvents, type TUser } from "../../types";
import { socket } from "../../socket";

class GameStore {
  roomId: string = "";
  currentUser: TUser | undefined = undefined;
  users: TUser[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public setUsers(users: TUser[]) {
    this.users = users;
  }

  public setRoomId(roomId: string) {
    this.roomId = roomId;
  }

  public setCurrentUser(user: TUser | undefined) {
    this.currentUser = user;
  }

  public leaveRoom() {
    if (this.currentUser === undefined) return;

    socket.emit(WebGameEvents.LeaveRoom, {
      room: {
        code: this.roomId,
      },
      user: {
        name: this.currentUser.name,
        id: this.currentUser.id,
      },
    });

    this.setRoomId("");
    this.setCurrentUser(undefined);
  }
}

export const gameStore = new GameStore();
