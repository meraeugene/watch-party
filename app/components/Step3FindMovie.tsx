import { MovieResult } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { BsSearchHeartFill } from "react-icons/bs";
import { IoCaretBack } from "react-icons/io5";
import MovieDiscover from "./MovieDiscover";

interface Step3FindMovieProps {
  query: string;
  setQuery: (q: string) => void;
  setSelectedMovie: (movie: MovieResult) => void;
  setStep: (step: number) => void;
}

const Step3FindMovie = ({ setSelectedMovie, setStep }: Step3FindMovieProps) => {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<MovieResult[]>([]);
  const [sortDirection, setSortDirection] = useState("");
  const [loading, setLoading] = useState(false);

  const searchMovies = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error("Search failed:", err);
      setResults([]);
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  };

  const sortByYear = (direction: string) => {
    const sorted = [...results].sort((a, b) => {
      const yearA = parseInt(a.year || "0");
      const yearB = parseInt(b.year || "0");
      return direction === "desc" ? yearB - yearA : yearA - yearB;
    });

    setResults(sorted);
    setSortDirection(direction);
  };

  return (
    <div>
      <button
        onClick={() => setStep(2)}
        className="mt-6 border border-solid cursor-pointer border-black/[.08] transition-colors flex items-center justify-center bg-white text-black dark:bg-gray-200 dark:hover:bg-[#1a1a1a] font-medium text-sm sm:text-base h-8 sm:h-12 px-4 sm:px-5  sm:w-auto md:w-[158px] font-[family-name:var(--font-geist-mono)] mb-8"
      >
        <IoCaretBack fontSize={18} />
      </button>

      <div className="mb-8">
        <h1 className="text-center  uppercase bg-[#0a0a0a] dark:bg-white w-full py-1 text-white dark:text-black font-[family-name:var(--font-geist-mono)] text-2xl font-bold">
          Watch Party
        </h1>
        <h1 className="text-center font-[family-name:var(--font-geist-mono)] text-2xl font-bold bg-gray-200 text-black py-1 ">
          03: Find Movie
        </h1>
        <h1 className="text-center font-[family-name:var(--font-geist-mono)] text-2xl font-medium ">
          {" "}
        </h1>
      </div>

      <form onSubmit={searchMovies} className="flex gap-2 mb-8 w-full">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value === "") {
              setResults([]);
              setHasSearched(false);
            }
          }}
          placeholder="What to watch?"
          type="search"
          className="flex-1 outline-none border border-black/[.08] dark:border-white/[.145] border-solid px-3 text-sm  font-[family-name:var(--font-geist-mono)] "
        />
        <button
          type="submit"
          className=" border border-solid cursor-pointer border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 font-[family-name:var(--font-geist-mono)]"
        >
          <BsSearchHeartFill />
        </button>
      </form>

      {!hasSearched && results.length === 0 && (
        <MovieDiscover onSelect={setSelectedMovie} setStep={setStep} />
      )}

      {loading ? (
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 w-full animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="bg-gray-300 dark:bg-gray-200 h-[210px]  w-full" />
              <div className="h-4 bg-gray-300 dark:bg-gray-200 w-full " />
              <div className="h-3 bg-gray-200 dark:bg-gray-200 w-1/2 " />
              <div className="h-3 bg-gray-200 dark:bg-gray-200 w-1/3 " />
              <div className="h-7 bg-gray-400 dark:bg-gray-200  w-full" />
            </div>
          ))}
        </div>
      ) : results.length > 0 ? (
        <>
          {results.length > 0 && (
            <div className="flex justify-end mb-8">
              <select
                onChange={(e) => sortByYear(e.target.value)}
                value={sortDirection}
                className="border outline-none border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-white dark:bg-gray-300 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] text-black font-medium text-sm sm:text-base h-9 px-4 font-[family-name:var(--font-geist-mono)]"
              >
                <option value="" disabled>
                  Sort by Year
                </option>
                <option value="desc">Latest</option>
                <option value="asc">Oldest</option>
              </select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 w-full">
            {results.map((movie, i) => (
              <figure key={i}>
                <Image
                  width={250}
                  height={400}
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-auto mx-auto  object-cover"
                />

                <div className="font-[family-name:var(--font-geist-mono)] mt-4  ">
                  <div className="flex flex-col">
                    <figcaption className="text-md   font-semibold mb-1 ">
                      {movie.title}
                    </figcaption>

                    <p className="text-sm text-gray-600">
                      {movie.year && <span>{movie.year} • </span>}
                      {movie.duration && <span>{movie.duration}m </span>}
                    </p>

                    <p className="text-sm text-gray-600">
                      {movie.type && <span>{movie.type}</span>}
                    </p>

                    {(movie.season || movie.episodes) && (
                      <p className="text-sm text-gray-500 mt-1">
                        {movie.season && <span>Season {movie.season} </span>}
                      </p>
                    )}

                    {(movie.season || movie.episodes) && (
                      <p className="text-sm text-gray-500 mt-1">
                        {movie.episodes && (
                          <span>{movie.episodes} Episodes</span>
                        )}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedMovie(movie);
                      setStep(4);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="mt-4 border border-solid cursor-pointer border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-[#0a0a0a] dark:bg-[#f2f2f2] text-white dark:text-black dark:hover:bg-[#1a1a1a] font-medium text-sm text-nowrap sm:text-base h-8 sm:h-12 px-2 mx-auto sm:w-auto md:w-[158px] font-[family-name:var(--font-geist-mono)]"
                  >
                    Watch Together!
                  </button>
                </div>
              </figure>
            ))}
          </div>
        </>
      ) : (
        hasSearched && (
          <div className="text-center  flex flex-col gap-2 font-[family-name:var(--font-geist-mono)] mt-8 ">
            <p>
              No results found for{" "}
              <span className="text-gray-500">&quot;{query}&quot;</span>.
            </p>
            <p>Please try a different search.</p>
          </div>
        )
      )}
    </div>
  );
};

export default Step3FindMovie;
