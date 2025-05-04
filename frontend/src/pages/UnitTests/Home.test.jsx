// src/__tests__/Home.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Home from '../Home';

// Mock axios
vi.mock('axios');

const mockCountries = [
  {
    cca3: 'USA',
    cca2: 'US',
    name: { common: 'United States' },
    region: 'Americas',
    flags: { svg: 'https://flagcdn.com/us.svg' },
  },
  {
    cca3: 'FRA',
    cca2: 'FR',
    name: { common: 'France' },
    region: 'Europe',
    flags: { svg: 'https://flagcdn.com/fr.svg' },
  },
];

const mockFavorites = [
  { countryCode: 'US' },
];

describe('Home Page', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url.includes('restcountries')) {
        return Promise.resolve({ data: mockCountries });
      }
      if (url.includes('favorites')) {
        return Promise.resolve({ data: mockFavorites });
      }
      return Promise.reject(new Error('not found'));
    });
  });

  it('renders the hero section and country cards', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Hero text
    expect(screen.getByText(/Explore Our World/i)).toBeInTheDocument();

    // Wait for countries to load
    await waitFor(() => {
      expect(screen.getByText(/United States/i)).toBeInTheDocument();
      expect(screen.getByText(/France/i)).toBeInTheDocument();
    });

    // Check filter components
    expect(screen.getByRole('button', { name: /Show Favorite Countries/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument(); // Assuming SearchBar uses placeholder
  });
});
