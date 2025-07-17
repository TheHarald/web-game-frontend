import { makeAutoObservable } from "mobx";
import {
  WebGameEvents,
  WebGameStates,
  type TMessage,
  type TRoom,
  type TUser,
} from "../../types";
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

type TGameState = {
  state: WebGameStates;
  imageConstructor: {
    src: string | undefined;
    hasError: boolean;
  };
  memeConstructor: {
    imageSrc: string;
    memeText: string;
  };
  memes: unknown[];
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

const defautlGameState: TGameState = {
  state: WebGameStates.WaitStart,
  imageConstructor: {
    src: undefined,
    hasError: false,
  },
  memeConstructor: {
    imageSrc: "",
    memeText: "",
  },
  memes: [],
};

const defaultRoomSatet: TRoom = {
  users: [],
  memes: [],
  state: WebGameStates.WaitStart,
  roomCode: "",
};

class GameStore {
  // roomId: string = "";
  currentUser: TUser | undefined = undefined;
  // users: TUser[] = [];
  loginForm = defaultLoginForm;
  chat: TChat = defaultChatSate;
  game: TGameState = defautlGameState;
  room: TRoom = defaultRoomSatet;

  constructor() {
    makeAutoObservable(this);
  }

  // public setUsers(users: TUser[]) {
  //   this.users = users;
  // }

  public setRoom(room: TRoom) {
    this.room = room;
  }

  public setCurrentUser(user: TUser | undefined) {
    this.currentUser = user;
  }

  public leaveRoom() {
    if (this.currentUser === undefined) return;

    socket.emit(WebGameEvents.LeaveRoom, {
      roomCode: this.room.roomCode,
      userId: this.currentUser.id,
    });

    // this.roomId = "";
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

  // public setRoomId(roomId: string) {
  //   this.roomId = roomId;
  // }

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

    this.loginForm = defaultLoginForm;
  }

  public setConstructorImageSrc(src?: string) {
    this.game.imageConstructor.hasError = false;
    this.game.imageConstructor.src = src;
  }

  public setConstructorImageError(hasError: boolean) {
    this.game.imageConstructor.hasError = hasError;
  }

  public setMemeText(text: string) {
    this.game.memeConstructor.memeText = text;
  }

  public sendMessage() {
    if (this.currentUser === undefined || this.chat.yourMessage === "") return;

    socket.emit(WebGameEvents.SendMessage, {
      message: {
        content: this.chat.yourMessage,
        sender: this.currentUser,
      },
      roomCode: this.room.roomCode,
    });

    this.chat.yourMessage = "";
  }

  public startGame() {
    socket.emit(WebGameEvents.StartGame, this.room.roomCode);
  }

  public setGameState(state: WebGameStates) {
    this.game.state = state;
  }

  public reciveMessage(message: TMessage) {
    this.chat.messages.push(message);
  }
}

export const gameStore = new GameStore();
