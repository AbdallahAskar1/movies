"use client"
import { useEffect, useState } from 'react';
import {API_KEY} from "@/components/component/constants";
import MovieDetails from '@/components/component/MovieDetails';

const movieCache = {};
const creditsCache = {};

function DetailsPage(props) {
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState({ directors: [], actors: [] });
  const [error, setError] = useState('');
  const id = props.params.id

  useEffect(() => {
    async function fetchMovie() {
      if (!id || movieCache[id]) {
        setMovie(movieCache[id]);
        return;
      }
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch movie details');
        const data = await response.json();
        setMovie(data);
        movieCache[id] = data; 
        console.log(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Error fetching movie details');
      }
    }

    async function fetchCredits() {
      if (!id || creditsCache[id]) {
        setCredits(creditsCache[id]);
        return;
      }
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch movie credits');
        const data = await response.json();
        const directors = data.crew.filter(member => member.job === 'Director').map(director => director.name);
        const actors = data.cast.slice(0, 5).map(actor => actor.name);
        setCredits({ directors, actors });
        creditsCache[id] = { directors, actors }; // Cache the fetched credits
      } catch (error) {
        console.error('Error fetching movie credits:', error);
        setError('Error fetching movie credits');
      }
    }

    fetchMovie();
    fetchCredits();
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>Loading...</div>;

  return (
    <div className=" p-5 h-screen">
     <MovieDetails movie={movie} credits={credits}></MovieDetails>
    </div>
  )
}

export default DetailsPage
