import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./productList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from "../../../redux/features/saleStackTrash/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  getSaleSingleTrashItem,
  deleteSaleTrashItem,
  SaleStackTrashList,
  EmptySaleTrashList,
} from "../../../redux/features/saleStackTrash/saleStackTrashSlice";
import { saleProducts } from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const productIcon = <BsCart2 size={30} color="blue" />;

const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredPoducts);
  const TrashItem = useSelector((state) => state.saleTrash.saletrashItem);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delSaleTrashItem = async (id) => {
    await dispatch(deleteSaleTrashItem(id));
    await dispatch(SaleStackTrashList());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delSaleTrashItem(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  const EmptyTrashList = async () => {
    await dispatch(EmptySaleTrashList());
    await dispatch(SaleStackTrashList());
  };

  const EmptySaleTrash = () => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => EmptyTrashList(),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const RevertItem = async (id) => {
    await dispatch(getSaleSingleTrashItem(id));

    if (TrashItem) {
      const formData = new FormData();
      formData.append("name", TrashItem?.name);
      formData.append("sku", TrashItem?.sku);
      formData.append("category", TrashItem?.category);
      formData.append("quantity", Number(TrashItem?.quantity));
      formData.append("purchasePrice", TrashItem?.purchasePrice);
      formData.append("unitPrice", TrashItem?.unitPrice);
      formData.append("totalPrice", TrashItem?.totalPrice);
      formData.append("color", TrashItem?.color);
      formData.append("type", TrashItem?.type);
      formData.append("description", TrashItem?.description);
      formData.append("image", TrashItem?.productImage);
      await dispatch(saleProducts({ id, formData }));
      // await dispatch(deleteSaleTrashItem(id));
      await dispatch(SaleStackTrashList());
      return;
    }
    toast.error("trash Item not Found");
  };
  const RevertTrashItem = (id) => {
    confirmAlert({
      title: "Revert Trash Item",
      message: "Revert Trashed Sale Item.",
      buttons: [
        {
          label: "Revert",
          onClick: async () => await RevertItem(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
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
      <button
        onClick={() => {
          EmptySaleTrash();
        }}
        className="--btn --btn-primary"
      >
        Empty List
      </button>
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Sale Items List</h3>
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
            <p>-- No Sale found, please do a Sale...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Purchase</th>
                  <th>Sale</th>
                  <th>Quantity</th>
                  <th>Sale Price Total</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((product, index) => {
                  const {
                    _id,
                    name,
                    category,
                    purchasePrice,
                    unitPrice,
                    quantity,
                  } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>
                        &#1547;
                        {purchasePrice}
                      </td>
                      <td>
                        &#1547;
                        {unitPrice}
                      </td>
                      <td>{quantity}</td>

                      <td>
                        &#1547;
                        {unitPrice * quantity}
                      </td>
                      <td style={{ textAlign: "center" }} className="icons">
                        <span title="view">
                          <Link to={`/saletrash-item/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span title="edit">
                          <FaEdit
                            size={20}
                            color={"green"}
                            onClick={() => RevertTrashItem(_id)}
                          />
                        </span>

                        <span title="delete">
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
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
