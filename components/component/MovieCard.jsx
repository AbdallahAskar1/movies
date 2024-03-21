'use client'

import Image from "next/image";
import Link from 'next/link';

export default function MovieCard({movie}) {
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const truncatedTitle = movie.title.length > 25 ? movie.title.substring(0, 25) + '...' : movie.title;

    return (
        <div className="cursor-pointer">
            <div className="relative w-64 h-96">
                <Image
              src={imageUrl}
              alt={truncatedTitle}
              layout="responsive"
              width={128}
              height={192}
              objectFit="cover"
              className="rounded-md"
                />
            </div>
            <div className="mt-2">
                <h3 className="text-black text-lg">{truncatedTitle}</h3>
                <p className="text-gray-500 text-sm">{movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}</p>
                <Link href={`/movies/${movie.id}`} passHref>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Details</button>
                </Link>
            </div>
        </div>
    );
}
