import { io } from "socket.io-client";

let socket: any;

const initSocket = () => {
    socket = io("ws://localhost:3001", { transports: ["websocket"] });
};

export { initSocket, socket };
