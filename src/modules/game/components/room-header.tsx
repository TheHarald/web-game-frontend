import { Button, Snippet } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { gameStore } from "../game-store";

export const RoomHeader = observer(() => {
  const { roomCode } = gameStore.room;

  return (
    <div
      style={{ height: 80 }}
      className="flex flex-row gap-2 items-top justify-end p-4 flex-1 bg-neutral-900 rounded-lg items-center"
    >
      <Snippet symbol="">{roomCode}</Snippet>
      <Button color="danger" onPress={() => gameStore.leaveRoom()}>
        Выйти
      </Button>
    </div>
  );
});
