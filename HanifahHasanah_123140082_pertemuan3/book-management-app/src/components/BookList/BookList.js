import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext';
import BookForm from '../BookForm/BookForm';
import './BookList.css';

const BookList = () => {
  const { getBooks, removeBook } = useBooks();
  const [editingBook, setEditingBook] = useState(null);
  const books = getBooks();

  const handleDelete = (id) => {
    const konfirmasi = window.confirm('Yakin mau hapus buku ini?');
    if (konfirmasi) {
      removeBook(id);
    }
  };

  const getLabelStatus = (status) => {
    if(status === 'milik') return 'Sudah Punya';
    if(status === 'baca') return 'Lagi Dibaca';
    if(status === 'beli') return 'Mau Beli';
    return status;
  };

  // kalau lagi edit, tampilkan form edit
  if (editingBook) {
    return (
      <BookForm
        bookToEdit={editingBook}
        onCancel={() => setEditingBook(null)}
      />
    );
  }

  // kalau belum ada buku
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <p>📚 Belum ada buku nih, yuk tambahin!</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map(book => (
        <div key={book.id} className="book-card">
          <div className="book-header">
            <h3>{book.title}</h3>
            <span className={`status-badge status-${book.status}`}>
              {getLabelStatus(book.status)}
            </span>
          </div>
          <p className="book-author">Penulis: {book.author}</p>
          <div className="book-actions">
            <button
              onClick={() => setEditingBook(book)}
              className="btn-edit"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => handleDelete(book.id)}
              className="btn-delete"
            >
              🗑️ Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;