import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";

function Pagination({ handlePageClick, pageCount }) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">>"
      previousLabel="<<"
      onPageChange={handlePageClick}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      containerClassName="relative flex justify-center items-center my-5 space-x-2 w-full"
      previousClassName="absolute left-0 text-black hover:text-gray-700 font-normal"
      nextClassName="absolute right-0 text-black hover:text-gray-700 font-normal"
      pageClassName="text-black  rounded-lg cursor-pointer px-2 py-1"
      activeClassName="border border-[#D9F99D]"
      renderOnZeroPageCount={null}
    />
  );
}

Pagination.propTypes = {
  handlePageClick: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
};

export default Pagination;
