import { observer } from "mobx-react-lite";
import { RoomHeader } from "./room-header";
import { RoomUsersList } from "./room-users-list";

export const GameRoomPage = observer(() => {
  return (
    <div className="flex-col h-full">
      <RoomHeader />
      <RoomUsersList />
    </div>
  );
});
