import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { services } from "../utils/Data";
import { getAllBlogs } from "../features/blogs/blogSlice";
import moment from "moment";
import ReactStars from "react-rating-stars-component";
import { Link, useNavigate } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import {
  addToWishlist,
  getAllProducts,
} from "../features/products/productSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getBrands } from "../features/brand/brandSlice";
import { getUserCart, getUserOrder } from "../features/user/userSlice";

const Home = () => {
  const dispatch = useDispatch();

  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state.product.product);
  // const pCategoryState = useSelector((state) => state.pCategory.pCategories);
  // const userCartState = useSelector((state) => state.auth.cartProducts);
  const brandState = useSelector((state) => state.brand.brands);
  const navigate = useNavigate();

  useEffect(() => {
    getblogs();
    getProducts();
    getPCategories();
    getPBrands();
    dispatch(getUserOrder());
    dispatch(getUserCart());
    dispatch(getUserOrder());
  }, []);
  const getblogs = () => {
    dispatch(getAllBlogs());
  };
  const getProducts = () => {
    dispatch(getAllProducts());
  };
  const getPCategories = () => {
    dispatch(getCategories());
  };
  const getPBrands = () => {
    dispatch(getBrands());
  };
  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };

  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative">
              <img
                src="images/main-banner-1.jpg"
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>NÂNG CAO HIỆU XUẤT</h4>
                <h5>iPad S13+ Pro</h5>
                <p>Từ 20tr hoặc 999k/tháng</p>
                <Link className="button">MUA NGAY</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-01.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>BÁN CHẠY</h4>
                  <h5>iPad S13+ Pro</h5>
                  <p>
                    Từ 20tr <br /> hoặc 999k/tháng
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-02.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>HÀNG MỚI</h4>
                  <h5>Mua IPad Air</h5>
                  <p>
                    Từ 20tr <br /> hoặc 999k/tháng
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-03.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>HÀNG MỚI</h4>
                  <h5>Mua IPad Air</h5>
                  <p>
                    Từ 20tr <br /> hoặc 999k/tháng
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-04.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>HÀNG MỚI</h4>
                  <h5>Mua IPad Air</h5>
                  <p>
                    Từ 20tr <br /> hoặc 999k/tháng
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      {/* <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Laptop</h6>
                  <p>10 Sản phẩm</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Máy ảnh</h6>
                  <p>10 Sản phẩm</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Tivi</h6>
                  <p>10 Sản phẩm</p>
                </div>
                <img src="images/tv.jpg" alt="tv" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Đồng hồ</h6>
                  <p>10 Sản phẩm</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Laptop</h6>
                  <p>10 Sản phẩm</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Máy ảnh</h6>
                  <p>10 Sản phẩm</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Tivi</h6>
                  <p>10 Sản phẩm</p>
                </div>
                <img src="images/tv.jpg" alt="tv" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Đồng hồ</h6>
                  <p>10 Sản phẩm</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
            </div>
          </div>
        </div>
      </Container> */}
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Sản phẩm mới</h3>
          </div>
          {productState &&
            productState?.map((item, index) => {
              if (item?.tags === "news") {
                return (
                  <div key={index} className={"col-3"}>
                    {/* <Link to={`/product/${item?._id}`}> */}
                    <Link to="#">
                      <div className="product-card position-relative">
                        <div className="wishlist-icon position-absolute"></div>
                        <div className="product-image">
                          <img
                            src={item?.images[0].url}
                            className="img-fluid mx-auto"
                            alt="product"
                          />
                          <img
                            src={item?.images[1].url}
                            className="img-fluid mx-auto"
                            alt="product"
                          />
                        </div>
                        <div className="product-details">
                          <h6 className="brand">{item.brand[0]?.title}</h6>
                          <h5 className="product-title">
                            <Link
                              to={`/product/${item?._id}`}
                              className="text-dark"
                            >
                              {item?.title}
                            </Link>
                          </h5>
                          <ReactStars
                            count={5}
                            size={24}
                            value={Number(item?.totalrating.toString())}
                            edit={false}
                            activeColor="#ffd700"
                          />
                          <p className="price">
                            {Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item?.price)}
                          </p>
                        </div>
                        <div className="action-bar position-absolute">
                          <div className="d-flex flex-column gap-15">
                            <button className="border-0 bg-transparent">
                              <img
                                onClick={() => addToWish(item?._id)}
                                src={wish}
                                alt="wishlist"
                              />
                            </button>
                            <button className="border-0 bg-transparent">
                              <img src={prodcompare} alt="compare" />
                            </button>
                            <button className="border-0 bg-transparent">
                              <img
                                onClick={() =>
                                  navigate("/product/" + item?._id)
                                }
                                src={view}
                                alt="view"
                              />
                            </button>
                            <button className="border-0 bg-transparent">
                              <img src={addcart} alt="addcart" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              }
            })}
        </div>
      </Container>
      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-01.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5>Màn hình lớn</h5>
                <h6>Smart Watch Series 7</h6>
                <p>Từ 5tr VNĐ hoặc 376k/th trong 24 th.</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-02.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Màn hình Studio</h5>
                <h6 className="text-dark">Độ sáng 600 nits</h6>
                <p className="text-dark">Màn hình 27-inch 5K Retina</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-03.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Điện thoại</h5>
                <h6 className="text-dark">iPhone 13 Pro</h6>
                <p className="text-dark">
                  Từ 20tr VNĐ hoặc 964k/th trong 24 th.
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-04.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Loa gia đình</h5>
                <h6 className="text-dark">Âm thanh lấp đầy căn phòng</h6>
                <p className="text-dark">
                  Từ 16tr VNĐ hoặc 2tr7/th trong 12 th.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Sản phẩm giảm giá</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item?.tags === "sale") {
                return (
                  <SpecialProduct
                    key={index}
                    id={item?._id}
                    brand={item.brand[0]?.title}
                    title={item?.title}
                    totalrating={item?.totalrating.toString()}
                    price={item?.price}
                    sold={item?.sold}
                    quantity={item?.quantity}
                    image={item?.images[0].url}
                  />
                );
              }
            })}
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Sản phẩm đặc biệt</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item?.tags === "special") {
                return (
                  <div key={index} className={"col-3"}>
                    <Link to={`/product/${item?._id}`}>
                      <div className="product-card position-relative">
                        <div className="wishlist-icon position-absolute">
                          <button className="border-0 bg-transparent">
                            <img
                              onClick={() => addToWish(item?._id)}
                              src={wish}
                              alt="wishlist"
                            />
                          </button>
                        </div>
                        <div className="product-image">
                          <img
                            src={item?.images[0].url}
                            className="img-fluid mx-auto"
                            alt="product"
                          />
                          <img
                            src={item?.images[1].url}
                            className="img-fluid mx-auto"
                            alt="product"
                          />
                        </div>
                        <div className="product-details">
                          <h6 className="brand">
                            {brandState?.map((items, index) => {
                              if (items._id == item?.brand) {
                                return items.title;
                              }
                            })}
                          </h6>
                          <h5 className="product-title">{item?.title}</h5>
                          <ReactStars
                            count={5}
                            size={24}
                            value={Number(item?.totalrating.toString())}
                            edit={false}
                            activeColor="#ffd700"
                          />
                          <p className="price">
                            {Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item?.price)}
                          </p>
                        </div>
                        <div className="action-bar position-absolute">
                          <div className="d-flex flex-column gap-15">
                            <button className="border-0 bg-transparent">
                              <img src={prodcompare} alt="compare" />
                            </button>
                            <button className="border-0 bg-transparent">
                              <img
                                onClick={() =>
                                  navigate("/product/" + item?._id)
                                }
                                src={view}
                                alt="view"
                              />
                            </button>
                            <button className="border-0 bg-transparent">
                              <img src={addcart} alt="addcart" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              }
            })}
        </div>
      </Container>
      <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="marquee-inner-wrapper card-wrapper">
          <Marquee className="d-flex">
            <div className="mx-4 w-25">
              <img src="images/brand-01.png" alt="brand" />
            </div>
            <div className="mx-4 w-25">
              <img src="images/brand-02.png" alt="brand" />
            </div>
            <div className="mx-4 w-25">
              <img src="images/brand-03.png" alt="brand" />
            </div>
            <div className="mx-4 w-25">
              <img src="images/brand-04.png" alt="brand" />
            </div>
            <div className="mx-4 w-25">
              <img src="images/brand-05.png" alt="brand" />
            </div>
            <div className="mx-4 w-25">
              <img src="images/brand-06.png" alt="brand" />
            </div>
            <div className="mx-4 w-25">
              <img src="images/brand-07.png" alt="brand" />
            </div>
            <div className="mx-4 w-25">
              <img src="images/brand-08.png" alt="brand" />
            </div>
          </Marquee>
        </div>
      </Container>
      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Blog mới nhất</h3>
          </div>
        </div>
        <div className="row">
          {Array.isArray(blogState) &&
            blogState.length > 0 &&
            blogState.map((item, index) => {
              if (index < 3) {
                return (
                  <div className="col-3" key={index}>
                    <BlogCard
                      id={item?.id}
                      title={item?.title}
                      decscription={item?.decscription}
                      image="/images/blog-1.jpg"
                      date={moment(item?.createdAt).format(
                        "MMMM Do YYYY, h:mm a"
                      )}
                    />
                  </div>
                );
              }
            })}
        </div>
      </Container>
    </>
  );
};

export default Home;
