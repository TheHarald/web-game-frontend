import { useEffect } from "react";
import { WebGameEvents, type TUser } from "../../../types";
import { gameStore } from "../game-store";
import { spawnConfetti } from "../../../utils/confeti";
import { socket } from "../../../socket/socket";
import { settings } from "../../../settings/settings";

export function SocketEventsHandler() {
  useEffect(() => {
    socket.on(WebGameEvents.UserJoined, ({ users, roomCode }) => {
      console.log(WebGameEvents.UserJoined, { users, roomCode });

      gameStore.setUsers(users);
      gameStore.setRoomId(roomCode);
    });

    socket.on(WebGameEvents.UserLeft, ({ users }: { users: TUser[] }) => {
      console.log(WebGameEvents.UserLeft, { users });
      gameStore.setUsers(users);
    });

    socket.on(WebGameEvents.MyUserJoined, (user) => {
      console.log(WebGameEvents.MyUserJoined, { user });
      gameStore.setCurrentUser(user);
    });

    socket.on(WebGameEvents.RecivePoo, () => {
      for (let i = 0; i < settings.POO_COUNT_AT_TIME; i++) {
        spawnConfetti();
      }
    });

    socket.on(WebGameEvents.ReciveMessage, (message) => {
      gameStore.reciveMessage(message);
    });

    return () => {
      gameStore.leaveRoom();
    };
  }, []);

  return null;
}
