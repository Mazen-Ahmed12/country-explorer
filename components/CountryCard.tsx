"use client"; // Required for hooks and interactivity

import { useRouter } from "next/navigation"; // Next.js uses useRouter, not useNavigate
import Image from "next/image"; // Optimized Next.js image component
import type { Country } from "@/app/country";
import { useFavouritesStore, useIsFavourite } from "@/app/favouritesStore";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  const router = useRouter(); //
  const { addFavourite, removeFavourite } = useFavouritesStore();
  const saved = useIsFavourite(country?.cca3 || "");

  function toggleFavourite(e: React.MouseEvent) {
    e.stopPropagation();
    saved ? removeFavourite(country.cca3) : addFavourite(country);
  }

  return (
    <Card
      onClick={() => router.push(`/country/${country.cca3}`)}
      className="w-1/2 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={country.flags.png}
          alt={country.flags.alt}
          fill
          unoptimized
          loading="eager"
          className="object-cover rounded-t-lg"
        />
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg dark:text-white">
            {country.name.common}
          </h2>
          <Badge variant="secondary">{country.region}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          <strong>Capital:</strong> {country.capital?.[0] ?? "N/A"}
        </p>
        <Button
          onClick={toggleFavourite}
          variant={saved ? "destructive" : "default"}
          size="sm"
          className="mt-4 w-full"
        >
          {saved ? "Remove Favourite" : "Add Favourite"}
        </Button>
      </CardContent>
    </Card>
  );
}
