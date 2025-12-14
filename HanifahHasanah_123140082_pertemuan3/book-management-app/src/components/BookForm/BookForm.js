import React, { useState, useEffect } from 'react';
import { useBooks } from '../../context/BookContext';
import './BookForm.css';

const BookForm = ({ bookToEdit, onCancel }) => {
  const { addNewBook, editBook } = useBooks();
  
  const [judul, setJudul] = useState('');
  const [penulis, setPenulis] = useState('');
  const [statusBuku, setStatusBuku] = useState('milik');
  const [errorJudul, setErrorJudul] = useState('');
  const [errorPenulis, setErrorPenulis] = useState('');

  // kalau ada buku yang mau diedit, isi formnya
  useEffect(() => {
    if (bookToEdit) {
      setJudul(bookToEdit.title);
      setPenulis(bookToEdit.author);
      setStatusBuku(bookToEdit.status);
    }
  }, [bookToEdit]);

  // validasi input
  const cekValidasi = () => {
    let valid = true;
    
    if (judul.trim() === '') {
      setErrorJudul('Judul tidak boleh kosong');
      valid = false;
    } else {
      setErrorJudul('');
    }
    
    if (penulis.trim() === '') {
      setErrorPenulis('Penulis tidak boleh kosong');
      valid = false;
    } else {
      setErrorPenulis('');
    }

    return valid;
  };

  // handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!cekValidasi()) {
      return;
    }

    const dataForm = {
      title: judul,
      author: penulis,
      status: statusBuku
    };

    if (bookToEdit) {
      // mode edit
      editBook(bookToEdit.id, dataForm);
      onCancel();
    } else {
      // mode tambah baru
      addNewBook(dataForm);
      // reset form
      setJudul('');
      setPenulis('');
      setStatusBuku('milik');
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{bookToEdit ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>
      
      <div className="form-group">
        <label>Judul Buku *</label>
        <input
          type="text"
          value={judul}
          onChange={(e) => {
            setJudul(e.target.value);
            if(e.target.value.trim()) setErrorJudul('');
          }}
          placeholder="Masukkan judul buku"
          className={errorJudul ? 'error' : ''}
        />
        {errorJudul && <span className="error-message">{errorJudul}</span>}
      </div>

      <div className="form-group">
        <label>Nama Penulis *</label>
        <input
          type="text"
          value={penulis}
          onChange={(e) => {
            setPenulis(e.target.value);
            if(e.target.value.trim()) setErrorPenulis('');
          }}
          placeholder="Masukkan nama penulis"
          className={errorPenulis ? 'error' : ''}
        />
        {errorPenulis && <span className="error-message">{errorPenulis}</span>}
      </div>

      <div className="form-group">
        <label>Status Buku *</label>
        <select
          value={statusBuku}
          onChange={(e) => setStatusBuku(e.target.value)}
        >
          <option value="milik">Sudah Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {bookToEdit ? 'Update' : 'Tambah'} Buku
        </button>
        {bookToEdit && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            Batal
          </button>
        )}
      </div>
    </form>
  );
};

export default BookForm;