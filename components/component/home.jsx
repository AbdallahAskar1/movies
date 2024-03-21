"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {API_KEY} from "./constants"
import MovieGrid from "./MovieGrid";
async function searchMovies(name){
  try {
    const response = await fetch(`https:api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${name}`)
    return await response.json();
  } catch(error){
    console.error('Error fetching data in searchMovie', error)
    return []
  }
}

export function Home() {
  
  const [movieName, setMovieName] = useState("");
  const [movies,setMovies] = useState([])


  function handleMovieClick(movie){
    setSelectedMovie(movie)
  }
  async function handleSearch(e){
    console.log('hh')
    e.preventDefault();
    if (!movieName) return;
    const results = await searchMovies(movieName);
    setMovies(results.results)
  }



  return (
    <div
      key="1"
      className="flex flex-col items-center min-h-screen py-12 gap-4 text-center"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Movie Search</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter the name of a movie to search for information and get
          recommendations.
        </p>
      </div>
      <form
        className="flex w-full max-w-sm flex-col gap-2"
        onSubmit={handleSearch}
      >
        <Input
          className="w-full"
          placeholder="Enter a movie title"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <Button className="w-full" type="submit">
          Search
        </Button>
        <p className="text-gray-500 dark:text-gray-400">Search results</p>
      </form>
      <MovieGrid movies={movies} handleMovieClick={handleMovieClick} />
    </div>
  );
}
