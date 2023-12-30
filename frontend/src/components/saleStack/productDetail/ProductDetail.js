import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getSale } from "../../../redux/features/sale/saleSlice";
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
  const { sale, isLoading, isError, message } = useSelector(
    (state) => state.sale
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getSale(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="product-detail">
      <h3 className="product-details--mt">Sale Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {sale && (
          <div className="detail">
            <div className="product-details-box">
              <h4>
                Date:{" "}
                {moment(sale.createdAt.toLocaleString("en-US")).format(
                  "MMM Do YY"
                )}
              </h4>
            </div>
            <Card cardClass="group">
              {sale?.image ? (
                <img
                  className="image"
                  src={`http://localhost:5000/${sale.image}`}
                  alt={sale.image.filename}
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
              <span className="badge">Name: </span> &nbsp; {sale.name}
            </h4>

            <p>
              <b>&rarr; Category : </b> {sale.category}
            </p>
            <p>
              <b>&rarr; Sale Price : </b> &#1547;
              {sale.unitPrice}
            </p>
            <p>
              <b>&rarr; Quantity : </b> {sale.quantity}
            </p>
            <p>
              <b>&rarr; Total Price of Sale : </b> &#1547;
              {sale.unitPrice * sale.quantity}
            </p>

            <p>
              <b>&rarr; Purchase Price : </b> &#1547;
              {sale.purchasePrice}
            </p>

            <p>
              <b>&rarr; Total Price of Purchase : </b> &#1547;
              {sale.purchasePrice * sale.quantity}
            </p>

            <hr />
            <h3>Information:</h3>

            <div
              className="product-details-info"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(sale.description),
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
