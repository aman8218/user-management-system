import React from 'react';
import UserTable from '../components/UserTable';

const Home = () => {
  return (
    <div className="text-center"> {/* Center the heading */}
      <h1 className="text-2xl font-bold mb-6">Users List</h1> {/* Styled heading */}
      <UserTable />
    </div>
  );
};

export default Home;
