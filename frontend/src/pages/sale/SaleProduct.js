import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import SaleForm from "../../components/avaliableStack/saleForm/SaleForm";
import {
  getProduct,
  getProducts,
  saleProducts,
  selectIsLoading,
  selectProduct,
} from "../../redux/features/product/productSlice";

const SaleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const productEdit = useSelector(selectProduct);

  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState();
  const [productPrice, setProductPrice] = useState();

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);

    setImagePreview(
      productEdit && productEdit.image
        ? `http://localhost:5000/${productEdit.image.filename}`
        : null
    );

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
  }, [productEdit]);

  const handleInputChange = (e) => {
    if (e.target.name === "quantity") {
      setProductQuantity(e.target.value);
    } else {
      setProductPrice(e.target.value);
    }
  };

  console.log("sale product", product);
  const saleProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product?.name);
    formData.append("sku", product?.sku);
    formData.append("category", product?.category);
    //
    formData.append("quantity", Number(productQuantity));
    formData.append("unitPrice", productPrice);
    formData.append("totalPrice", productQuantity * productPrice);
    //
    formData.append("purchasePrice", product?.purchasePrice);
    formData.append("color", product?.color);
    formData.append("type", product?.type);
    formData.append("description", product?.description);
    formData.append("image", product?.image?.filename);
    await dispatch(saleProducts({ id, formData }));
    await dispatch(getProducts());
    // navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Product</h3>
      <SaleForm
        product={product}
        setProductQuantity={setProductQuantity}
        setProductPrice={setProductPrice}
        productPrice={productPrice}
        productQuantity={productQuantity}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        saleProduct={saleProduct}
      />
    </div>
  );
};

export default SaleProduct;
