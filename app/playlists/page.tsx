import { getConcerts } from "@/lib/concerts";
import { PlaylistsView } from "@/components/playlists-view";

export const metadata = { title: "Playlists" };

export default async function PlaylistsPage() {
  const concerts = await getConcerts();
  return <PlaylistsView concerts={concerts} />;
}
