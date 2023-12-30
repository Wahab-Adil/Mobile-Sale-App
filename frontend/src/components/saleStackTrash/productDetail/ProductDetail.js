import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getSaleSingleTrashItem } from "../../../redux/features/saleStackTrash/saleStackTrashSlice";
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
  const {
    saletrashItem: trashItem,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.saleTrash);
  console.log("res", trashItem);

  useEffect(() => {
    if (isLoggedIn === true) {
      const res = dispatch(getSaleSingleTrashItem(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="product-detail">
      <h3 className="product-details--mt">trashItem Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {trashItem && (
          <div className="detail">
            <div className="product-details-box">
              <h4>
                Date:{" "}
                {moment(trashItem.createdAt.toLocaleString()).format(
                  "MMM Do YY"
                )}
              </h4>
            </div>
            <Card cardClass="group">
              {trashItem?.image ? (
                <img
                  className="image"
                  src={`http://localhost:5000/${trashItem.image}`}
                  alt={trashItem.image.filename}
                />
              ) : (
                <p>No image set for this product</p>
              )}
            </Card>
            <h4 className="product-details--mt">
              Product Availability
              <h4 style={{ color: "green" }}>Purchased</h4>
            </h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {trashItem.name}
            </h4>

            <p>
              <b>&rarr; Category : </b> {trashItem.category}
            </p>
            <p>
              <b>&rarr; trashItem Price : </b> &#1547;
              {trashItem.unitPrice}
            </p>
            <p>
              <b>&rarr; Quantity : </b> {trashItem.quantity}
            </p>
            <p>
              <b>&rarr; Total Price of trashItem : </b> &#1547;
              {trashItem.unitPrice * trashItem.quantity}
            </p>

            <p>
              <b>&rarr; Purchase Price : </b> &#1547;
              {trashItem.purchasePrice}
            </p>

            <p>
              <b>&rarr; Total Price of Purchase : </b> &#1547;
              {trashItem.purchasePrice * trashItem.quantity}
            </p>

            <hr />
            <h3>Information:</h3>

            <div
              className="product-details-info"
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
