"use client"; // forces this component to run in the browser

import { CountryCard } from "@/components/CountryCard";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
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

  if (isLoading) return <div className="text-center mt-20">Loading...</div>;

  if (isError)
    return (
      <div className="text-center text-red-500 mt-20">
        Error: {error.message}
      </div>
    );

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Input
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search countries..."
          className="flex-1"
        />
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="flex-1 bg-black"
        >
          <option value="">All Regions</option>
          {REGIONS.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
        {filtered.length} countries found
      </p>

       <div className="flex flex-col justify-center items-center gap-4 w-full max-w-4xl mx-auto">
         {filtered.map((country) => (
           <CountryCard key={country.cca3} country={country}  />
         ))}
       </div>
    </div>
  );
}
