import commands from "../commands/utility/index.js";

const setCommands = (client) => {
    for (const command of commands) {
        if ("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(
                `[WARNING] The command "${command.data?.name}" is missing a required "data" or "execute" property.`
            );
        }
    }
};

export default setCommands;
