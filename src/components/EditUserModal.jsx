import React, { useState, useEffect } from 'react';

const EditUserModal = ({ user, onClose, editUser }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  }, [user]);

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.name.length < 3) newErrors.name = "Name is required and must be at least 3 characters.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is required and must be valid.";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone is required and must be a valid 10-digit number.";
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const updatedUser = { ...user, ...formData }; // Merge updated data with the existing user object
    editUser(updatedUser); // Call the editUser function from context
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
          </div>
          <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Save Changes
          </button>
        </form>
        <button onClick={onClose} className="mt-4 bg-gray-200 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditUserModal;
