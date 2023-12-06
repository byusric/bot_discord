const fetch = require("node-fetch-commonjs");
require("dotenv").config();

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  globalThis.Headers = fetch.Headers;
  globalThis.Request = fetch.Request;
  globalThis.Response = fetch.Response;
}

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const token = process.env.DISCORD_BOT_SECRET;

function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data[0]["q"] + " -" + data[0]["a"];
    });
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.displayName}!`);
});

client.on("message", (msg) => {
  if (msg.author.bot) return;

  if (msg.content === "$inspire") {
    getQuote().then((quote) => msg.channel.send(quote));
  }
});

client.login(token);

exports.fetch = async function (url, init) {
  const { default: fetch } = await import("node-fetch");
  return await fetch(url, init);
};
