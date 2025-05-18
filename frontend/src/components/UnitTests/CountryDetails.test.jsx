import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CountryDetails from "../CountryDetails";
import { vi } from "vitest";

// Mock fetch
global.fetch = vi.fn();

const mockCountryData = [{
  name: {
    common: "Testland",
    official: "The Republic of Testland"
  },
  flags: {
    svg: "https://example.com/flag.svg"
  },
  region: "Test Region",
  subregion: "Test Subregion",
  capital: ["Testville"],
  area: 123456,
  latlng: [12.34, 56.78],
  population: 1234567,
  languages: {
    eng: "English"
  },
  currencies: {
    TST: { name: "Test Dollar", symbol: "$" }
  },
  car: { side: "right" },
  timezones: ["UTC+1"],
  idd: {
    root: "+9",
    suffixes: ["99"]
  },
  tld: [".tl"],
  unMember: true,
  independent: true,
  fifa: "TST"
}];

describe("CountryDetails Component", () => {
  beforeEach(() => {
    fetch.mockReset();
  });

  it("renders loading spinner initially", () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCountryData)
    });

    render(
      <MemoryRouter>
        <CountryDetails countryCode="TST" />
      </MemoryRouter>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders error message on fetch failure", async () => {
    fetch.mockRejectedValueOnce(new Error("Fetch failed"));

    render(
      <MemoryRouter>
        <CountryDetails countryCode="TST" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Failed to load country details")).toBeInTheDocument();
    });
  });

  it("renders country information on successful fetch", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCountryData)
    });

    render(
      <MemoryRouter>
        <CountryDetails countryCode="TST" />
      </MemoryRouter>
    );

    // Wait for country name to appear (ensures component finished loading)
    await waitFor(() => {
        expect(screen.getByRole("heading", { name: /Testland/i, level: 1 })).toBeInTheDocument();
      });
      
      

    expect(screen.getByText(/The Republic of Testland/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Test Region/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Testville/i).length).toBeGreaterThan(0);

    expect(screen.getByText(/Test Dollar/)).toBeInTheDocument();
    expect(screen.getByText(/English/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Go Back/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Yes/)[0]).toBeInTheDocument(); // or [1], depending on context


    expect(screen.getByText(/TST/)).toBeInTheDocument(); // FIFA Code
    expect(screen.getByText(".tl")).toBeInTheDocument(); // Top-level domain
    expect(screen.getByText("+999")).toBeInTheDocument(); // Calling code
  });
});
