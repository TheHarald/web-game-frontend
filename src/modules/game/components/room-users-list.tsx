import { Card } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { PooButton } from "./poo-button";
import { gameStore } from "../game-store";
import { settings } from "../../../settings/settings";

export const RoomUsersList = observer(() => {
  const { users, currentUser } = gameStore;

  return (
    <div
      style={{ width: 320 }}
      className="flex flex-col gap-2 bg-neutral-900 rounded-lg p-4"
    >
      <h1 className="text-xl font-medium">Игроки</h1>
      {users.map((user) => {
        const canPoo = settings.CAN_POO_SELF || user.id !== currentUser?.id;
        return (
          <Card
            className="flex-row items-center gap-1 p-2 bg-stone-600"
            key={user.id}
            radius="sm"
          >
            {user.name}
            {canPoo ? <PooButton userId={user.id} /> : null}
          </Card>
        );
      })}
    </div>
  );
});
