import { getConcerts } from "@/lib/concerts";
import { HomeView } from "@/components/home-view";

export default async function HomePage() {
  const concerts = await getConcerts();
  return <HomeView concerts={concerts} />;
}
