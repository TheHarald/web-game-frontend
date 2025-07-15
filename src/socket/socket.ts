import { io, Socket } from "socket.io-client";
import type { ClientToServerEvents, ServerToClientEvents } from "../types";

const PORT = import.meta.env.VITE_SERVER_PORT || 3001;
const HOST = import.meta.env.VITE_SERVER_HOST || "localhost";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  `http://${HOST}:${PORT}`
);

console.log(`http://${HOST}:${PORT}`);
