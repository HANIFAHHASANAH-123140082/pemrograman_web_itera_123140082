import { useMemo } from 'react';
import { useBooks } from '../context/BookContext';

// hook buat ngitung statistik buku
const useBookStats = () => {
  const { bookData } = useBooks();

  const statistics = useMemo(() => {
    let totalBooks = bookData.length;
    let ownedBooks = 0;
    let readingBooks = 0;
    let wishlistBooks = 0;

    // hitung satu-satu
    for(let i = 0; i < bookData.length; i++) {
      if(bookData[i].status === 'milik') {
        ownedBooks++;
      } else if(bookData[i].status === 'baca') {
        readingBooks++;
      } else if(bookData[i].status === 'beli') {
        wishlistBooks++;
      }
    }

    return {
      total: totalBooks,
      owned: ownedBooks,
      reading: readingBooks,
      wishlist: wishlistBooks
    };
  }, [bookData]);

  return statistics;
};

export default useBookStats;