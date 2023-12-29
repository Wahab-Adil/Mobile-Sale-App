import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../../loader/Loader";
import "./productList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredExpense,
} from "../../../../redux/features/expense/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteLoan,
  getAllLoans,
} from "../../../../redux/features/loan/loanSlice";
import { FcAddDatabase } from "react-icons/fc";

import { Link } from "react-router-dom";
const productIcon = <BsCart2 size={30} color="blue" />;

const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredExpense);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delProduct = async (id) => {
    await dispatch(deleteLoan(id));
    await dispatch(getAllLoans());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Loan",
      message: "Are you sure you want to delete this Loan.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Loan List</h3>
          </span>

          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>-- No product found, please add a product...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Customer Name</th>
                  <th>Narration</th>
                  <th>Paid</th>
                  <th>Recived</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems?.map((product, index) => {
                  const { _id, to, paid, narration, recieved } = product;
                  return (
                    <tr style={{ border: "1px solid  black" }} key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(to, 16)}</td>
                      <td>{narration}</td>
                      <td>
                        &#1547;
                        {paid}
                      </td>{" "}
                      <td>
                        &#1547;
                        {recieved}
                      </td>{" "}
                      <td style={{ textAlign: "center" }} className="icons">
                        <span title="view">
                          <Link to={`/loan-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span title="edit">
                          <Link to={`/edit-loan/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default ProductList;
