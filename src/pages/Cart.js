import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  getUserCart,
  resetState,
  updateCartProduct,
} from "../features/user/userSlice";
import Cookies from "js-cookie";

const Cart = () => {
  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [totalAmountCartTemp, setTotalAmountCartTemp] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const userState = useSelector((state) => state.auth.user);
  const userCartState = useSelector((state) => state.auth.cartProducts);
  const [temporaryCart, setTemporaryCart] = useState([]);
  //lấy danh sách sản phẩm trong giỏ hàng tạm (nếu có)
  const getTemporaryCartFromCookieIfExists = () => {
    const temporaryCartCookie = Cookies.get("temporaryCart");
    if (temporaryCartCookie) {
      return JSON.parse(temporaryCartCookie);
    } else {
      return null; // Trả về null nếu không tìm thấy cookie
    }
  };
  // const temporaryCart = getTemporaryCartFromCookieIfExists();

  useEffect(() => {
    if (userState === null) {
    } else {
      dispatch(getUserCart());
    }

    dispatch(resetState());
  }, []);
  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateCartProduct({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: productUpdateDetail?.quantity,
        })
      );
      setTimeout(() => {
        dispatch(getUserCart());
      }, 200);
    }
  }, [productUpdateDetail, refresh]);

  //xoá sản phẩm trong giỏ hàng
  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };
  // xoá sản phẩm trong giỏ hàng tạm
  const deleteACartTempProduct = (productId) => {
    const updatedCart = temporaryCart.filter(
      (item) => item.productId !== productId
    );
    setTemporaryCart(updatedCart);
    Cookies.set("temporaryCart", JSON.stringify(updatedCart));
  };
  //tổng tiền trong giỏ hàng tạm
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < temporaryCart?.length; index++) {
      sum =
        sum +
        Number(temporaryCart[index].quantity) * temporaryCart[index].price;
      setTotalAmountCartTemp(sum);
    }
  }, [temporaryCart]);
  //tổng tiền trong giỏ hàng
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum =
        sum +
        Number(userCartState[index].quantity) * userCartState[index].price;
      setTotalAmount(sum);
    }
  }, [userCartState]);

  //thay đổi sản phẩm trong giỏ hàng
  const handleUpdateQuantity = (itemId, updatedQuantity) => {
    const cartItem = userCartState.find((item) => item._id === itemId);
    if (cartItem) {
      const remainingQuantity = cartItem.productId.colors.find(
        (color) => color.color === cartItem.color._id
      ).quantity;
      if (updatedQuantity <= remainingQuantity) {
        setProductUpdateDetail({
          cartItemId: cartItem._id,
          quantity: updatedQuantity,
        });
        setRefresh(!refresh);
      } else {
        alert("Số lượng cập nhật vượt quá số lượng sản phẩm còn lại!");
      }
    }
  };
  const updateQuantityInTemporaryCart = (productId, newQuantity) => {
    const updatedCart = temporaryCart.map((item) => {
      if (item.productId === productId) {
        // Tránh việc số lượng nhỏ hơn 1 và lớn hơn 10
        const quantity = Math.max(1, Math.min(newQuantity, 10));
        return { ...item, quantity };
      }
      return item;
    });

    return updatedCart;
  };

  const handleUpdateQuantityTempCart = (productId, newQuantity) => {
    const updatedCart = updateQuantityInTemporaryCart(productId, newQuantity);
    // Cập nhật giỏ hàng tạm trong state
    setTemporaryCart(updatedCart);
    // Lưu giá trị mới vào cookie
    Cookies.set("temporaryCart", JSON.stringify(updatedCart));
  };
  useEffect(() => {
    const cartFromCookie = getTemporaryCartFromCookieIfExists();
    if (cartFromCookie) {
      setTemporaryCart(cartFromCookie);
    }
  }, []);


  return (
    <>
      <Meta title={"Giỏ hàng"} />
      <BreadCrumb title="Giỏ hàng" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        {userState === null ? (
          <>
            {temporaryCart == null || temporaryCart.length === 0 ? (
              <>Giỏ hàng tạm trống</>
            ) : (
              <>
                {temporaryCart &&
                  temporaryCart.length > 0 &&
                  temporaryCart?.map((item, index) => {
                    return (
                      <div
                        className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                        key={index}
                      >
                        <div className="cart-col-1 gap-15 d-flex align-items-center">
                          <div className="w-25">
                            <img
                              src={item?.productImg}
                              className="img-fluid"
                              alt="product"
                            />
                          </div>
                          <div className="w-75">
                            <p>{item?.productTitle}</p>
                            <div className="d-flex gap-3">
                              <span>Màu:</span>
                              <ul className="colors ps-0">
                                <li
                                  style={{
                                    backgroundColor: item?.color?.title,
                                  }}
                                ></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="cart-col-2">
                          <h5 className="price">
                            {Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item?.price)}
                          </h5>
                        </div>
                        <div className="cart-col-3 d-flex align-items-center gap-15">
                          <div>
                            <input
                              className="form-control"
                              type="number"
                              name=""
                              min={1}
                              value={item?.quantity}
                              max={10}
                              id=""
                              onChange={(e) =>
                                handleUpdateQuantityTempCart(
                                  item?.productId,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <AiFillDelete
                              onClick={() => deleteACartTempProduct(item.productId)}
                              className="text-danger"
                            />
                          </div>
                        </div>
                        <div className="cart-col-4">
                          <h5 className="price">
                            {Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item?.price * item?.quantity)}
                          </h5>
                        </div>
                      </div>
                    );
                  })}
                <div className="col-12 py-2 mt-4">
                  <div className="d-flex justify-content-between align-items-baseline">
                    <Link to="/product" className="button">
                      Tiếp tục mua hàng
                    </Link>
                    {(totalAmountCartTemp !== null ||
                      totalAmountCartTemp !== 0) && (
                      <div className="d-flex flex-column align-items-end">
                        <h4>
                          Tổng tiền:{" "}
                          {temporaryCart?.length === 0
                            ? Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(0)
                            : Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(totalAmountCartTemp)}
                        </h4>
                        <p>Thuế và phí vẫn chuyển được tính khi thanh toán</p>
                        <Link to="/checkout" className="button">
                          Thanh toán
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {userCartState?.length === 0 ? (
              <>Giỏ hàng người dùng trống</>
            ) : (
              <>
                {" "}
                <div className="row">
                  <div className="col-12">
                    <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                      <h4 className="cart-col-1">Sản phẩm</h4>
                      <h4 className="cart-col-2">Đơn giá</h4>
                      <h4 className="cart-col-3">Số lượng</h4>
                      <h4 className="cart-col-4">Thành tiền</h4>
                    </div>
                    {userCartState &&
                      userCartState?.map((item, index) => {
                        return (
                          <div
                            className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                            key={index}
                          >
                            <div className="cart-col-1 gap-15 d-flex align-items-center">
                              <div className="w-25">
                                <img
                                  src={item?.productId?.images[0].url}
                                  className="img-fluid"
                                  alt="product"
                                />
                              </div>
                              <div className="w-75">
                                <p>{item?.productId?.title}</p>
                                <div className="d-flex gap-3">
                                  <span>Màu:</span>
                                  <ul className="colors ps-0">
                                    <li
                                      style={{
                                        backgroundColor: item?.color?.title,
                                      }}
                                    ></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="cart-col-2">
                              <h5 className="price">
                                {Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(item?.productId?.price)}
                              </h5>
                            </div>
                            <div className="cart-col-3 d-flex align-items-center gap-15">
                              <div>
                                <input
                                  className="form-control"
                                  type="number"
                                  name=""
                                  min={1}
                                  value={item?.quantity}
                                  max={10}
                                  id=""
                                  onChange={(e) =>
                                    handleUpdateQuantity(
                                      item?._id,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div>
                                <AiFillDelete
                                  onClick={() => {
                                    deleteACartProduct(item?._id);
                                  }}
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="cart-col-4">
                              <h5 className="price">
                                {Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(
                                  item?.productId?.price * item?.quantity
                                )}
                              </h5>
                            </div>
                          </div>
                        );
                      })}
                    <div className="col-12 py-2 mt-4">
                      <div className="d-flex justify-content-between align-items-baseline">
                        <Link to="/product" className="button">
                          Tiếp tục mua hàng
                        </Link>
                        {(totalAmount !== null || totalAmount !== 0) && (
                          <div className="d-flex flex-column align-items-end">
                            <h4>
                              Tổng tiền:{" "}
                              {userCartState?.length === 0
                                ? Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(0)
                                : Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(totalAmount)}
                            </h4>
                            <p>
                              Thuế và phí vẫn chuyển được tính khi thanh toán
                            </p>
                            <Link to="/checkout" className="button">
                              Thanh toán
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Cart;
