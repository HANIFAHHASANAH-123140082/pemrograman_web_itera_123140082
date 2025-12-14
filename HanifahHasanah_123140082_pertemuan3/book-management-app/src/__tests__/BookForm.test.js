import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from '../components/BookForm/BookForm';
import { BookProvider } from '../context/BookContext';

// test buat form tambah buku
test('form bisa render dengan benar', () => {
  render(
    <BookProvider>
      <BookForm />
    </BookProvider>
  );
  
  expect(screen.getByText(/Tambah Buku Baru/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Masukkan judul buku/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Masukkan nama penulis/i)).toBeInTheDocument();
});

// test validasi form
test('validasi error muncul kalau form kosong', () => {
  render(
    <BookProvider>
      <BookForm />
    </BookProvider>
  );
  
const submitBtn = screen.getByRole('button', { name: /Tambah Buku/i });
fireEvent.click(submitBtn);
  
  expect(screen.getByText(/Judul tidak boleh kosong/i)).toBeInTheDocument();
  expect(screen.getByText(/Penulis tidak boleh kosong/i)).toBeInTheDocument();
});

// test input judul
test('bisa input judul buku', () => {
  render(
    <BookProvider>
      <BookForm />
    </BookProvider>
  );
  
  const inputJudul = screen.getByPlaceholderText(/Masukkan judul buku/i);
  fireEvent.change(inputJudul, { target: { value: 'Harry Potter' } });
  
  expect(inputJudul.value).toBe('Harry Potter');
});

// test input penulis
test('bisa input nama penulis', () => {
  render(
    <BookProvider>
      <BookForm />
    </BookProvider>
  );
  
  const inputPenulis = screen.getByPlaceholderText(/Masukkan nama penulis/i);
  fireEvent.change(inputPenulis, { target: { value: 'J.K. Rowling' } });
  
  expect(inputPenulis.value).toBe('J.K. Rowling');
});