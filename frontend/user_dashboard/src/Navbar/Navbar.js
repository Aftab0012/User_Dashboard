import React from 'react';

const Navbar = ({ openNewUserForm }) => {
  return (
    <div className="flex justify-between items-center px-7 py-3 w-screen bg-[#1e293b]">
      <p className="font-bold text-4xl font-mono text-white">DashBoard</p>
      <div>
        <button
          onClick={openNewUserForm}
          className="text-white rounded-md font-bold outline-none bg-green-500 hover:bg-green-600 px-6 py-1"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Navbar;
