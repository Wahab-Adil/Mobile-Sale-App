import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./SaleForm.scss";

const ProductForm = ({
  product,
  handleInputChange,
  description,
  setDescription,
  editExpenseFun,
}) => {
  return (
    <div className="add-product">
      <div style={{ marginBottom: "4rem" }} />
      <Card cardClass={"card"}>
        <form onSubmit={editExpenseFun}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: 0.8, maxWidth: "450px" }}>
              <label> Name:</label>
              <input
                type="text"
                style={{ fontWeight: "bolder", fontSize: "1.8rem" }}
                placeholder="to"
                name="to"
                value={product?.to}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div style={{ flex: 0.8, maxWidth: "450px" }}>
              <label>Narration:</label>
              <input
                type="text"
                style={{ fontWeight: "bolder", fontSize: "1.8rem" }}
                placeholder="Product Category"
                name="narration"
                value={product?.narration}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
          {/* pre */}
          <label>Paid:</label>
          <input
            style={{ fontWeight: "bolder", fontSize: "1.8rem" }}
            type="number"
            placeholder="Paid"
            name="paid"
            value={product?.paid}
            onChange={(e) => handleInputChange(e)}
          />
          <label>Product Description:</label>
          <ReactQuill
            theme="snow"
            onChange={setDescription}
            value={description}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />
          <button type="submit" color="--primary">
            Ok
          </button>
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
