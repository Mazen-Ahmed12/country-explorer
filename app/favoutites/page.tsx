"use client"
import { Button } from "@/components/ui/button";
import { useFavouritesStore } from "../favouritesStore";
import { CountryCard } from "@/components/CountryCard";
import Link from "next/link";

function Favourites() {
  const favourites = useFavouritesStore((s) => s.favourites);

  if (favourites.length === 0) {
    return (
      <div className="text-center mt-20">
        <p className="mb-4 text-muted-foreground">
          No favourites yet
        </p>
        <Button>
          <Link href="/">Browse Countries</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        Your Favourites ({favourites.length})
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favourites.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
}

export default Favourites;