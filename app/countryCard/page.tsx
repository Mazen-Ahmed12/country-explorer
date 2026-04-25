// app/countryCard/page.tsx
"use client"
import { CountryCard } from "@/components/CountryCard";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

async function fetchCountry(cca3: string): Promise<any> {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}?fields=name,flags,population,region,capital,cca3,borders,currencies,languages,subregion`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default function CountryCardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cca3 = searchParams.get('cca3') || 'CIV'; // Default to Ivory Coast if not provided

  const {
    data: country,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['country', cca3],
    queryFn: () => fetchCountry(cca3),
  });

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Error: {error.message}</div>;

  return (
    <main className="p-6">
      <div className="flex flex-row items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">{country?.name.common}</h1>
        <Button className="h-8 w-28" onClick={() => router.push("/favoutites")}>
          Favourites
        </Button>
      </div>
      <CountryCard country={country} />
    </main>
  );
}
