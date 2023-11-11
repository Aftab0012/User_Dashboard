import React from 'react';

/**
 * Pagination component for navigating through pages of content.
 *
 * @param {number} totalPosts - The total number of posts.
 * @param {number} postsPerPage - The number of posts displayed per page.
 * @param {function} setCurrentPage - A function to set the current page.
 * @param {number} currentPage - The currently active page.
 */
const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  // Calculate the total number of pages
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-wrap justify-center">
      {pages.map((page, index) => (
        <button
          key={index}
          className={`bg-gray-800 text-white w-12 h-12 ml-3 m-2 text-center rounded-full ${
            page === currentPage
              ? 'bg-blue-700 text-white-800'
              : 'hover:bg-blue-500'
          } ${
            page === currentPage ? `${'font-bold scale-125 bg-indigo-600'}` : ''
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
