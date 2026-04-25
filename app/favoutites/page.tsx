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
        <p className="text-gray-500 dark:text-gray-400 mb-4">
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
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        Your Favourites ({favourites.length})
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favourites.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
}

export default Favourites;