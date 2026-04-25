// components/__tests__/CountryCard.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { CountryCard } from "@/components/CountryCard";

const mockCountry = {
  cca3: "EGY",
  name: { common: "Egypt", official: "Arab Republic of Egypt" },
  flags: { png: "https://flagcdn.com/eg.png", alt: "Egypt flag" },
  population: 102334404,
  region: "Africa",
  subregion: "Northern Africa",
  capital: ["Cairo"],
  currencies: { EGP: { name: "Egyptian pound", symbol: "£" } },
  languages: { ara: "Arabic" },
  borders: [],
};

// test 1 — does it render the country name?
test("renders country name", () => {
  render(<CountryCard country={mockCountry} />);
  expect(screen.getByText("Egypt")).toBeInTheDocument();
});

// test 2 — does it show the region?
test("renders region badge", () => {
  render(<CountryCard country={mockCountry} />);
  expect(screen.getByText("Africa")).toBeInTheDocument();
});

// test 3 — does the favourite button work?
test("toggles favourite on button click", () => {
  render(<CountryCard country={mockCountry} />);
  const button = screen.getByRole("button", { name: /Add Favourite/i });
  fireEvent.click(button);  
  expect(screen.getByRole("button", { name: /Remove Favourite/i })).toBeInTheDocument();
});
