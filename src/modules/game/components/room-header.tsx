import { Button, Snippet } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { gameStore } from "../game-store";

export const RoomHeader = observer(() => {
  const { roomId } = gameStore;

  return (
    <div className="flex flex-row gap-2 items-top justify-end p-4 flex-1 bg-neutral-900 rounded-lg">
      <Snippet symbol="">{roomId}</Snippet>
      <Button color="danger" onPress={() => gameStore.leaveRoom()}>
        Выйти
      </Button>
    </div>
  );
});
