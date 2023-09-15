import io from "socket.io-client";

var socket = io.connect(process.env.REACT_APP_BACKEND, { reconnect: true });

export { socket };
