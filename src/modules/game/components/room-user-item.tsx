import { User } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { PooButton } from "./poo-button";
import type { TUser } from "../../../types";
import { settings } from "../../../settings/settings";
import { gameStore } from "../game-store";

type TRoomUserItemProps = {
  user: TUser;
};

export const RoomUserItem = observer<TRoomUserItemProps>((props) => {
  const { user } = props;

  const { currentUser } = gameStore;

  const canPoo = settings.CAN_POO_SELF || user.id !== currentUser?.id;

  return (
    <div className="flex flex-row  gap-1 bg-stone-800 p-2 rounded-lg items-center">
      <User
        avatarProps={{
          className: user.isAdmin ? "border-2 border-warning-500" : "",
        }}
        className="self-start"
        key={user.id}
        name={user.name}
        description={user.id}
      />
      {canPoo ? <PooButton onPoo={() => gameStore.sendPoo(user.id)} /> : null}
    </div>
  );
});
