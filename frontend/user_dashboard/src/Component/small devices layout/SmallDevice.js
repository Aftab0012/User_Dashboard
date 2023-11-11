import React from 'react';

const SmallDevice = ({ openForm, handleDelete, currentPosts }) => {
  return (
    <div className="flex flex-wrap justify-center w-full gap-3">
      {currentPosts.map((user) => (
        <div
          key={user._id}
          className="w-[250px] transition-transform transform hover:scale-105 mx-1 my-1 rounded-lg text-white bg-[#374151] p-3"
        >
          <p className="text-2xl font-bold leading-relaxed">
            {user.firstname} {user.lastname}
          </p>
          <p className="mb-2 text-sm font-medium text-gray-300">{user.email}</p>
          <p className="font-semibold leading-snug">{user.department}</p>
          <div className="flex mt-4">
            <div className="mr-2">
              <button
                onClick={() => openForm(user._id)}
                className="px-4 py-1 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
            <div>
              <button
                onClick={() => handleDelete(user._id)}
                className="px-4 py-1 font-semibold text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SmallDevice;
