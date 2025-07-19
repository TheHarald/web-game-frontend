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
  imageConstructor: {
    src: string | undefined;
    hasError: boolean;
  };
  memeConstructor: {
    imageSrc: string;
    memeText: string;
  };
};

type TImageModal = {
  src: string | undefined;
  open: boolean;
};

const defaultImageModalState: TImageModal = {
  src: undefined,
  open: false,
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
  imageConstructor: {
    src: undefined,
    hasError: false,
  },
  memeConstructor: {
    imageSrc: "",
    memeText: "",
  },
};

const defaultRoomSatet: TRoom = {
  users: [],
  memes: [],
  state: WebGameStates.WaitStart,
  roomCode: "",
};

class GameStore {
  currentUser: TUser | undefined = undefined;
  loginForm = defaultLoginForm;
  chat: TChat = defaultChatSate;
  game: TGameState = defautlGameState;
  room: TRoom = defaultRoomSatet;
  imageModal: TImageModal = defaultImageModalState;

  constructor() {
    makeAutoObservable(this);
  }

  get isIAmdin() {
    return this.currentUser?.isAdmin ?? false;
  }

  public setRoom(room: TRoom) {
    if (room.state === WebGameStates.WatchMeme) {
      this.imageModal = defaultImageModalState;
      this.game = defautlGameState;
    }

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

    this.currentUser = undefined;
  }

  public setFormName(name: string) {
    this.loginForm.name = name;
  }

  public setImageModalOpen(open: boolean) {
    this.imageModal.open = open;
  }

  public setImageModalSrc(src?: string) {
    this.imageModal.src = src;
  }

  public setFormLoginType(type: LoginType) {
    this.loginForm.loginType = type;
  }

  public setFormRoomId(roomId: string) {
    this.loginForm.roomId = roomId;
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

    this.loginForm = defaultLoginForm;
  }

  public setConstructorImageSrc() {
    this.game.imageConstructor.hasError = false;
    this.game.imageConstructor.src = this.imageModal.src;
    this.imageModal.src = "";
    this.imageModal.open = false;
  }

  public resetConstructorImage() {
    this.game.imageConstructor = {
      src: undefined,
      hasError: false,
    };
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

  public finishImageCreate() {
    const myMeme = this.room.memes.find(
      (meme) => meme.authorId === this.currentUser?.id
    );

    if (myMeme === undefined) return;

    socket.emit(WebGameEvents.CreateImage, {
      roomCode: this.room.roomCode,
      meme: {
        ...myMeme,
        src: this.game.imageConstructor.src,
      },
    });
  }

  public funishMemeCreate() {
    const myMeme = this.room.memes.find(
      (meme) => meme.forUserId === this.currentUser?.id
    );

    if (myMeme === undefined) return;

    socket.emit(WebGameEvents.CreateMeme, {
      roomCode: this.room.roomCode,
      meme: {
        ...myMeme,
        text: this.game.memeConstructor.memeText,
      },
    });
  }

  public startGame() {
    socket.emit(WebGameEvents.ChangeGameState, {
      roomCode: this.room.roomCode,
      state: WebGameStates.CreatingImage,
    });
  }

  public goToMemeCreation() {
    socket.emit(WebGameEvents.ChangeGameState, {
      roomCode: this.room.roomCode,
      state: WebGameStates.CreatingMeme,
    });
  }

  public goToMemeResults() {
    socket.emit(WebGameEvents.ChangeGameState, {
      roomCode: this.room.roomCode,
      state: WebGameStates.WatchMeme,
    });
  }

  public reciveMessage(message: TMessage) {
    this.chat.messages.push(message);
  }

  public restartGame() {
    socket.emit(WebGameEvents.RestartGame, {
      roomCode: this.room.roomCode,
    });
  }

  public reset() {
    this.room = defaultRoomSatet;
    this.currentUser = undefined;
    this.loginForm = defaultLoginForm;
    this.chat = defaultChatSate;
    this.game = defautlGameState;
    this.room = defaultRoomSatet;
    this.imageModal = defaultImageModalState;
  }
}

export const gameStore = new GameStore();
