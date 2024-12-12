import dotenv from "dotenv";
dotenv.config();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const TEST_SERVER_ID = process.env.TEST_SERVER_ID;
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;

export { DISCORD_TOKEN, TEST_SERVER_ID, DISCORD_CLIENT_ID };
