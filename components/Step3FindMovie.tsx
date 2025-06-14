import { MovieResult } from "@/types";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { BsSearchHeartFill } from "react-icons/bs";
import { IoCaretBack } from "react-icons/io5";
import MovieDiscover from "./MovieDiscover";
import debounce from "lodash/debounce";

interface Step3FindMovieProps {
  query: string;
  setQuery: (q: string) => void;
  setSelectedMovie: (movie: MovieResult) => void;
  setStep: (step: number) => void;
}

const Step3FindMovie = ({ setSelectedMovie, setStep }: Step3FindMovieProps) => {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [lastSearch, setLastSearch] = useState("");
  const [results, setResults] = useState<MovieResult[]>([]);
  const [suggestions, setSuggestions] = useState<MovieResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suppressSuggestionsRef = useRef(false);
  const [sortDirection, setSortDirection] = useState("");
  const [loading, setLoading] = useState(false);

  const searchMovies = async (e?: React.FormEvent | string) => {
    let searchTerm = "";

    if (typeof e === "string") {
      searchTerm = e;
    } else {
      e?.preventDefault();
      searchTerm = query;
    }

    // Avoid redundant search
    if (searchTerm === lastSearch) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `/api/search?query=${encodeURIComponent(searchTerm)}`
      );
      const data = await res.json();
      setResults(data.results || []);
      setLastSearch(searchTerm);
    } catch (err) {
      console.error("Search failed:", err);
      setResults([]);
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  };

  const debouncedFetchSuggestions = useMemo(
    () =>
      debounce(async (value: string) => {
        if (!value.trim()) return setSuggestions([]);

        try {
          const res = await fetch(
            `/api/search?query=${encodeURIComponent(value)}`
          );
          const data = await res.json();
          setSuggestions(data.results.slice(0, 5));
          setShowSuggestions(true);
        } catch (err) {
          console.error("Suggestion fetch failed:", err);
        }
      }, 300),
    []
  );

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
    <div className="lg:max-w-xl mx-auto">
      <button onClick={() => setStep(2)} className=" back-button">
        <IoCaretBack fontSize={18} />
      </button>

      <div className="mb-8">
        <h1 className="text-center drop-shadow border border-[#798dbc]  tokyo-glow  uppercase  w-full py-1  font-[family-name:var(--font-geist-mono)] text-2xl font-bold ">
          Watch Party
        </h1>
        <h2 className="text-center font-[family-name:var(--font-geist-mono)] text-xl font-semibold text-[#001] bg-[#cbd9f3] py-1 mb-8 ">
          03: Find Movie
        </h2>
      </div>

      <div className="relative">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!query.trim()) return;
            suppressSuggestionsRef.current = true;
            debouncedFetchSuggestions.cancel();
            setShowSuggestions(false);
            await searchMovies(query);
          }}
          className="flex mb-8 w-full "
        >
          <input
            value={query}
            onChange={(e) => {
              const val = e.target.value;
              setQuery(val);

              if (!val.trim()) {
                suppressSuggestionsRef.current = true;
                debouncedFetchSuggestions.cancel();
                setHasSearched(false);
                setSuggestions([]);
                setShowSuggestions(false);
                return;
              }

              if (suppressSuggestionsRef.current) {
                suppressSuggestionsRef.current = false;
                return;
              }

              if (val.length > 1) {
                debouncedFetchSuggestions(val);
              } else {
                setSuggestions([]);
                setShowSuggestions(false);
              }
            }}
            placeholder="What to watch?"
            className="flex-1 border-r-0  text-white border border-[#798dbc]  outline-none  border-solid  text-sm md:text-lg px-3  font-[family-name:var(--font-geist-mono)] "
          />

          <button
            type="submit"
            className=" border-l-0 bg-[#cbd9f3] text-[#001]    border-[#798dbc]  rounded-tl-none rounded-bl-none rounded-sm border-solid cursor-pointer  transition-colors flex items-center justify-center hover:bg-[#f2f2f2]  hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 font-[family-name:var(--font-geist-mono)] rounded-br-none"
          >
            <BsSearchHeartFill />
          </button>

          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute top-[35px] bg-black/10 text-white shadow-md border border-white/10 mt-1 w-full z-10 max-h-60 overflow-y-auto backdrop-blur-xl rounded-md rounded-tl-none rounded-tr-none font-[family-name:var(--font-geist-mono)]">
              {suggestions.map((movie, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-white/10 cursor-pointer text-sm transition-colors duration-150"
                  onClick={async () => {
                    suppressSuggestionsRef.current = true;
                    debouncedFetchSuggestions.cancel();
                    setShowSuggestions(false);
                    setSuggestions([]);
                    setQuery(movie.title);
                    await searchMovies(movie.title);
                  }}
                >
                  {movie.title} {movie.year && `(${movie.year})`}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>

      {!hasSearched && results.length === 0 && (
        <MovieDiscover onSelect={setSelectedMovie} setStep={setStep} />
      )}

      {loading ? (
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 w-full animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="bg-blue-200 h-[210px] md:h-[400px] w-full rounded-sm" />
              <div className="h-4 bg-blue-200  w-full rounded-sm " />
              <div className="h-3 bg-blue-200  w-1/2  rounded-sm" />
              <div className="h-3 bg-blue-200 w-1/3  rounded-sm" />
              <div className="h-7 bg-blue-200   w-full rounded-sm" />
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
                className="ctn-button "
              >
                <option value="" disabled>
                  Sort by Year
                </option>
                <option value="desc">Latest</option>
                <option value="asc">Oldest</option>
              </select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:gap-y-16 lg:gap-x-12  w-full">
            {results.map((movie, i) => (
              <figure key={i}>
                <Image
                  width={250}
                  height={400}
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-auto mx-auto rounded-sm  object-cover"
                />

                <div className="font-[family-name:var(--font-geist-mono)] mt-4  ">
                  <div className="flex flex-col">
                    <figcaption className="text-md drop-shadow  tokyo-glow  font-semibold mb-1 ">
                      {movie.title}
                    </figcaption>

                    <p className="text-sm text-gray-600">
                      {movie.year && <span>{movie.year} • </span>}
                      {movie.duration && <span>{movie.duration}m </span>}
                    </p>

                    <p className="text-sm text-gray-600">
                      {movie.type && <span>{movie.type}</span>}
                    </p>

                    {movie.season && (
                      <p className="text-sm text-gray-500 mt-1">
                        {movie.season && <span>Season {movie.season} </span>}
                      </p>
                    )}

                    {movie.episodes && (
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
                    className="mt-4 ctn-button"
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
          <div className="text-center text-[#c0caf5]  flex flex-col gap-2 font-[family-name:var(--font-geist-mono)] mt-8 ">
            <p>
              No results found for{" "}
              <span className="tokyo-glow drop-shadow ">
                &quot;{query}&quot;
              </span>
              .
            </p>
            <p>Please try a different search.</p>
          </div>
        )
      )}
    </div>
  );
};

export default Step3FindMovie;
