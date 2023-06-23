import { useState, useEffect, useContext, createContext } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { RiContrastDropLine } from "react-icons/ri";

// Create a context
const MovieContext = createContext();

// Custom Hooks to use context
export function useMovies() {
  return useContext(MovieContext);
}

// Create a provider
export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [signUpData, setSignUpData] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(4);
  
  const [myList, setMyList] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  async function handleSignup(formInputs) {
    try {
      console.log(formInputs);
      const { email, password } = formInputs;

      const formData = {
        email: email.toLowerCase(),
        password: password.toLowerCase(),
      };

      // Send Axios Post Request
      console.log(formData);
      const response = await axios.post("/api/signup", formData);
      if (!response.data) {
        throw new Error("Something went wrong");
      }
      // Get Token
      const token = response.data.token;
      // Set Token
      sessionStorage.setItem("token", JSON.stringify(token));
      // Navigate to next page
      navigate("/signup3");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignIn(formInputs) {
    console.log(formInputs);
    const { email, password } = formInputs;

    const formData = {
      email: email.toLowerCase(),
      password: password.toLowerCase(),
    };
    // Send Axios Post Request
    const response = await axios.post("/api/login", formData);

    // Error Handling
    if (!response.data) {
      throw new Error("Something went wrong");
    }

    console.log(response.data);
    // Get Token
    const token = response.data.token;
    // Set Token
    sessionStorage.setItem("token", JSON.stringify(token));
    // Navigate to next page
    navigate("/profile-login");
  }

  async function handleAddToList(movieId) {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      console.log(token, movieId);
      const response = await axios.post(
        "/api/my-list",
        { movieId: movieId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGetList() {
    const token = JSON.parse(sessionStorage.getItem("token"));

    console.log(token);

    const response = await axios.get("/api/my-list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    const userListMovieIds = response.data.currUsersMoviesList;

    console.log(userListMovieIds);

    const myListMovies = userListMovieIds.flatMap((listId) =>
      movies.filter((movie) => movie.id === listId.api_data_id)
    );

    setMyList(myListMovies);
    console.log(myListMovies);
  }

  // Yup Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(`Include "@", Invalid Email`)
      .required("Must Provide Email"),

    password: Yup.string()
      .required("Password Required")
      .min(8, "Must be 8 characters")
      .max(15, "Must be 15 characters"),
  });

  // Form Values
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    // Form Validation
    validationSchema,

    // Form Submission
    onSubmit: (values) => {
      if (location.pathname === "/signin") {
        handleSignIn(values);
        return;
      }

      handleSignup(values);
    },
  });

  // set Width of Window for Header
  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleMute = () => {
    setIsMuted(false);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        signUpData,
        setSignUpData,
        formik,
        selectedPlan,
        setSelectedPlan,
        handleAddToList,
        handleGetList,
        myList,
        isPlaying,
        handlePlay,
        isMuted,
        handleMute,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export default MovieProvider;
