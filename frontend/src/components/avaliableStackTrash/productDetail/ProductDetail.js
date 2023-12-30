import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getSingleTrashItemFun } from "../../../redux/features/avaliableStackTrash/avaliableStackTrashSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./ProductDetail.scss";
import DOMPurify from "dompurify";
import moment from "moment";

const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { trashItem, isLoading, isError, message } = useSelector(
    (state) => state.avaliableStkTrash
  );

  const stockStatus = (quantity) => {
    if (quantity <= 0) {
      return <span className="--color-danger">Out Of Stock</span>;
    }
    return <span className="--color-success">In Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getSingleTrashItemFun(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="product-detail">
      <h3 className="product-details--mt">Product Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {trashItem && (
          <div className="detail">
            <div className="trashItem-details-box">
              <h4>
                Date:{" "}
                {moment(trashItem.createdAt.toLocaleString()).format(
                  "MMM Do YY"
                )}
              </h4>
            </div>
            <Card cardClass="group">
              {trashItem?.image?.path ? (
                <img
                  className="image"
                  src={`http://localhost:5000/${trashItem.image.filename}`}
                  alt={trashItem.image.filename}
                />
              ) : (
                <p>No image set for this trashItem</p>
              )}
            </Card>
            <h4 className="trashItem-details--mt">
              trashItem Availability: {stockStatus(trashItem.quantity)}
            </h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {trashItem.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {trashItem.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {trashItem.category}
            </p>
            <p>
              <b>&rarr; Purchase Price : </b> &#1547;
              {trashItem.purchasePrice}
            </p>
            <p>
              <b>&rarr; Sale Price : </b> &#1547;
              {trashItem.salePrice}
            </p>
            <p>
              <b>&rarr; Quantity in stock : </b> {trashItem.quantity}
            </p>
            <p>
              <b>&rarr; Total Price of Purchase : </b> &#1547;
              {trashItem.purchasePrice * trashItem.quantity}
            </p>
            <p>
              <b>&rarr; Total Price of Sale : </b> &#1547;
              {trashItem.salePrice * trashItem.quantity}
            </p>
            <hr />
            <h3>Information:</h3>

            <div
              className="trashItem-details-info"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(trashItem.description),
              }}
            ></div>
            <hr />

            <hr />
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;
