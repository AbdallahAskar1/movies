


function MovieDetails({movie,credits}) {
  return (
<>
    <h1 className="text-4xl font-bold mb-4">Movie Details</h1>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/3">
          <img className="rounded-lg shadow-lg" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`Poster of ${movie.title}`} />
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-3xl font-semibold">{movie.title} ({movie.release_date.substring(0, 4)})</h2>
          <div className="mt-4">
            <p className="text-lg"><span className="font-bold">Genre:</span> {movie.genres.map(genre => genre.name).join(', ')}</p>
            <p className="text-lg"><span className="font-bold">Director:</span> {credits?.directors?.join(', ')}</p>
            <p className="text-lg"><span className="font-bold">Actors:</span> {credits?.actors?.join(', ')}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-semibold">Plot</h3>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
</>
  )
}

export default MovieDetails