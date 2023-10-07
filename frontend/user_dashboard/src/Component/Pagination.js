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
    <div>
      {pages.map((page, index) => (
        <button
          key={index}
          className={`bg-gray-800 text-white w-8 h-8 ml-2 text-center rounded-full ${
            page === currentPage
              ? 'bg-blue-500 text-white-800'
              : 'hover:bg-blue-500'
          } ${page === currentPage ? 'font-bold bg-blue-700' : ''}`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
