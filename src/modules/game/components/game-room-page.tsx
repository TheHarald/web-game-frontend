import { observer } from "mobx-react-lite";
import { RoomHeader } from "./room-header";
import { RoomUsersList } from "./room-users-list";
import { RoomChat } from "./room-chat";
import { GameField } from "./game-field";

export const GameRoomPage = observer(() => {
  return (
    <div className="flex flex-col gap-6 h-screen p-4">
      <RoomHeader />
      <div className="flex flex-row gap-6 h-full">
        <RoomUsersList />
        <GameField />
        <RoomChat />
      </div>
    </div>
  );
});
