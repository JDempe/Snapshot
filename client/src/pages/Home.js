import React from 'react';
import PhotoList from '../components/PhotoList';
import CategoryMenu from '../components/CategoryMenu';
import Cart from '../components/Cart';

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <PhotoList />
    </div>
  );
};

export default Home;
