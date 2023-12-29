import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./productList.scss";
import { FaTrashAlt } from "react-icons/fa";
import { FcReuse, FcCamera, FcFullTrash } from "react-icons/fc";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from "../../../redux/features/product/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  getSingleTrashItemFun,
  deleteTrashItem,
  AvaliableStackTrashList,
  EmptyTrashList,
  DelproductWithBelongedSale,
} from "../../../redux/features/avaliableStackTrash/avaliableStackTrashSlice";
import { Link } from "react-router-dom";
import { createProduct } from "../../../redux/features/product/productSlice";
import { toast } from "react-toastify";

const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredPoducts);
  const ProductTrashItem = useSelector(
    (state) => state.avaliableStkTrash.trashItem
  );

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  const emptyTrash = async () => {
    await dispatch(EmptyTrashList());
    await dispatch(AvaliableStackTrashList());
  };

  const delTrashItem = async (id) => {
    await dispatch(deleteTrashItem(id));
    await dispatch(AvaliableStackTrashList());
  };
  const delWithSales = async (id) => {
    await dispatch(DelproductWithBelongedSale(id));
    await dispatch(AvaliableStackTrashList());
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
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete Product",
          onClick: () => delTrashItem(id),
        },
        {
          label: "Delete Product With Belonged Sales",
          onClick: () => delWithSales(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  const EmptyList = () => {
    confirmAlert({
      title: "Delete Product",
      message: "Empty Trash.",
      buttons: [
        {
          label: "Delete",
          onClick: async () => await emptyTrash(),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  const RevertItem = async (id) => {
    await dispatch(getSingleTrashItemFun(id));
    if (ProductTrashItem) {
      const formData = new FormData();
      formData.append("name", ProductTrashItem?.name);
      formData.append("sku", ProductTrashItem?.category);
      formData.append("category", ProductTrashItem?.category);
      formData.append("quantity", Number(ProductTrashItem?.quantity));
      formData.append("purchasePrice", ProductTrashItem?.purchasePrice);
      formData.append("salePrice", ProductTrashItem?.salePrice);
      formData.append("color", ProductTrashItem?.color);
      formData.append("type", ProductTrashItem?.type);
      formData.append("description", ProductTrashItem?.description);
      formData.append("image", ProductTrashItem?.productImage);
      await dispatch(createProduct(formData));
      await dispatch(deleteTrashItem(id));
      await dispatch(AvaliableStackTrashList());
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

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <button
            onClick={() => {
              EmptyList();
            }}
            className="--btn --btn-primary"
          >
            Empty List
          </button>
          <span>
            <h3>Inventory Items</h3>
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
                  <th>Name</th>
                  <th>Category</th>
                  <th>Purchase</th>
                  <th>Sale</th>
                  <th>Quantity</th>
                  <th>Purchase Price Total</th>
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
                    salePrice,
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
                        {salePrice}
                      </td>
                      <td>{quantity}</td>
                      <td>
                        &#1547;
                        {purchasePrice * quantity}
                      </td>
                      <td>
                        &#1547;
                        {salePrice * quantity}
                      </td>
                      <td style={{ textAlign: "center" }} className="icons">
                        <span title="view">
                          <Link to={`/detail-trash-item/${_id}`}>
                            <FcCamera size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span title="Revert">
                          <FcReuse
                            size={20}
                            color={"green"}
                            onClick={() => RevertTrashItem(_id)}
                          />
                        </span>
                        <span title="delete Without Belong Sales">
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
