import { Button } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { gameStore } from "../game-store";
import { GameCounter } from "./game-counter";
import { AdminButtons } from "./game-admin-buttons";

export const RoomHeader = observer(() => {
  const { isIAmdin } = gameStore;
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
        {isIAmdin ? <AdminButtons /> : null}
        <div className="text-3xl font-bold">{roomCode}</div>
        <Button color="danger" onPress={() => gameStore.leaveRoom()}>
          Выйти
        </Button>
      </div>
    </div>
  );
});
