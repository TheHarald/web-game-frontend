import { io } from "socket.io-client";

const PORT = import.meta.env.VITE_SERVER_PORT || 3001;
const HOST = import.meta.env.VITE_SERVER_HOST || "localhost";

export const socket = io(`http://${HOST}:${PORT}`);
