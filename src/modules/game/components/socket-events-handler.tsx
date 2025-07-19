import { useEffect } from "react";
import { WebGameEvents } from "../../../types";
import { gameStore } from "../game-store";
import { spawnConfetti } from "../../../utils/confeti";
import { socket } from "../../../socket/socket";
import { settings } from "../../../settings/settings";

export function SocketEventsHandler() {
  useEffect(() => {
    socket.on(WebGameEvents.UserJoined, (room) => {
      console.log(WebGameEvents.UserJoined, room);

      gameStore.setRoom(room);
    });

    socket.on(WebGameEvents.UserLeft, (room) => {
      console.log(WebGameEvents.UserLeft, room);
      gameStore.setRoom(room);
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

    socket.on(WebGameEvents.GameStateChanged, (room) => {
      console.log(WebGameEvents.GameStateChanged, room);

      gameStore.setRoom(room);
    });

    socket.on(WebGameEvents.ImageCreated, (room) => {
      console.log(WebGameEvents.ImageCreated, room);
      gameStore.setRoom(room);
    });

    socket.on(WebGameEvents.MemeCreated, (room) => {
      console.log(WebGameEvents.MemeCreated, room);
      gameStore.setRoom(room);
    });

    return () => {
      gameStore.leaveRoom();
    };
  }, []);

  return null;
}
