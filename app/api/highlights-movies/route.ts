import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import { MovieResult } from "@/types";

export async function GET() {
  try {
    const url = "https://myflixerto.tube/home";
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        Referer: "https://myflixerto.tube/",
      },
    });

    const $ = cheerio.load(response.data);

    const extractSection = (selector: string): MovieResult[] => {
      const items: MovieResult[] = [];

      $(`${selector} .flw-item`).each((_, el) => {
        const title = $(el).find(".film-name a").text().trim();
        const href = $(el).find(".film-name a").attr("href");
        const link = `https://myflixerto.tube${href}`;

        const poster =
          $(el).find(".film-poster img").attr("data-src") ||
          $(el).find(".film-poster img").attr("src") ||
          "";

        const detailText = $(el).find(".fd-infor").text().trim();
        const yearMatch = detailText.match(/\b(19|20)\d{2}\b/);
        const durationMatch = detailText.match(/(\d{1,3})m/);
        const seasonMatch = detailText.match(/SS\s*(\d+)/);
        const episodeMatch = detailText.match(/EPS\s*(\d+)/);
        const isMovie = detailText.includes("Movie");
        const isTV = detailText.includes("TV");

        const year = yearMatch?.[0] ?? undefined;
        const duration = durationMatch?.[1] ?? undefined;
        const season = seasonMatch?.[1] ?? undefined;
        const episodes = episodeMatch?.[1] ?? undefined;
        const type = isMovie ? "Movie" : isTV ? "TV" : "Unknown";

        if (title && link && poster) {
          items.push({
            title,
            link,
            poster,
            year,
            duration,
            season,
            episodes,
            type,
          });
        }
      });

      return items;
    };

    const trending = extractSection("#trending-movies");

    return new NextResponse(JSON.stringify(trending), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (error) {
    console.error("Scraping failed:", error);
    return NextResponse.json(
      { error: "Failed to scrape MyFlixer trending movies" },
      { status: 500 }
    );
  }
}
