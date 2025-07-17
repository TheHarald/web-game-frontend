import { observer } from "mobx-react-lite";
import { gameStore } from "../game-store";
import { RoomUserItem } from "./room-user-item";

export const RoomUsersList = observer(() => {
  const { users } = gameStore.room;

  return (
    <div
      style={{ width: 320, height: "calc(100vh - 20%)" }}
      className="flex flex-col gap-2 bg-neutral-900 rounded-lg p-4"
    >
      <h1 className="text-xl font-medium">Игроки</h1>
      {users.map((user) => {
        return <RoomUserItem key={user.id} user={user} />;
      })}
    </div>
  );
});
