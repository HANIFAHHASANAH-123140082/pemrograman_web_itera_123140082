import { render, screen } from '@testing-library/react';
import App from '../App';

test('menampilkan judul aplikasi', () => {
  render(<App />);
  const titleElement = screen.getByText(/Aplikasi Buku Saya/i);
  expect(titleElement).toBeInTheDocument();
});
