import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { vi } from 'vitest';
import Home from '../Home';

// ✅ Mock image import
vi.mock('../assets/images/countryCard.jpg', () => 'mapCountry.jpg');

// ✅ Mock axios
vi.mock('axios');

// ✅ Mock window.matchMedia
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

// ✅ Sample mock data
const mockCountries = [
  {
    name: { common: 'Germany' },
    region: 'Europe',
    cca2: 'DE',
    cca3: 'DEU',
    flags: { png: 'germany.png' }
  },
  {
    name: { common: 'Kenya' },
    region: 'Africa',
    cca2: 'KE',
    cca3: 'KEN',
    flags: { png: 'kenya.png' }
  }
];

const mockFavorites = [
  { countryCode: 'DE' }
];

describe('Home Integration Test', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url === 'https://restcountries.com/v3.1/all') {
        return Promise.resolve({ data: mockCountries });
      }
      if (url === 'https://countryname-backend.onrender.com/api/favorites') {
        return Promise.resolve({ data: mockFavorites });
      }
    });

    localStorage.setItem('token', 'mock-token');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders hero section and country cards', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('Explore Our World')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Germany')).toBeInTheDocument();
      expect(screen.getByText('Kenya')).toBeInTheDocument();
    });
  });

  it('filters countries by search', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('Germany'));

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Kenya' } });

    await waitFor(() => {
      expect(screen.queryByText('Germany')).not.toBeInTheDocument();
      expect(screen.getByText('Kenya')).toBeInTheDocument();
    });
  });

  it('toggles favorite countries only', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('Germany'));

    const toggleBtn = screen.getByRole('button', { name: /show favorite countries/i });
    fireEvent.click(toggleBtn);

    await waitFor(() => {
      expect(screen.getByText('Germany')).toBeInTheDocument();
      expect(screen.queryByText('Kenya')).not.toBeInTheDocument();
    });
  });

  it('shows no results if no match', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('Germany'));

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'XYZ' } });

    await waitFor(() => {
      expect(screen.queryByText('Germany')).not.toBeInTheDocument();
      expect(screen.getByText('No countries found.')).toBeInTheDocument();
    });
  });
});
