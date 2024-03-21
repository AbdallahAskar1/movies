import { API_KEY } from "@/components/component/constants";
import MovieDetails from "@/components/component/MovieDetails";

async function fetchData({ params }) {
  const { id } = params;
  let movie,
    credits = null;
  [movie, credits] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`, {
      cache: "force-cache",
    }).then((res) =>
      res.ok ? res.json() : Promise.reject("Failed to fetch movie")
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`,
      { cache: "force-cache" }
    ).then((res) =>
      res.ok ? res.json() : Promise.reject("Failed to fetch credits")
    ),
  ]);

  return [movie, credits];
}

async function DetailsPage(props) {
  let data, error;
  try {
    data = await fetchData(props);
  } catch (err) {
    error = err;
  }

  const [movie, credits] = data;

  return (
    <div className="p-5 h-screen">
      <MovieDetails movie={movie} credits={credits}></MovieDetails>
    </div>
  );
}

export default DetailsPage;
