import React from 'react';
import Navbar from '../Components/Navbar';
import Tables from '../Components/Tables';

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="container">
      <Navbar />
      <Tables />
    </div>
  );
};

export default Home;
