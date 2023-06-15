import React, { useState, useEffect } from "react";

function App() {
  useEffect(() => {
    // Fetch data from API
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTFhM2FhYzZhYTRhNzljZmI5ZTMzMDE3YWM4OGJlMSIsInN1YiI6IjY0OGExYTg2ZDJiMjA5MDBjYTIyM2Y3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.db5tNXpuST7ql4euB9I4ezjn81JnfchBUnoo4ZIDcK0",
      },
    };

    fetch("https://api.themoviedb.org/3/discover/movie", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }, []);
  return <></>;
}

export default App;
