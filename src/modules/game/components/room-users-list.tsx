import { Card, User } from "@heroui/react";
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
          <div className="flex flex-row justify-between gap-1 bg-stone-800 p-2 rounded-lg">
            <User
              className=" self-start"
              key={user.id}
              name={user.name}
              description={user.id}
            />
            {canPoo ? (
              <PooButton onPoo={() => gameStore.sendPoo(user.id)} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
});
