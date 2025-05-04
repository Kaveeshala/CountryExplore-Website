import { render, screen, fireEvent } from "@testing-library/react";
import CountryCard from "../CountryCard";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

// Mock the Ant Design message module to avoid actual popups during tests
vi.mock("antd", async () => {
  const antd = await vi.importActual("antd");
  return {
    ...antd,
    message: {
      success: vi.fn(),
      warning: vi.fn(),
      error: vi.fn()
    }
  };
});

describe("CountryCard", () => {
  const mockCountry = {
    cca2: "US",
    name: { common: "United States" },
    flags: { png: "https://flagcdn.com/us.png" },
    capital: ["Washington, D.C."],
    currencies: {
      USD: { name: "United States Dollar" }
    },
    languages: {
      eng: "English"
    }
  };

  const setup = (favoriteCountries = [], setFavoriteCountries = vi.fn()) => {
    render(
      <MemoryRouter>
        <CountryCard
          country={mockCountry}
          favoriteCountries={favoriteCountries}
          setFavoriteCountries={setFavoriteCountries}
        />
      </MemoryRouter>
    );
  };

  it("renders country card data correctly", () => {
    setup();
    expect(screen.getByText("United States")).toBeInTheDocument();
  });

  it("adds to favorites on heart icon click when not favorite", async () => {
    localStorage.setItem("token", "mock-token");
    const setFavoriteCountries = vi.fn();
    setup([], setFavoriteCountries);
  
    const favoriteToggle = screen.getByLabelText("favorite-toggle");
    fireEvent.click(favoriteToggle);
  
    // Add assertions here, like:
    // expect(setFavoriteCountries).toHaveBeenCalled();
  });
  

  it("adds to favorites on heart icon click when not favorite", async () => {
    localStorage.setItem("token", "mock-token");
    const setFavoriteCountries = vi.fn();
    setup([], setFavoriteCountries);
  
    const images = screen.getAllByRole("img", { hidden: true });
    const heartIcon = images.find(img => img.closest("span")?.getAttribute("aria-label") === "heart");
  
    fireEvent.click(heartIcon);
    // You can assert setFavoriteCountries or mock axios call here
  });
  
  it("adds to favorites on heart icon click when not favorite", async () => {
    localStorage.setItem("token", "mock-token");
    const setFavoriteCountries = vi.fn();
    setup([], setFavoriteCountries);
  
    const heartIcon = screen.getByLabelText("heart");
    fireEvent.click(heartIcon);
  
    // Add your expectations here, like:
    // expect(setFavoriteCountries).toHaveBeenCalled();
  });
  
  it("removes from favorites on heart icon click when already favorite", () => {
    localStorage.setItem("token", "mock-token");
    const setFavoriteCountries = vi.fn();
    setup([mockCountry], setFavoriteCountries);
  
    const heartIcon = screen.getByLabelText("favorite-toggle");
    fireEvent.click(heartIcon);
    
  
    // Add your expectations here, like:
    // expect(setFavoriteCountries).toHaveBeenCalled();
  });
  
  
});
