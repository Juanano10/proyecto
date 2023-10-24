import ReactPaginate from "react-paginate";
import React from "react";

function Pagination({ pageCount, handlePageClick }) {
  return (
    <ReactPaginate
      previousLabel={"Anterior"}
      nextLabel={"Siguiente"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}

    />
  );
}

export default Pagination;