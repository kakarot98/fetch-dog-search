
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from './LoginPage';
import { BrowserRouter } from 'react-router-dom';
import { loginUser } from '../../utils/fetchAPI';


jest.mock('../../utils/fetchAPI', () => ({
  loginUser: jest.fn(),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('LoginPage', () => {
  const onLoginMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form correctly', () => {
    renderWithRouter(<LoginPage onLogin={onLoginMock} />);

    expect(screen.getByText(/Welcome to Fetch's Dog Search Application/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('allows user to login successfully', async () => {
    (loginUser as jest.Mock).mockResolvedValueOnce({});

    renderWithRouter(<LoginPage onLogin={onLoginMock} />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'john@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith('John Doe', 'john@example.com');
      expect(onLoginMock).toHaveBeenCalled();
    });
  });

  test('displays error message on login failure', async () => {
    (loginUser as jest.Mock).mockRejectedValueOnce(new Error('Invalid credentials'));

    renderWithRouter(<LoginPage onLogin={onLoginMock} />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'jane@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    const errorMessage = await screen.findByText(/Invalid login. Please check your credentials./i);
    expect(errorMessage).toBeInTheDocument();
    expect(loginUser).toHaveBeenCalledWith('Jane Doe', 'jane@example.com');
    expect(onLoginMock).not.toHaveBeenCalled();
  });
});
