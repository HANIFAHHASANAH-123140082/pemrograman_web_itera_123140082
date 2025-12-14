import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext();

export const useBooks = () => {
  const ctx = useContext(BookContext);
  if (!ctx) {
    throw new Error('Harus pake BookProvider');
  }
  return ctx;
};

export const BookProvider = ({ children }) => {
  const [bookData, setBookData] = useLocalStorage('books', []);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchText, setSearchText] = useState('');

  // fungsi buat nambahin buku baru
  const addNewBook = (bookInfo) => {
    const book = {
      id: Date.now(),
      title: bookInfo.title,
      author: bookInfo.author,
      status: bookInfo.status,
      createdAt: new Date().toISOString()
    };
    setBookData([...bookData, book]);
  };

  // fungsi buat edit buku
  const editBook = (bookId, updatedInfo) => {
    const updated = bookData.map(book => {
      if(book.id === bookId) {
        return { ...book, ...updatedInfo };
      }
      return book;
    });
    setBookData(updated);
  };

  // fungsi hapus buku
  const removeBook = (bookId) => {
    const filtered = bookData.filter(book => book.id !== bookId);
    setBookData(filtered);
  };

  // fungsi buat filter dan search
  const getBooks = () => {
    let result = bookData;

    // filter berdasarkan status
    if (statusFilter !== 'all') {
      result = result.filter(book => book.status === statusFilter);
    }

    // filter berdasarkan pencarian
    if (searchText) {
      result = result.filter(book => {
        const titleMatch = book.title.toLowerCase().includes(searchText.toLowerCase());
        const authorMatch = book.author.toLowerCase().includes(searchText.toLowerCase());
        return titleMatch || authorMatch;
      });
    }

    return result;
  };

  const contextValue = {
    bookData,
    statusFilter,
    searchText,
    setStatusFilter,
    setSearchText,
    addNewBook,
    editBook,
    removeBook,
    getBooks
  };

  return (
    <BookContext.Provider value={contextValue}>
      {children}
    </BookContext.Provider>
  );
};