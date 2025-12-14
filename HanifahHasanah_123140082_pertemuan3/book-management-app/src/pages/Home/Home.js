import React from 'react';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <BookForm />
      <BookFilter />
      <BookList />
    </div>
  );
};

export default Home;