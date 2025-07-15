import { useEffect } from "react";
import { WebGameEvents, type TUser } from "../../../types";
import { gameStore } from "../game-store";
import { spawnConfetti } from "../../../utils/utils";
import { socket } from "../../../socket/socket";

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
      spawnConfetti();
    });

    return () => {
      gameStore.leaveRoom();
    };
  }, []);

  return null;
}
