import React from 'react';

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div>
      {pages.map((page, index) => (
        <button
          key={index}
          className={`bg-gray-800 text-white w-8 h-8 ml-2 text-center rounded-full ${
            page === currentPage
              ? 'bg-blue-500 text-white-800'
              : 'hover:bg-blue-500'
          } ${page === currentPage ? 'font-bold bg-blue-600' : ''}`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
