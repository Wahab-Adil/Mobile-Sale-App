import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./SaleForm.scss";

const ProductForm = ({
  product,
  imagePreview,
  description,
  handleInputChange,
  editSaleFun,
  productPrice,
  productQuantity,
}) => {
  return (
    <div
      className="add-product"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <form onSubmit={editSaleFun}>
        <Card cardClass={"card"}>
          <div
            className="--my"
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button type="submit" className="--btn --btn-primary">
              Edit Sale
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: 0.8, maxWidth: "450px" }}>
              <label>Product Quantity:</label>
              <input
                type="Number"
                placeholder="Product Quantity to Sale"
                name="quantity"
                onChange={handleInputChange}
              />
            </div>
            <div style={{ flex: 0.8, maxWidth: "450px" }}>
              <label>Product Price:</label>
              <input
                type="Number"
                placeholder="Product Price"
                name="salePrice"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </Card>
        <Card cardClass={"card"}>
          <div
            className="--my"
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <p className="--btn --btn-primary">
              Total Price ={" "}
              {productPrice && productQuantity
                ? productPrice * productQuantity
                : 0}
            </p>
          </div>
        </Card>
      </form>
      <div style={{ marginBottom: "4rem" }} />
      <Card cardClass={"card"}>
        <form>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: 0.8, maxWidth: "450px" }}>
              <label>Product Name:</label>
              <input
                type="text"
                disabled
                style={{ fontWeight: "bolder", fontSize: "1.8rem" }}
                placeholder="Product name"
                name="name"
                value={product?.name}
              />
            </div>
            <div style={{ flex: 0.8, maxWidth: "450px" }}>
              <label>Product Category:</label>
              <input
                type="text"
                disabled
                style={{ fontWeight: "bolder", fontSize: "1.8rem" }}
                placeholder="Product Category"
                name="category"
                value={product?.category}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: 0.8, maxWidth: "450px" }}>
              <label>Product color:</label>
              <input
                type="text"
                disabled
                style={{ fontWeight: "bolder", fontSize: "1.8rem" }}
                placeholder="Product color"
                name="color"
                value={product?.color}
              />
            </div>
            <div style={{ flex: 0.8, maxWidth: "450px" }}>
              <label>Product Type:</label>
              <input
                type="text"
                disabled
                style={{ fontWeight: "bolder", fontSize: "1.8rem" }}
                placeholder="Product type"
                name="type"
                value={product?.type}
              />
            </div>
          </div>

          {/* new */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: 0.8, maxWidth: "450px" }}>
              <label>Product quantity:</label>
              <input
                type="text"
                disabled
                style={{ fontWeight: "bolder", fontSize: "1.8rem" }}
                placeholder="Product quantity"
                name="quantity"
                value={product?.quantity}
              />
            </div>
            <div style={{ flex: 0.8, maxWidth: "450px" }}>
              <label>Product purchase Price:</label>
              <input
                type="number"
                disabled
                style={{ fontWeight: "bolder", fontSize: "1.8rem" }}
                placeholder="purchase Price"
                name="purchasePrice"
                value={product?.purchasePrice}
              />
            </div>
          </div>

          {/* pre */}
          <label>Product sales Price:</label>
          <input
            disabled
            style={{ fontWeight: "bolder", fontSize: "1.8rem" }}
            type="number"
            placeholder="sales Price"
            name="salePrice"
            value={product?.salePrice}
          />
          <label>Product Description:</label>
          <ReactQuill
            readOnly
            theme="snow"
            value={description}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />
        </form>
        {imagePreview != null ? (
          <div className="image-preview">
            <img
              style={{ height: "100%" }}
              width={"100%"}
              src={imagePreview}
              alt="product"
            />
          </div>
        ) : (
          <p>No image set for this poduct.</p>
        )}
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
