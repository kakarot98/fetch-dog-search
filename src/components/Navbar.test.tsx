import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';

// Mock the navigate function
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Navbar', () => {
  const onLogoutMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Navbar with title and logout button', () => {
    render(
      <BrowserRouter>
        <Navbar onLogout={onLogoutMock} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Fetch Dog Search/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
  });

  test('calls onLogout when logout button is clicked', () => {
    render(
      <BrowserRouter>
        <Navbar onLogout={onLogoutMock} />
      </BrowserRouter>
    );

    const logoutButton = screen.getByRole('button', { name: /Logout/i });
    fireEvent.click(logoutButton);

    expect(onLogoutMock).toHaveBeenCalledTimes(1);
  });

  test('toggles theme when theme toggle button is clicked', () => {
    render(
      <BrowserRouter>
        <Navbar onLogout={onLogoutMock} />
      </BrowserRouter>
    );

    const themeToggleButton = screen.getByRole('button', { name: /Light Mode/i });
    expect(themeToggleButton).toBeInTheDocument();

    fireEvent.click(themeToggleButton);
    expect(themeToggleButton).toHaveTextContent(/Dark Mode/i);
  });
});
