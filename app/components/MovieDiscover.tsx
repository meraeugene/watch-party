"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MovieResult } from "@/types";

interface MovieDiscoverSectionProps {
  onSelect: (movie: MovieResult) => void;
  setStep: (step: number) => void;
}

export default function MovieDiscover({
  onSelect,
  setStep,
}: MovieDiscoverSectionProps) {
  const [data, setData] = useState<MovieResult[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState("");

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const res = await fetch("/api/highlights-movies");
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.error("Failed to fetch highlights:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlights();
  }, []);

  const sortByYear = (direction: string) => {
    if (!data) return;

    const sorted = [...data].sort((a, b) => {
      const yearA = parseInt(a.year || "0");
      const yearB = parseInt(b.year || "0");
      return direction === "desc" ? yearB - yearA : yearA - yearB;
    });

    setData(sorted);
    setSortDirection(direction);
  };

  const renderSection = (items: MovieResult[]) => (
    <section className="mb-12">
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

      <div className="grid grid-cols-2 gap-x-8 gap-y-12 w-full">
        {items.map((movie, i) => (
          <figure key={i}>
            <Image
              src={movie.poster}
              alt={movie.title}
              width={250}
              height={400}
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
                    {movie.episodes && <span>{movie.episodes} Episodes</span>}
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  onSelect(movie);
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
    </section>
  );

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-x-8 gap-y-12 w-full animate-pulse">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="bg-gray-300 dark:bg-gray-200 h-[210px]  w-full" />
            <div className="h-4 bg-gray-300 dark:bg-gray-200  w-full " />
            <div className="h-3 bg-gray-200 dark:bg-gray-200  w-1/2 " />
            <div className="h-3 bg-gray-200 dark:bg-gray-200  w-1/3 " />
            <div className="h-7 bg-gray-400 dark:bg-gray-200   w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!data) {
    return <p className="text-center text-red-500">Failed to load data.</p>;
  }

  return <>{renderSection(data)}</>;
}
