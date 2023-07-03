import { sql } from "../server.js";
import { createClient } from "redis";

const client = createClient();

client.on("connect", () => {
  console.log("Connected to Redis");
});

await client.connect();

export const getMovies = async (req, res) => {
  if ((await client.exists("all_movies")) === 1) {
    console.log("fetching data from redis cache");
    const movies = await client.get("all_movies");
    res.send(JSON.parse(movies));
  } else {
    sql`SELECT * FROM api_data`.then((rows) => {
      client.set("all_movies", JSON.stringify(rows));
      res.send(rows);
    });
  }
};
