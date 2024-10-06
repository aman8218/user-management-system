import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const GlobalContext = createContext();

const Base_Url = 'https://jsonplaceholder.typicode.com/users';

export const GlobalProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flashMessage, setFlashMessage] = useState(null); // State for flash messages

  // Fetch users from API
  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(Base_Url);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setFlashMessage("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new user (mock user, doesn't persist in real API)
  const addUser = (newUser) => {
    const userWithId = { ...newUser, id: Date.now() }; // Mock ID for new user
    setUsers(prevUsers => [...prevUsers, userWithId]);
    setFlashMessage("User added successfully!"); // Set flash message
  };

  // Edit an existing user
  const editUser = (updatedUser) => {
    setUsers(prevUsers =>
      prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user))
    );
    setFlashMessage("User updated successfully!"); // Set flash message
  };

  // Delete a user
  const deleteUser = (id) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    setFlashMessage("User deleted successfully!"); // Set flash message
  };

  // Clear flash message after a timeout
  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage(null);
      }, 3000); // Clear message after 3 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount or message change
    }
  }, [flashMessage]);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ users, loading, getUsers, addUser, editUser, deleteUser, flashMessage }}
    >
      {children}
      {flashMessage && <div className="fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg transition-opacity duration-500 ease-in-out opacity-100">{flashMessage}</div>} {/* Display flash message */}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
