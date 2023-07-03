import app from "./middleware/middleware.js";
import dotenv from "dotenv";
import postgres from "postgres";
import axios from "axios";
import redis from "redis";

dotenv.config({ path: "../.env" });

export const sql = postgres(process.env.DATABASE_URL);

const PORT = process.env.PORT || 5000;

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
        `https://api.themoviedb.org/3/tv/${movieId.id}/keywords`,
        options
      );

      console.log(response.data);
      movieData.push(response.data);
    }

    console.log("MOVIE DATA:", movieData);

    for (const movie of movieData) {
      // You can use the result.key value to insert into the database or perform other operations
      for (const keyword of movie.results) {
        const selectedMovies = await sql`
          UPDATE api_data
          SET keywords = ARRAY_APPEND(keywords, ${keyword.name})
          WHERE id = ${movie.id}
          RETURNING *;
        `;
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
