export type VideoType =
  | "hls"
  | "youtube"
  | "vimeo"
  | "audio"
  | "mp4"
  | "embed"
  | "none";

export interface AudioTrack {
  title: string;
  url: string;
}

export interface Concert {
  wp_id: number | null;
  title: string;
  slug: string;
  description: string;
  video_type: VideoType;
  video_url: string;
  video_id: string;
  thumbnail_id: string | null;
  thumbnail_url: string;
  duration: string;
  release_date: string;
  original_link: string;
  composers: string[];
  instruments: string[];
  periods: string[];
  nationalities: string[];
  qualities: string[];
  performers: string[];
  categories: string[];
  audio_tracks: AudioTrack[];
  published: boolean;
}

export interface Taxonomies {
  composers: string[];
  instruments: string[];
  periods: string[];
  nationalities: string[];
  qualities: string[];
  performers: string[];
}

export type FilterKey =
  | "composer"
  | "instrument"
  | "period"
  | "nationality"
  | "quality";

export interface CatalogFilters {
  q?: string;
  composer?: string;
  instrument?: string;
  period?: string;
  nationality?: string;
  quality?: string;
}
