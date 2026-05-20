"use client"; // forces this component to run in the browser

import { CountryCard } from "@/components/CountryCard";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { Country } from "./country";

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

async function fetchData(): Promise<Country[]> {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3,borders,currencies,languages,subregion",
  );
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const {
    data: countries,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchData,
  });

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);
  
  const filtered = useMemo(() => {
    if (!countries) return [];
    return countries.filter((c) => {
      const matchesSearch = c.name.common
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesRegion = selectedRegion ? c.region === selectedRegion : true;
      return matchesSearch && matchesRegion;
    });
  }, [countries, search, selectedRegion]);

  if (isLoading)
    return (
      <div className="mt-20 text-center text-muted-foreground">Loading...</div>
    );

  if (isError)
    return (
      <div className="mt-20 text-center text-destructive">
        Error: {error.message}
      </div>
    );

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <Input
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search countries..."
          className="flex-1"
        />
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="flex h-9 flex-1 rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:max-w-xs"
        >
          <option value="">All Regions</option>
          {REGIONS.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        {filtered.length} countries found
      </p>

       <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-4">
         {filtered.map((country) => (
           <CountryCard key={country.cca3} country={country}  />
         ))}
       </div>
    </div>
  );
}
