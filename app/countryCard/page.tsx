"use client";

import { use } from "react";
import { CountryCard } from "@/components/CountryCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import type { Country } from "@/app/country";
import Loader from "../loading";

async function fetchCountry(cca3: string): Promise<Country> {
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha/${cca3}?fields=name,flags,population,region,capital,cca3,borders,currencies,languages,subregion`,
  );
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default function CountryCardPage({
  searchParams,
}: {
  searchParams: Promise<{ cca3?: string }>;
}) {
  const router = useRouter();
  const { cca3: cca3Param } = use(searchParams);
  const cca3 = cca3Param || "CIV";

  const {
    data: country,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["country", cca3],
    queryFn: () => fetchCountry(cca3),
  });

  if (isLoading)
    return <Loader/>
  if (isError)
    return <div className="p-6 text-destructive">Error: {error.message}</div>;

  return (
    <main className="p-6">
      <div className="mb-6 flex flex-row items-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">
          {country?.name.common}
        </h1>
        <Button className="h-8 w-28" onClick={() => router.push("/favoutites")}>
          Favourites
        </Button>
      </div>
      <CountryCard country={country} />
    </main>
  );
}
