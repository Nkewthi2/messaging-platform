import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class WebSocketService {
  private client: Client | null = null;

  connect() {
    if (this.client?.connected) return;

    this.client = new Client({
      webSocketFactory: () =>
        new SockJS("http://localhost:8080/ws"),

      reconnectDelay: 5000,

      onConnect: () => {
        console.log("WS Connected");
      },

      onDisconnect: () => {
        console.log("WS Disconnected");
      },

      onStompError: (frame) => {
        console.error(frame);
      },
    });

    this.client.activate();
  }

  subscribe(
    destination: string,
    callback: (body: any) => void
  ) {
    if (!this.client?.connected) return;

    const sub = this.client.subscribe(
      destination,
      (message) => {
        callback(
          JSON.parse(message.body)
        );
      }
    );

    return () => sub.unsubscribe();
  }

  publish(
    destination: string,
    body: unknown
  ) {
    if (!this.client?.connected) return;

    this.client.publish({
      destination,
      body: JSON.stringify(body),
    });
  }
}

export default new WebSocketService();