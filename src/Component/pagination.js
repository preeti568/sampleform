import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = (props) => {
  const { itemCount, pageSize, onPageChange, currentPage } = props;

  const pagesCount = Math.ceil(itemCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {/* <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li> */}
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        {/* <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li> */}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChnage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
export default Pagination;
