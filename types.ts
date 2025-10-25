export interface MovieResult {
  title: string;
  link: string;
  poster: string;
  year?: string;
  duration?: string;
  season?: string;
  episodes?: string;
  type?: "Movie" | "TV" | "Unknown";
  watchUrl?: string;
}

export interface CurrentUser {
  id: string;
  username: string;
  tag: string;
  avatar: string;
  discordId: string | null;
}
