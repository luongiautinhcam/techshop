import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  getAProduct,
  ratingProduct,
} from "../features/products/productSlice";
import {
  addProdToCart,
  getUserCart,
  resetState,
} from "../features/user/userSlice";

import { useFormik } from "formik";
import * as yup from "yup";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

const reviewSchema = yup.object({
  star: yup.number().required("Bạn phải chọn đánh giá từ 1 đến 5 sao"),
  comment: yup.string().required("Nội dung bình luận không được để trống"),
});

const SingleProduct = () => {
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product.singleproduct);
  const ratingsOldState = useSelector((state) => state.product);
  const { productRatings } = ratingsOldState;
  const cartState = useSelector((state) => state.auth.cartProducts);

  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart());
  }, []);

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, []);

  //đánh giá
  const formik = useFormik({
    initialValues: {
      star: "",
      comment: "",
      prodId: getProductId,
    },
    validationSchema: reviewSchema,
    onSubmit: (values) => {
      dispatch(ratingProduct(values));
      dispatch(getAProduct(getProductId));
    },
  });

  const uploadCart = () => {
    if (color === null) {
      toast.error("Hãy chọn màu", { autoClose: 800 });
      return false;
    } else {
      dispatch(
        addProdToCart({
          productId: productState?._id,
          quantity,
          color,
          price: productState?.price,
        })
      );
      dispatch(resetState());
      setTimeout(() => {
        navigate("/cart");
      }, 1000);
    }
  };
  const props = {
    width: 500,
    height: 600,
    zoomWidth: 600,
    img: productState?.images[0]?.url
      ? productState?.images[0]?.url
      : "https://cdn.tgdd.vn/Products/Images/7077/250639/apple-watch-s7-lte-41mm-den-1-2.jpg",
  };
  const [orderedProduct, setorderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    // console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };

  //số sao đánh giá
  const [value, setValue] = React.useState(0);

  return (
    <>
      <Meta title={productState?.title} />
      <BreadCrumb title={productState?.title} />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {productState?.images.map((item, index) => {
                return (
                  <div key={index}>
                    <img src={item?.url} className="img-fluid" alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{productState?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(productState?.price)}
                </p>
                <div className="d-flex align-items-center gap-10">
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={parseInt(productState?.totalrating, 10)}
                      readOnly
                    />
                  </Box>
                  <p className="mb-0 t-review">
                    {/* (Dự trên {productState.ratings.length} đánh giá) */}
                  </p>
                </div>
                <Link to="/" className="review-btn" href="#review">
                  Viết đánh giá
                </Link>
              </div>
              <div className="py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Hãng: </h3>
                  <p className="product-data">{productState?.brand[0].title}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Danh mục: </h3>
                  <p className="product-data">
                    {productState?.category[0].title}
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Nhãn: </h3>
                  <p className="product-data">{productState?.tags}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tình trạng: </h3>
                  <p className="product-data">
                    {productState?.quantity > 0 ? "Còn hàng" : "Hết hàng"}
                  </p>
                </div>
                {alreadyAdded === false && (
                  <>
                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                      <h3 className="product-heading">Màu sắc: </h3>
                      <Color
                        setColor={setColor}
                        colorData={productState?.color}
                      />
                    </div>
                  </>
                )}
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Số lượng sản phẩm: </h3>
                  <p className="product-data">{productState?.quantity}</p>
                </div>
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  {alreadyAdded === false && (
                    <>
                      <h3 className="product-heading">Số lượng: </h3>
                      <div className="">
                        {productState?.quantity > 0 ? (
                          <input
                            type="number"
                            name=""
                            min={1}
                            max={10}
                            className="form-control"
                            style={{ width: "70px" }}
                            id=""
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity}
                          />
                        ) : (
                          ""
                        )}
                        {/* <input
                          type="number"
                          name=""
                          min={1}
                          max={10}
                          className="form-control"
                          style={{ width: "70px" }}
                          id=""
                          onChange={(e) => setQuantity(e.target.value)}
                          value={quantity}
                        /> */}
                      </div>
                    </>
                  )}
                  <div
                    className={
                      alreadyAdded
                        ? "ms-0"
                        : "ms-5" + "d-flex align-items-center gap-30 ms-5"
                    }
                  >
                    {productState?.quantity > 0 ? (
                      <button
                        className="button border-0"
                        type="button"
                        onClick={() => {
                          alreadyAdded ? navigate("/cart") : uploadCart();
                        }}
                      >
                        {alreadyAdded ? "Đi đến giỏ hàng" : "Thêm vào giỏ"}
                      </button>
                    ) : (
                      "Hết hàng"
                    )}
                    {/* <button
                      className="button border-0"
                      type="button"
                      onClick={() => {
                        alreadyAdded ? navigate("/cart") : uploadCart();
                      }}
                    >
                      {alreadyAdded ? "Đi đến giỏ hàng" : "Thêm vào giỏ"}
                    </button> */}
                    {/* <button className="button signup">Mua ngay</button> */}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <Link to="/">
                      <TbGitCompare className="fs-5 me-2" /> So sánh sản phẩm
                    </Link>
                  </div>
                  <div>
                    <Link to="#">
                      <AiOutlineHeart
                        className="fs-5 me-2"
                        onClick={() => addToWish(getProductId)}
                      />
                      Thêm vào yêu thích
                    </Link>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column my-3">
                  <h3 className="product-heading">Giao hàng và trả hàng: </h3>
                  <p className="product-data">
                    Miễn phí giao hàng và trả hàng với tất cả hơn hàng! <br />
                    Chúng tôi tất cả các đơn hàng ở Việt Nam trong khoảng
                    <b>5-10 ngày</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Liên kết sản phẩm:</h3>
                  <Link
                    to={undefined}
                    onClick={() => {
                      copyToClipboard(window.location.href);
                    }}
                  >
                    Sao chép đường dẫn sản phẩm
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Mô tả</h4>
            <div className="bg-white p-3">
              <p
                dangerouslySetInnerHTML={{
                  __html: productState?.decscription,
                }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Đánh giá</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Đánh giá người dùng</h4>
                  <div className="d-flex align-items-center gap-10">
                    <Box
                      sx={{
                        "& > legend": { mt: 2 },
                      }}
                    >
                      <Rating
                        name="read-only"
                        value={parseInt(productState?.totalrating, 10)}
                        readOnly
                      />
                    </Box>
                    <p className="mb-0">
                      {/* (Dự trên {productState.ratings.length} đánh giá) */}
                    </p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <Link
                      to="/"
                      className="text-dark text-decoration-underline"
                    >
                      Viết đánh giá
                    </Link>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Viết đánh giá</h4>
                <form
                  action=""
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <div>
                    <Box
                      sx={{
                        "& > legend": { mt: 2 },
                      }}
                    >
                      <Rating
                        name="star"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                          formik.handleChange("star")(event);
                          formik.handleBlur("star")(event);
                        }}
                        onBlur={() => {
                          formik.handleBlur("star")();
                        }}
                        values={formik.values.star}
                      />
                      <div className="error">
                        {formik.touched.star && formik.errors.star}
                      </div>
                    </Box>
                  </div>
                  <div>
                    <textarea
                      name="comment"
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Bình luận"
                      onChange={formik.handleChange("comment")}
                      onBlur={formik.handleBlur("comment")}
                      values={formik.values.comment}
                    ></textarea>
                    <div className="error">
                      {formik.touched.comment && formik.errors.comment}
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button border-0" type="submit">
                      Đánh giá
                    </button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-4">
                {productRatings?.map((item, index) => {
                  return (
                    <div key={index} className="card-body p-4">
                      <div className="d-flex flex-start">
                        <img
                          className="rounded-circle shadow-1-strong me-3"
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp"
                          alt="avatar"
                          width="60"
                          height="60"
                        />
                        <div>
                          <h6 className="fw-bold mb-1">
                            {item?.postedby.firstname +
                              " " +
                              item?.postedby.lastname}
                          </h6>
                          <div className="d-flex align-items-center mb-1">
                            <p className="mb-0">{item?.postedby.createdAt}</p>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <Box
                              className="d-flex align-items-center gap-10"
                              sx={{
                                "& > legend": { mt: 2 },
                              }}
                            >
                              <Rating
                                name="read-only"
                                value={item?.star}
                                readOnly
                              />
                            </Box>
                          </div>
                          <p className="mb-0">{item?.comment}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Sản phẩm phổ biến</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard />
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
