import React from 'react';

/**
 * Navbar component for the application's navigation bar.
 *
 * @param {function} openNewUserForm - A function to open the new user form.
 */
const Navbar = ({ openNewUserForm }) => {
  return (
    <div className="flex flex-row sm:justify-between justify-between items-center px-7 py-5 w-screen bg-[#1e293b]">
      <p className="font-mono text-4xl font-bold text-white md:mb-0">
        {/* <span className="py-2 pl-2 pr-1 mr-2 font-mono text-black bg-orange-600 rounded-xl"> */}
        Dash
        {/* </span> */}
        Board
      </p>
      <div className="mt-2 md:mt-0">
        <button
          onClick={openNewUserForm}
          className="px-6 py-2 font-bold text-white bg-green-500 rounded-md outline-none hover:bg-green-600 md:px-6 md:py-2"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Navbar;
