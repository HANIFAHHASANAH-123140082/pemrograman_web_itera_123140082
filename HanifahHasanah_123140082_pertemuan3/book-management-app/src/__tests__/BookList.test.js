import { render, screen } from '@testing-library/react';
import BookList from '../components/BookList/BookList';
import { BookProvider } from '../context/BookContext';

// test tampilan kosong
test('tampil pesan kosong kalau belum ada buku', () => {
  render(
    <BookProvider>
      <BookList />
    </BookProvider>
  );
  
  expect(screen.getByText(/Belum ada buku nih/i)).toBeInTheDocument();
});