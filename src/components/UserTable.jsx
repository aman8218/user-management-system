import React, { useEffect, useState } from 'react';
import { useGlobalContext } from './../GlobalContext/GlobalContext';
import { Link } from 'react-router-dom';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';

const UserTable = () => {
  const { loading, users, deleteUser, addUser, editUser, getUsers } = useGlobalContext();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editUserState, setEditUserState] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <button 
        className="mb-4 bg-blue-500 text-white rounded-md px-3 py-1 hover:bg-blue-600" 
        onClick={() => setShowAddModal(true)}
      >
        Add User
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-1 px-1 text-xs md:text-sm">Name</th>
              <th className="py-1 px-1 text-xs md:text-sm">Email</th>
              <th className="py-1 px-1 text-xs md:text-sm">Phone</th>
              <th className="py-1 px-1 text-xs md:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-1 px-1 text-xs md:text-sm">
                    <Link to={`/user/${user.id}`} className="text-blue-600 hover:underline">{user.name}</Link>
                  </td>
                  <td className="py-1 px-1 text-xs md:text-sm">{user.email}</td>
                  <td className="py-1 px-1 text-xs md:text-sm">{user.phone}</td>
                  <td className="py-1 px-1 text-xs md:text-sm">
                    <button 
                      className="mr-1 bg-yellow-500 text-white rounded-md px-1 py-1 hover:bg-yellow-600" 
                      onClick={() => setEditUserState(user)}
                    >
                      Edit
                    </button>
                    <button 
                      className="bg-red-500 text-white rounded-md px-1 py-1 hover:bg-red-600 mt-1" 
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-2 text-xs md:text-sm">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals for Add and Edit */}
      {showAddModal && (
        <AddUserModal onClose={() => setShowAddModal(false)} onAdd={addUser} />
      )}
      {editUserState && (
        <EditUserModal
          user={editUserState}
          onClose={() => setEditUserState(null)}
          editUser={editUser}
        />
      )}
    </>
  );
};

export default UserTable;
