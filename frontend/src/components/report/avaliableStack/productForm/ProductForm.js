import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../../card/Card";

import "./ProductForm.scss";

const ProductForm = ({
  product,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct} encType="multipart/form-data">
          <Card cardClass={"group"}>
            <label>Product Image</label>

            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            <div className="image-preview">
              <img
                src={
                  imagePreview
                    ? imagePreview
                    : `http://localhost:5000/${product?.image?.filename}`
                }
                alt="product"
              />
            </div>
          </Card>
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />

          <label>Product Category:</label>
          <input
            type="text"
            placeholder="Product Category"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          />

          <label>Product Color:</label>
          <input
            type="text"
            placeholder="Product color"
            name="color"
            value={product?.color}
            onChange={handleInputChange}
          />
          <label>Product type:</label>
          <input
            type="text"
            placeholder="Product type"
            name="type"
            value={product?.type}
            onChange={handleInputChange}
          />

          <label>Product Quantity:</label>
          <input
            type="text"
            placeholder="Product Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />
          <label>Product purchase Price:</label>
          <input
            type="number"
            placeholder="purchase Price"
            name="purchasePrice"
            value={product?.purchasePrice}
            onChange={handleInputChange}
          />
          <label>Product sales Price:</label>
          <input
            type="number"
            placeholder="sales Price"
            name="salePrice"
            value={product?.salePrice}
            onChange={handleInputChange}
          />
          <label>Product Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
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
