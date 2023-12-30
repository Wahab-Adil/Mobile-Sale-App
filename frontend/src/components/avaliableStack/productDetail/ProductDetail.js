import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
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
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const stockStatus = (quantity) => {
    if (quantity <= 0) {
      return <span className="--color-danger">Out Of Stock</span>;
    }
    return <span className="--color-success">In Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
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
        {product && (
          <div className="detail">
            <div className="product-details-box">
              <h4>Date: {moment(product.createdAt).format("MMM Do YY")}</h4>
            </div>
            <Card cardClass="group">
              {product?.image?.path ? (
                <img
                  className="image"
                  src={`http://localhost:5000/${product.image.filename}`}
                  alt={product.image.filename}
                />
              ) : (
                <p>No image set for this product</p>
              )}
            </Card>
            <h4 className="product-details--mt">
              Product Availability: {stockStatus(product.quantity)}
            </h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {product.category}
            </p>
            <p>
              <b>&rarr; Purchase Price : </b> &#1547;
              {product.purchasePrice}
            </p>
            <p>
              <b>&rarr; Sale Price : </b> &#1547;
              {product.salePrice}
            </p>
            <p>
              <b>&rarr; Quantity in stock : </b> {product.quantity}
            </p>
            <p>
              <b>&rarr; Total Price of Purchase : </b> &#1547;
              {product.purchasePrice * product.quantity}
            </p>
            <p>
              <b>&rarr; Total Price of Sale : </b> &#1547;
              {product.salePrice * product.quantity}
            </p>
            <hr />
            <h3>Information:</h3>

            <div
              className="product-details-info"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
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
