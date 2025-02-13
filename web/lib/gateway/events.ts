import { useMessageStore } from "~/common/message";
import { useRoomStore } from "~/common/rooms";
import { useServerStore } from "~/common/servers";
import { useUserStore } from "~/common/user";
import { useCurrentUserStore } from "~/common/users";
import type { EventMap } from "~/types/gateway";

export const events = {
    ready: (data) => {
        useCurrentUserStore.setState(data.user);

        const { set: setServers } = useServerStore.getState();
        setServers(data.servers || []);

        const { set: setRooms } = useRoomStore.getState();
        setRooms(data.rooms || []);
    },

    server_create: (server) => {
        const { add: addRoom } = useRoomStore.getState();
        addRoom(...server.rooms);

        Object.assign(server, { rooms: undefined });

        const { add: addServer } = useServerStore.getState();
        addServer(server);
    },
    server_delete: (serverId) => {
        const { remove } = useServerStore.getState();
        remove(serverId);
    },

    room_create: (room) => {
        const { add } = useRoomStore.getState();
        add(room);
    },
    room_delete: (roomId) => {
        const { remove } = useRoomStore.getState();
        remove(roomId);
    },

    message_create: (message) => {
        const { add: addUser } = useUserStore.getState();
        addUser(message.author);

        Object.assign(message, { author: undefined });

        const { add: addMessage } = useMessageStore.getState();
        addMessage(message);
    },
    message_delete: (messageId) => {
        const { remove } = useMessageStore.getState();
        remove(messageId);
    }
} satisfies EventMap;