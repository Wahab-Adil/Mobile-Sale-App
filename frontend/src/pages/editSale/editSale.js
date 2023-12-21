import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import SaleForm from "../../components/saleStack/saleForm/SaleForm";
import {
  getSale,
  AllSales,
  updateSale,
  selectIsLoading,
  selectSale,
} from "../../redux/features/sale/saleSlice";

const EditSale = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const productEdit = useSelector(selectSale);

  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState();
  const [productPrice, setProductPrice] = useState();

  useEffect(() => {
    dispatch(getSale(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);

    setImagePreview(
      productEdit && productEdit.image
        ? `http://localhost:5000/${productEdit.image}`
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

  const editSaleFun = async (e) => {
    e.preventDefault();
    const formData = {
      quantity: Number(productQuantity),
      unitPrice: productPrice,
      totalPrice: Number(productQuantity) * productPrice,
    };
    const res = await dispatch(updateSale({ id, formData }));
    await dispatch(AllSales());
    if (res.status === "200") {
      navigate("/sale");
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Sale</h3>
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
        editSaleFun={editSaleFun}
      />
    </div>
  );
};

export default EditSale;
