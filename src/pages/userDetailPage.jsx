import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from './../GlobalContext/GlobalContext'; // Access global context

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const { users } = useGlobalContext(); // Get users from context
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Check if the user exists in local state first (for newly added users)
    const localUser = users.find(u => u.id === parseInt(id));

    if (localUser) {
      setUser(localUser); // If found locally, set the user
    } else {
      // If not found locally, fetch from the API
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => setUser(response.data))
        .catch(error => console.error('Error fetching user details:', error));
    }
  }, [id, users]);

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <button 
        className="mb-4 bg-gray-400 text-white rounded-md px-4 py-2 hover:bg-gray-500"
        onClick={() => navigate(-1)} // Navigate back
      >
        Back
      </button>
      <h1 className="text-2xl font-bold mb-2 text-center">{user.name}</h1>
      <p className="text-lg text-center">Email: <span className="font-semibold">{user.email}</span></p>
      <p className="text-lg text-center">Phone: <span className="font-semibold">{user.phone}</span></p>
      <p className="text-lg text-center">Username: <span className="font-semibold">{user.username}</span></p>
      <p className="text-lg text-center">Website: <span className="font-semibold">{user.website}</span></p>
      <p className="text-lg text-center">Company: <span className="font-semibold">{user.company.name}</span></p>
      <p className="text-lg text-center">Address: <span className="font-semibold">{`${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}</span></p>
    </div>
  );
};

export default UserDetailPage;
