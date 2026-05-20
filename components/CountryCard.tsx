"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Country } from "@/app/country";
import { useFavouritesStore, useIsFavourite } from "@/app/favouritesStore";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  const router = useRouter();
  const { addFavourite, removeFavourite } = useFavouritesStore();
  const saved = useIsFavourite(country?.cca3 || "");

  function toggleFavourite(e: React.MouseEvent) {
    e.stopPropagation();
    saved ? removeFavourite(country.cca3) : addFavourite(country);
  }

  return (
    <Card
      onClick={() => router.push(`/country/${country.cca3}`)}
      className="w-full cursor-pointer transition-shadow hover:shadow-lg sm:w-1/2"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={country.flags.png}
          alt={country.flags.alt}
          fill
          unoptimized
          loading="eager"
          className="rounded-t-lg object-cover"
        />
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-card-foreground">
            {country.name.common}
          </h2>
          <Badge variant="secondary">{country.region}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Population:</strong>{" "}
          {country.population.toLocaleString()}
        </p>
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Capital:</strong>{" "}
          {country.capital?.[0] ?? "N/A"}
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
