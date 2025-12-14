import React from 'react';
import { useBooks } from '../../context/BookContext';
import './BookFilter.css';

const BookFilter = () => {
  const { statusFilter, setStatusFilter, searchText, setSearchText } = useBooks();

  return (
    <div className="book-filter">
      <div className="search-box">
        <input
          type="text"
          placeholder="Cari judul atau penulis..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="filter-buttons">
        <button
          className={statusFilter === 'all' ? 'active' : ''}
          onClick={() => setStatusFilter('all')}
        >
          Semua Buku
        </button>
        <button
          className={statusFilter === 'milik' ? 'active' : ''}
          onClick={() => setStatusFilter('milik')}
        >
          Sudah Punya
        </button>
        <button
          className={statusFilter === 'baca' ? 'active' : ''}
          onClick={() => setStatusFilter('baca')}
        >
          Lagi Baca
        </button>
        <button
          className={statusFilter === 'beli' ? 'active' : ''}
          onClick={() => setStatusFilter('beli')}
        >
          Mau Beli
        </button>
      </div>
    </div>
  );
};

export default BookFilter;