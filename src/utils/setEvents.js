import events from "../events/index.js";

const setEvents = (client) => {
    for (const event of events) {
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
};

export default setEvents;
