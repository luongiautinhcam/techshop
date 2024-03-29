import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import cart from "../images/cart.svg";
import user from "../images/user.svg";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getUserOrder } from "../features/user/userSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";

const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (authState?.user === null) {
    } else {
      dispatch(getUserOrder());
    }
    dispatch(getCategories());
  }, []);
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  //lấy thông tin giỏ hàng tạm
  const getTemporaryCart = () => {
    const tempCart = Cookies.get("temporaryCart");
    return tempCart ? JSON.parse(tempCart) : [];
  };
  const temporaryCart = getTemporaryCart();
  const authState = useSelector((state) => state.auth);
  const pCategoryState = useSelector((state) => state.pCategory.pCategories);
  const productState = useSelector((state) => state?.product?.product);
  const [productOpt, setProductOpt] = useState([]);
  const [paginate, setPaginate] = useState(true);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartTempItemCount, setCartTempItemCount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    // Calculate the total cart items count whenever the cartState changes
    setCartItemCount(cartState?.length || 0);
    setCartTempItemCount(temporaryCart?.length || 0);
  }, [cartState, temporaryCart]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Vận chuyển miễn phí với đơn hàng trên 1 triệu VNĐ
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Đường giây nóng:
                <a className="text-white" href="tel:+84869632021">
                  (84) 8 6963 2021
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link className="text-white" to="">
                  Tech Shop
                </Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log("Results paginated")}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0].prod}`);
                  }}
                  options={productOpt}
                  paginate={paginate}
                  labelKey={"name"}
                  minLength={2}
                  placeholder="Tìm sản phẩm ở đây..."
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-5" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex algin-items-center justify-content-between">
                <div>
                  <Link
                    to="/compare-product"
                    className="d-flex algin-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare" />
                    <p className="mb-0">
                      So sánh <br /> sản phẩm
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex algin-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0">
                      Danh sách <br /> yêu thích
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={authState?.user === null ? "/login" : "/my-profile"}
                    className="d-flex algin-items-center gap-10 text-white"
                  >
                    <img src={user} alt="user" />
                    {authState?.user === null ? (
                      <p className="mb-0">
                        Đăng nhập <br /> tài khoản
                      </p>
                    ) : (
                      <p className="mb-0">
                        Chào <br />
                        {authState?.user?.firstname}
                      </p>
                    )}
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex algin-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">
                        {authState?.user === null ? (
                          cartTempItemCount
                        ) : (
                          <>{cartItemCount ? cartItemCount : ""}</>
                        )}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="images/menu.svg" alt="" />
                      <span className="me-5 d-inline-block">
                        Danh mục cửa hàng
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {pCategoryState &&
                        pCategoryState?.map((item, index) => {
                          return (
                            <li key={index}>
                              <Link
                                className="dropdown-item text-white"
                                to={`/product/?category=${item?._id}`}
                              >
                                {item.title}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex algin-items-center gap-15">
                    <NavLink to="/">Trang chủ</NavLink>
                    <NavLink to="/product">Cửa hàng</NavLink>
                    <NavLink to="/blog">Blogs</NavLink>
                    <NavLink to="/contact">Liên hệ</NavLink>
                    {authState?.user === null ? (
                      ""
                    ) : (
                      <>
                        <NavLink to="/my-orders">Đơn hàng</NavLink>
                        <NavLink to="" onClick={handleLogout}>
                          Đăng xuất
                        </NavLink>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
