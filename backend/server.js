import app from "./middleware/middleware.js";
import dotenv from "dotenv";
import postgres from "postgres";
import axios from "axios";
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
dotenv.config({ path: "../.env" });

export const sql = postgres(process.env.DATABASE_URL);

const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the React app
app.use(express.static(join(__dirname, "dist")));

// The "catchall" handler: for any request that doesn't match one above,
// send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

// Insert data into database

// Video Keys

const key = process.env.API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTFhM2FhYzZhYTRhNzljZmI5ZTMzMDE3YWM4OGJlMSIsInN1YiI6IjY0OGExYTg2ZDJiMjA5MDBjYTIyM2Y3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.db5tNXpuST7ql4euB9I4ezjn81JnfchBUnoo4ZIDcK0",
  },
};

app.get("/api/insert", async (req, res) => {
  try {
    // Make a query for all movie IDs
    const movieIds = await sql`SELECT id FROM api_data WHERE type > 5;`;

    console.log(movieIds);

    const movieData = [];

    // Make an API request with a loop for each movie ID
    for (const movieId of movieIds) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${movieId.id}/videos`,
        options
      );
      movieData.push(response.data);
    }

    console.log(movieData);
    for (const movie of movieData) {
      for (const result of movie.results) {
        console.log(result.key);
        // You can use the result.key value to insert into the database or perform other operations
        const selectedMovies = await sql`
    UPDATE api_data
    SET video_key = ${result.key}
    WHERE id = ${movie.id};`;

        console.log(selectedMovies);
      }
    }

    // Insert data into the database
    res.status(200).json({ movieData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
