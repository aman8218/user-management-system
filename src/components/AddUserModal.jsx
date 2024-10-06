import React, { useState } from 'react';

// This is the AddUserModal component which shows a form to add a new user
const AddUserModal = ({ onClose, onAdd }) => {
  // State variables to store user input values
  const [name, setName] = useState(''); // For storing the user's name
  const [email, setEmail] = useState(''); // For storing the user's email
  const [phone, setPhone] = useState(''); // For storing the user's phone number
  const [address, setAddress] = useState({ street: '', city: '' }); // For storing the user's address
  const [companyName, setCompanyName] = useState(''); // For storing the user's company name
  const [website, setWebsite] = useState(''); // For storing the user's website

  // State variable to store validation errors
  const [errors, setErrors] = useState({});

  // Function to validate the form inputs
  const validateForm = () => {
    const newErrors = {}; // Object to store any validation errors
    
    // Check if the name is at least 3 characters long
    if (name.length < 3) newErrors.name = "Name is required and must be at least 3 characters.";
    
    // Check if the email is valid
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is required and must be valid.";
    
    // Check if the phone number is a valid 10-digit number
    if (!/^\d{10}$/.test(phone)) newErrors.phone = "Phone is required and must be a valid 10-digit number.";
    
    // Check if both street and city in the address are provided
    if (address.street === '' || address.city === '') newErrors.address = "Address (Street and City) is required.";
    
    // Check if the company name is at least 3 characters if provided
    if (companyName.length > 0 && companyName.length < 3) newErrors.companyName = "Company name must be at least 3 characters if provided.";
    
    // Check if the website is a valid URL if provided
    if (website && !/^https?:\/\/.+/.test(website)) newErrors.website = "Website must be a valid URL if provided.";

    return newErrors; // Return the validation errors
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    const formErrors = validateForm(); // Validate the form inputs
    if (Object.keys(formErrors).length > 0) { // If there are errors
      setErrors(formErrors); // Set the errors in the state
      return; // Stop the submission
    }

    // Create a new user object with the input values
    const newUser = {
      name,
      email,
      phone,
      address,
      company: { name: companyName }, // Nested object for company
      website,
      username: `USER-${name}` // Auto-filled username based on the name
    };

    onAdd(newUser); // Call the onAdd function passed as prop to add the new user
    onClose(); // Close the modal
  };

  return (
    // Modal layout with a backdrop and centered content
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Add User</h2>
        <form onSubmit={handleSubmit}> {/* Form that triggers handleSubmit on submission */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Name:</label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              value={name} // Bind input value to state
              onChange={(e) => setName(e.target.value)} // Update state on input change
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>} {/* Show error if exists */}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email:</label>
            <input
              type="email" // Input type for email
              className="border border-gray-300 rounded-md p-2 w-full"
              value={email} // Bind input value to state
              onChange={(e) => setEmail(e.target.value)} // Update state on input change
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>} {/* Show error if exists */}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone:</label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              value={phone} // Bind input value to state
              onChange={(e) => setPhone(e.target.value)} // Update state on input change
            />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>} {/* Show error if exists */}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Street:</label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              value={address.street} // Bind input value to state
              onChange={(e) => setAddress({ ...address, street: e.target.value })} // Update state on input change
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">City:</label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              value={address.city} // Bind input value to state
              onChange={(e) => setAddress({ ...address, city: e.target.value })} // Update state on input change
            />
            {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>} {/* Show error if exists */}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Company Name:</label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              value={companyName} // Bind input value to state
              onChange={(e) => setCompanyName(e.target.value)} // Update state on input change
            />
            {errors.companyName && <span className="text-red-500 text-sm">{errors.companyName}</span>} {/* Show error if exists */}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Website:</label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              value={website} // Bind input value to state
              onChange={(e) => setWebsite(e.target.value)} // Update state on input change
            />
            {errors.website && <span className="text-red-500 text-sm">{errors.website}</span>} {/* Show error if exists */}
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">
              Add User {/* Button to submit the form */}
            </button>
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-400">
              Cancel {/* Button to close the modal without adding a user */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal; // Export the AddUserModal component for use in other parts of the application
