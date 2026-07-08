import { getConcerts } from "@/lib/concerts";
import { getCurrentUser } from "@/lib/auth";
import { HomeView } from "@/components/home-view";

export default async function HomePage() {
  const [concerts, user] = await Promise.all([
    getConcerts(),
    getCurrentUser(),
  ]);

  const userName = user?.email ? user.email.split("@")[0] : null;

  return <HomeView concerts={concerts} userName={userName} />;
}
