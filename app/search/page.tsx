import { Suspense } from "react";
import { getConcerts } from "@/lib/concerts";
import { SearchView } from "@/components/search-view";

export const metadata = { title: "Search" };

export default async function SearchPage() {
  const concerts = await getConcerts();
  return (
    <Suspense>
      <SearchView concerts={concerts} />
    </Suspense>
  );
}
