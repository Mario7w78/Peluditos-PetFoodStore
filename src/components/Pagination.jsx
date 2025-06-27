const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
        pages.push(i);
      } else if (
        (i === currentPage - 2 && currentPage > 3) ||
        (i === currentPage + 2 && currentPage < totalPages - 2)
      ) {
        pages.push("...");
      }
    }

    return [...new Set(pages)];
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 text-gray-600 hover:text-black"
      >
        {"<"}
      </button>
      {getPages().map((page, idx) => (
        <button
          key={idx}
          onClick={() => page !== "..." && onPageChange(page)}
          disabled={page === "..."}
          className={`px-3 py-1 rounded-full ${
            page === currentPage
              ? "bg-blue-700 text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 text-gray-600 hover:text-black"
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;