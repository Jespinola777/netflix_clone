import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useMovies } from "../context/MovieProvider.jsx";
import { BsFillPlayFill } from "react-icons/bs";
import { RiVolumeMuteLine } from "react-icons/ri";
import { BsHandThumbsUp } from "react-icons/bs";
import { FaAudioDescription } from "react-icons/fa";
import { LuSubtitles } from "react-icons/lu";
import { MdOutlineHighQuality } from "react-icons/md";
import AddToList from "./AddToList.jsx";
import PlayButton from "./PlayButton.jsx";
import PlayVideo from "./Video.jsx";
import MuteButton from "./MuteButton.jsx";
function ModalContent({ closeModal, movie }) {
  const { movies } = useMovies();

  const releaseYear = movie.release_date.substring(0, 4);
  const randomNumber = Math.floor(Math.random() * 21) + 80;

  return (
    <div className="relative flex flex-col w-full h-full overflow-hidden">
      <div className="relative flex flex-col flex-grow overflow-y-auto">
        <div className="relative">
          <div className="flex-grow">
            <PlayVideo movie={movie} />
          </div>

          <button className="absolute top-0 right-0 mr-2" onClick={closeModal}>
            <AiFillCloseCircle className="text-4xl text-[#141414] " />
          </button>
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#141414]  to-transparent" />
          <h2 className="absolute mt-2 ml-4 font-sans text-3xl font-medium top-60">
            {movie?.title || movie.name}
          </h2>
          <div className="z-10 hover:bg-blue-500 focus:ring-2 focus:ring-black">
            <PlayButton />
          </div>
          <AddToList movie={movie} />
          <button className="absolute flex items-center justify-center w-10 h-12 mb-2 font-sans text-xl font-bold text-white top-80 left-60 ">
            <BsHandThumbsUp
              className="text-4xl hover:text-green-600 "
              filled={true}
            />
          </button>
          <MuteButton />
        </div>
        <div className="flex items-center p-5 ml-2 space-x-2">
          <div className="mr-2 font-sans font-bold text-green-400">
            {randomNumber}% Match
          </div>
          {releaseYear}
          <MdOutlineHighQuality className="font-sans text-2xl" />
          <FaAudioDescription className="font-sans text-xl" />
          <LuSubtitles className="font-sans text-lg" />
        </div>
        <div className="flex flex-row">
          <div className="ml-8 w-96">{movie.overview}</div>
          <div>
            <div className="flex flex-row ml-4">
              <div className="text-gray-500 underline">Cast:</div>
              <div className="ml-2"> jay, jay, will, david, leandro </div>
            </div>
            <div className="flex flex-row ml-4">
              <div className="text-gray-500 underline">Genre:</div>
              <div className="ml-2"> spooky </div>
            </div>
            <div className="flex flex-row ml-4">
              <div className="text-gray-500 underline">This movie is:</div>
              <div className="ml-2"> bad </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalContent;
