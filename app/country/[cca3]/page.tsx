"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Country } from "@/app/country";

async function fetchData(code: string): Promise<Country> {
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha/${code}?fields=name,flags,population,region,capital,cca3,borders,currencies,languages,subregion`,
  );
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default function CountryDetail() {
  // get the country name from the URL e.g. /country/Egypt → name = "Egypt"
  const params = useParams();
  const router = useRouter();
  const cca3 = params.cca3 as string;

  const {
    data: country,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["country", cca3],
    queryFn: () => fetchData(cca3),
  });

  if (isLoading) return <div className="text-center mt-20">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500 mt-20">
        Error: {error.message}
      </div>
    );

  // get the first result from the array
  if (!country) return <p>Country not found.</p>;
  // convert currencies object to readable string e.g. "Egyptian Pound (EGP)"
  const currencyList = Object.entries(country.currencies ?? {})
    .map(([code, val]) => `${val.name} (${code})`)
    .join(", ");

  // convert languages object to readable string e.g. "Arabic"
  const languageList = Object.values(country.languages ?? {}).join(", ");

  return (
    <div>
      <Button variant="outline" onClick={() => router.back()} className="mb-8">
        ← Back
      </Button>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Flag */}
        <img
          src={country.flags.png}
          alt={country.flags.alt}
          className="w-full lg:w-1/2 rounded-lg shadow-md object-cover"
        />

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 dark:text-white">
            {country.name.common}
          </h1>
          <Badge className="mb-6">{country.region}</Badge>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Official Name:</strong> {country.name.official}
            </p>
            <p>
              <strong>Population:</strong> {country.population.toLocaleString()}
            </p>
            <p>
              <strong>Sub Region:</strong> {country.subregion}
            </p>
            <p>
              <strong>Capital:</strong> {country.capital?.[0] ?? "N/A"}
            </p>
            <p>
              <strong>Currencies:</strong> {currencyList || "N/A"}
            </p>
            <p>
              <strong>Languages:</strong> {languageList || "N/A"}
            </p>
          </div>

          {/* Border countries — each one is clickable */}
          {country.borders && country.borders.length > 0 && (
            <div className="mt-6">
              <p className="font-bold mb-3 dark:text-white">
                Border Countries:
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {country.borders.map((code) => (
                  <p
                    key={code}
                    className="bg-white text-black px-2 py-1 rounded hover:underline"
                  >
                    {code}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
