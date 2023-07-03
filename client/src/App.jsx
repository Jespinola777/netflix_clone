import React, { useState, useEffect } from "react";
import { getAllMovieAndShows } from "./utils/getMovieData.jsx";
import { useMovies } from "./context/MovieProvider.jsx";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import LandingPage from "./pages/LandingPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import MovieHomePage from "./pages/MovieHomePage.jsx";
import MoviesPage from "./pages/MoviesPage.jsx";
import MyListPage from "./pages/MyListPage.jsx";
import NewAndPopularPage from "./pages/NewAndPopularPage.jsx";
import SignUpPlanPage1 from "./pages/SignUpPlanPage1.jsx";
import SignUpPlanPage2 from "./pages/SignUpPlanPage2.jsx";
import SignUpPlanPage3 from "./pages/SignUpPlanPage3.jsx";
import SignUpPlanPage4 from "./pages/SignUpPlanPage4.jsx";
import SignUpPlanPaymentPage from "./pages/SignUpPlanPaymentPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import NetflixProfile from "./components/NetflixProfile.jsx";
import TVShowsPage from "./pages/TVShowsPage.jsx";
function App() {
  const {
    movies,
    setMovies,
    setUsersProfiles,
    profileName,
    randomIconProfile,
  } = useMovies();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from API
    getAllMovieAndShows().then((data) => {
      setMovies(data);
    });
  }, []);

  useEffect(() => {
    // Fetch data for current users profiles
    async function getProfileData() {
      const response = await axios.get("/api/user-profile", {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            sessionStorage.getItem("token")
          )}`,
        },
      });

      const userProfiles = JSON.parse(response.data.userProfiles[0].profiles);

      console.log("User Profiles:", userProfiles);

      setUsersProfiles(userProfiles);
    }
    getProfileData();
  }, [profileName, randomIconProfile]);

  // Check if user is logged in
  // useEffect(() => {
  //   const currentUser =
  //     sessionStorage.getItem("token") !== null
  //       ? JSON.parse(sessionStorage.getItem("token"))
  //       : sessionStorage.clear();

  //   console.log("Current User:", currentUser);

  //   const hashPath = window.location.hash.slice(1); // Get the path after the hash symbol

  //   if (
  //     !currentUser &&
  //     hashPath !== "/signin" &&
  //     hashPath !== "/signup" &&
  //     hashPath !== "/signup2" &&
  //     hashPath !== "/signup3" &&
  //     hashPath !== "/signup4" &&
  //     hashPath !== "/payment" &&
  //     hashPath !== "/"
  //   ) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPlanPage1 />} />
        <Route path="/signup2" element={<SignUpPlanPage2 />} />
        <Route path="/signup3" element={<SignUpPlanPage3 />} />
        <Route path="/signup4" element={<SignUpPlanPage4 />} />
        <Route path="/payment" element={<SignUpPlanPaymentPage />} />
        <Route path="/home" element={<MovieHomePage />} />
        <Route path="/tv-shows" element={<TVShowsPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/new-and-popular" element={<NewAndPopularPage />} />
        <Route path="/my-list" element={<MyListPage />} />
        <Route path="/profile-login" element={<ProfilePage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;

{
  /* <img
  src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
  alt=""
/>; */
}
