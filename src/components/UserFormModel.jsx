import React, { useState } from 'react';
import axios from 'axios';

const UserFormModal = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState({ street: '', city: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, phone, username, address };
    axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      .then(response => {
        onSave(response.data);
        onClose();
      })
      .catch(error => console.error('Error creating user:', error));
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>Create User</h2>
        <label>Name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label>Phone:</label>
        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
        <label>Address:</label>
        <input type="text" placeholder="Street" value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} />
        <input type="text" placeholder="City" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserFormModal;
