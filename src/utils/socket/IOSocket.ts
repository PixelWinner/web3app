import { io } from "socket.io-client";

export const IOSocket = io(import.meta.env.VITE_API_URL);