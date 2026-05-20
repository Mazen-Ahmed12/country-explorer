"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Country } from "@/app/country";
import Loader from "@/app/loading";

async function fetchData(code: string): Promise<Country> {
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha/${code}?fields=name,flags,population,region,capital,cca3,borders,currencies,languages,subregion`,
  );
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default function CountryDetail({
  params,
}: {
  params: Promise<{ cca3: string }>;
}) {
  const { cca3 } = use(params);
  const router = useRouter();

  const {
    data: country,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["country", cca3],
    queryFn: () => fetchData(cca3),
  });

  if (isLoading)
    return <Loader/>
  if (isError)
    return (
      <p className="mt-20 text-center text-destructive">
        Error: {error.message}
      </p>
    );

  if (!country) return <p className="text-muted-foreground">Country not found.</p>;

  const currencyList = Object.entries(country.currencies ?? {})
    .map(([code, val]) => `${val.name} (${code})`)
    .join(", ");

  const languageList = Object.values(country.languages ?? {}).join(", ");

  return (
    <div>
      <Button variant="outline" onClick={() => router.back()} className="mb-8">
        ← Back
      </Button>

      <div className="flex flex-col gap-12 lg:flex-row">
        <img
          src={country.flags.png}
          alt={country.flags.alt}
          className="w-full rounded-lg object-cover shadow-md lg:w-1/2"
        />

        <div className="flex-1">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            {country.name.common}
          </h1>
          <Badge className="mb-6">{country.region}</Badge>
          <div className="grid grid-cols-1 gap-4 text-muted-foreground sm:grid-cols-2">
            <p>
              <strong className="text-foreground">Official Name:</strong>{" "}
              {country.name.official}
            </p>
            <p>
              <strong className="text-foreground">Population:</strong>{" "}
              {country.population.toLocaleString()}
            </p>
            <p>
              <strong className="text-foreground">Sub Region:</strong>{" "}
              {country.subregion}
            </p>
            <p>
              <strong className="text-foreground">Capital:</strong>{" "}
              {country.capital?.[0] ?? "N/A"}
            </p>
            <p>
              <strong className="text-foreground">Currencies:</strong>{" "}
              {currencyList || "N/A"}
            </p>
            <p>
              <strong className="text-foreground">Languages:</strong>{" "}
              {languageList || "N/A"}
            </p>
          </div>

          {country.borders && country.borders.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 font-bold text-foreground">Border Countries:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {country.borders.map((code) => (
                  <Link
                    key={code}
                    href={`/country/${code}`}
                    className="rounded-md border border-border bg-card px-3 py-1 text-sm text-card-foreground transition-colors hover:bg-accent"
                  >
                    {code}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
