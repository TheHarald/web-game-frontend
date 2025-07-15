import { Card } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { PooButton } from "./poo-button";
import { gameStore } from "../game-store";

export const RoomUsersList = observer(() => {
  const { users, currentUser } = gameStore;

  return (
    <div style={{ width: 400 }} className="flex flex-col gap-2">
      <div className="text-base font-bold">Пользователи</div>
      {users.map((user) => (
        <Card
          className="flex-row items-center gap-1 p-2"
          key={user.id}
          radius="sm"
        >
          {user.name}
          {user.id !== currentUser?.id ? <PooButton userId={user.id} /> : null}
        </Card>
      ))}
    </div>
  );
});
