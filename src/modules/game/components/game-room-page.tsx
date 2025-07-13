import { observer } from "mobx-react-lite";
import { gameStore } from "../game-store";
import { Button, Chip, Snippet } from "@heroui/react";
import { useEffect } from "react";
import { socket } from "../../../socket";
import { WebGameEvents, type TUser } from "../../../types";
import { CurrentUser } from "./current-user";

export const GameRoomPage = observer(() => {
  const { users, roomId } = gameStore;

  useEffect(() => {
    socket.on(
      WebGameEvents.UserJoined,
      ({ users, roomId }: { users: TUser[]; roomId: string }) => {
        console.log(users, roomId);

        gameStore.setUsers(users);
        gameStore.setRoomId(roomId);
      }
    );

    socket.on(WebGameEvents.UserLeft, ({ users }: { users: TUser[] }) => {
      console.log(users);

      gameStore.setUsers(users);
    });

    return () => {
      gameStore.leaveRoom();
    };
  }, []);

  console.log(roomId);

  if (!roomId) return null;

  return (
    <div
      style={{ width: 400 }}
      className="flex flex-col p-4 bg-neutral-900 rounded-lg gap-2"
    >
      <div className="flex flex-row gap-2 items-center justify-between">
        <div className="text-lg font-bold">Game Room</div>
        <Snippet symbol={false}>{roomId}</Snippet>
      </div>

      <CurrentUser />
      <div className="flex flex-col gpa-1">
        <div className="text-base font-bold">Пользовтаели</div>
        <div className="flex gap-4">
          {users.map((user) => (
            <Chip key={user.id} radius="sm">
              {user.name}
            </Chip>
          ))}
        </div>
      </div>

      <Button color="danger" onPress={() => gameStore.leaveRoom()}>
        Выйти
      </Button>
    </div>
  );
});
