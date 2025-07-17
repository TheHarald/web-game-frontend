import { Button, Snippet } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { gameStore } from "../game-store";
import { GameCounter } from "./game-counter";

export const RoomHeader = observer(() => {
  const { roomCode, state } = gameStore.room;

  return (
    <div
      style={{ height: 80 }}
      className="flex flex-row gap-2 items-top justify-between p-4 flex-1 bg-neutral-900 rounded-lg items-center"
    >
      <div className="flex flex-row items-center gap-6">
        <div className="text-large">{state}</div>
        <GameCounter />
      </div>
      <div className="flex flex-row items-center gap-6">
        <Snippet symbol="">{roomCode}</Snippet>
        <Button color="danger" onPress={() => gameStore.leaveRoom()}>
          Выйти
        </Button>
      </div>
    </div>
  );
});
