import { observer } from "mobx-react-lite";
import { GameRoomPage } from "./modules/game/components/game-room-page";
import { LoginPage } from "./modules/game/components/login-page";
import { gameStore } from "./modules/game/game-store";
import { SocketEventsHandler } from "./modules/game/components/socket-events-handler";

export const App = observer(() => {
  const { currentUser } = gameStore;
  return (
    <>
      {currentUser ? (
        <GameRoomPage />
      ) : (
        <div className="flex flex-row min-h-screen justify-center items-center">
          <LoginPage />
        </div>
      )}
      <SocketEventsHandler />
    </>
  );
});

export default App;
