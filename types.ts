export interface MovieResult {
  title: string;
  link: string;
  poster: string;
  year?: string;
  duration?: string;
  season?: string;
  episodes?: string;
  type?: "Movie" | "TV" | "Unknown";
}
