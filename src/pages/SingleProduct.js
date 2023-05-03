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
import { getAProduct } from "../features/products/productSlice";
import { addProdToCart, getUserCart } from "../features/user/userSlice";

const SingleProduct = () => {
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product.singleproduct);
  const cartState = useSelector((state) => state.auth.cartProducts);
  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart());
  }, []);

  useEffect(() => {
    for (let index = 0; index < cartState.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, []);

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
      navigate("/cart");
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
                  <ReactStars
                    count={5}
                    size={24}
                    value={productState?.totalrating}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">(Dự trên 2 đánh giá)</p>
                </div>
                <Link to="/" className="review-btn" href="#review">
                  Viết đánh giá
                </Link>
              </div>
              <div className="py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Loại: </h3>
                  <p className="product-data">Đồng hồ</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Hãng: </h3>
                  <p className="product-data">{productState?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Danh mục: </h3>
                  <p className="product-data">{productState?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Nhãn: </h3>
                  <p className="product-data">{productState?.tags}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tình trạng: </h3>
                  <p className="product-data">Còn hàng</p>
                </div>
                {/* <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Kích thước: </h3>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      S
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      M
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XL
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XXL
                    </span>
                  </div>
                </div> */}
                {alreadyAdded === false && (
                  <>
                    {" "}
                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                      <h3 className="product-heading">Màu sắc: </h3>
                      <Color
                        setColor={setColor}
                        colorData={productState?.color}
                      />
                    </div>
                  </>
                )}
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  {alreadyAdded === false && (
                    <>
                      <h3 className="product-heading">Số lượng: </h3>
                      <div className="">
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
                    <button
                      className="button border-0"
                      type="button"
                      onClick={() => {
                        alreadyAdded ? navigate("/cart") : uploadCart();
                      }}
                    >
                      {alreadyAdded ? "Đi đến giỏ hàng" : "Thêm vào giỏ"}
                    </button>
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
                    <Link to="/">
                      <AiOutlineHeart className="fs-5 me-2" /> Thêm vào yêu
                      thích
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
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Dự trên 2 đánh giá</p>
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
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={true}
                      activeColor="#ffd700"
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Bình luận"
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button border-0">Đánh giá</button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-4">
                <div className="review">
                  <div className="d-flex gap-10 align-items-center">
                    <h6 className="mb-0">Navdeep</h6>
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                  <p className="mt-3">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters
                  </p>
                </div>
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
