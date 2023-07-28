import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { Button, Result } from "antd";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  addOrder,
  addOrderGuest,
  deleteCartProduct,
  resetState,
} from "../features/user/userSlice";
import { getAllProducts } from "../features/products/productSlice";
import { getCoupons } from "../features/coupons/couponsSlice";
import Cookies from "js-cookie";

const shippingSchema = yup.object({
  firstName: yup.string().required("Họ không được để trống"),
  lastName: yup.string().required("Tên không được để trống"),
  mobile: yup.number().required("Số điện thoại không được để trống"),
  email: yup.string().required("Email không được để trống"),
  address: yup.string().required("Địa chỉ không được để trống"),
  state: yup.string().required("Quận không được để trống"),
  city: yup.string().required("Thành phố không được để trống"),
  zipcode: yup.string().required("Mã bưu điện không được để trống"),
});

const Checkout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getCoupons());
  }, []);
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.auth.cartProducts);
  const userState = useSelector((state) => state.auth.user);
  const couponState = useSelector((state) => state.coupon.coupons);
  const [totalAmount, setTotalAmount] = useState(null); //tổng tiền trong giỏ hàng
  const [totalAmountCartTemp, setTotalAmountCartTemp] = useState(null); //tổng tiền trong giỏ hàng tạm
  const [amountDiscount, setAmountDiscount] = useState(0); //số tiền được giảm
  useState(null);
  const [totalAmountAfterDiscount, setTotalAmountAfterDiscount] =
    useState(null); //tổng tiền sau khi giảm giá
  const [shippingInfoUser, setShippingInfoUser] = useState(null);
  const [cartProductState, setCartProductState] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD"); //chọn phương thức thanh toán
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


  useEffect(() => {
    const cartFromCookie = getTemporaryCartFromCookieIfExists();
    if (cartFromCookie) {
      setTemporaryCart(cartFromCookie);
    }
  }, []);
  //lay danh sach 63 tinh
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/luongiautinhcam/techshop/main/src/data/city.json"
        );
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchData();
  }, []);

  //tổng tiền trong giỏ hàng tạm
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < temporaryCart?.length; index++) {
      sum =
        sum +
        Number(temporaryCart[index].quantity) * temporaryCart[index].price;
      setTotalAmountCartTemp(sum);
    }
    setTotalAmountAfterDiscount(totalAmountCartTemp);
  }, [temporaryCart, totalAmountCartTemp]);

  //tổng tiền trong giỏ hàng người dùng
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotalAmount(sum);
    }
    setTotalAmountAfterDiscount(totalAmount);
  }, [cartState, totalAmount]);

  //lay danh sach san pham trong gio hang
  useEffect(() => {
    let items = [];
    if (userState === null) {
      for (let index = 0; index < temporaryCart?.length; index++) {
        items.push({
          product: temporaryCart[index].productId,
          color: temporaryCart[index].color,
          quantity: temporaryCart[index].quantity,
          price: temporaryCart[index].price,
        });
      }
    } else {
      for (let index = 0; index < cartState?.length; index++) {
        items.push({
          product: cartState[index].productId._id,
          color: cartState[index].color._id,
          quantity: cartState[index].quantity,
          price: cartState[index].price,
        });
      }
    }

    setCartProductState(items);
  }, [userState, temporaryCart, cartState]);

  const handleLinkClick = () => {
    const emptyValues = {
      firstName: "",
      lastName: "",
      mobile: "",
      address: "",
      other: "",
      state: "",
      city: "",
      zipcode: "",
    };
    formik.setValues(emptyValues);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userState?.firstname || "",
      lastName: userState?.lastname || "",
      mobile: userState?.mobile || "",
      address: userState?.address || "",
      email: userState?.email || "",
      other: "",
      state: userState?.state || "",
      city: userState?.city || "",
      zipcode: userState?.zipcode || "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values, { resetForm }) => {
      let totalAmountAfterShipping = totalAmountAfterDiscount;
      if (totalAmount < 1000000 || totalAmountCartTemp < 1000000) {
        totalAmountAfterShipping += 50000;
      }
      if (selectedPaymentMethod === "COD") {
        if (userState == null) {
          setTimeout(() => {
            dispatch(
              addOrderGuest({
                totalPrice: totalAmountCartTemp,
                priceDiscount: amountDiscount,
                totalPriceAfterDiscount: totalAmountAfterShipping,
                orderItems: cartProductState,
                shippingInfo: shippingInfoUser,
              })
            );
            resetForm();
            Cookies.remove("temporaryCart");
            setTimeout(() => {
              navigate("/my-orders");
            }, 300);
          }, 300);
        } else {
          setTimeout(() => {
            dispatch(
              addOrder({
                totalPrice: totalAmount,
                priceDiscount: amountDiscount,
                totalPriceAfterDiscount: totalAmountAfterShipping,
                orderItems: cartProductState,
                shippingInfo: shippingInfoUser,
              })
            );
            dispatch(resetState());
            for (let index = 0; index < cartState?.length; index++) {
              dispatch(deleteCartProduct(cartState[index]?._id));
              dispatch(resetState());
            }
            setTimeout(() => {
              navigate("/my-orders");
            }, 1000);
          }, 300);
        }
      } else if (selectedPaymentMethod === "Momo") {
      }
    },
  });

  useEffect(() => {
    if (formik.values.firstName || formik.values.lastName) {
      setShippingInfoUser({
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        mobile: formik.values.mobile,
        email: formik.values.email,
        address: formik.values.address,
        other: formik.values.other,
        state: formik.values.state,
        city: formik.values.city,
        zipcode: formik.values.zipcode,
      });
    }
  }, [
    formik.values.firstName,
    formik.values.lastName,
    formik.values.mobile,
    formik.values.email,
    formik.values.address,
    formik.values.other,
    formik.values.state,
    formik.values.city,
    formik.values.zipcode,
  ]);

  //áp mã giảm giá
  const applyCoupon = (couponCode) => {
    const coupon = couponState.find((c) => c.name === couponCode);
    if (userState === null) {
      if (coupon) {
        const discountedAmount = (totalAmountCartTemp * coupon.discount) / 100;
        setAmountDiscount(discountedAmount); //đặt số tiền được giảm
        const totalAmountAfterDiscount = totalAmountCartTemp - discountedAmount;
        setTotalAmountAfterDiscount(totalAmountAfterDiscount); //đặt tổng số tiền sau khi giảm giá
        setAppliedCoupon(coupon);
      } else {
        setTotalAmountAfterDiscount(totalAmountCartTemp);
        setAppliedCoupon(null);
      }
    } else {
      if (coupon) {
        const discountedAmount = (totalAmount * coupon.discount) / 100;
        setAmountDiscount(discountedAmount); //đặt số tiền được giảm
        const totalAmountAfterDiscount = totalAmount - discountedAmount;
        setTotalAmountAfterDiscount(totalAmountAfterDiscount); //đặt tổng số tiền sau khi giảm giá
        setAppliedCoupon(coupon);
      } else {
        setTotalAmountAfterDiscount(totalAmount);
        setAppliedCoupon(null);
      }
    }
  };
  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        {totalAmountCartTemp === null && totalAmount === null ? (
          <>
            <Result
              status="404"
              title="Bạn chưa có gì trong giỏ hàng"
              subTitle="Hãy thêm sản phẩm cần mua vào giỏ hàng rồi mới thanh toán nhé"
              extra={
                <Button type="primary">
                  <Link to="/product">Mua sắm ngay</Link>
                </Button>
              }
            />
          </>
        ) : (
          <>
            {" "}
            {userState === null ? (
              <>
                <div className="row">
                  <div className="col-7">
                    <div className="checkout-left-data">
                      <h3 className="website-name">Tech Shop</h3>
                      <nav
                        style={{ "--bs-breadcrumb-divider": ">" }}
                        aria-label="breadcrumb"
                      >
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item">
                            <Link className="text-dark total-price" to="/cart">
                              Giỏ hàng
                            </Link>
                          </li>
                          &nbsp; /
                          <li
                            className="breadcrumb-item total-price active"
                            aria-current="page"
                          >
                            Thông tin
                          </li>
                          &nbsp; /
                          <li className="breadcrumb-item total-price active">
                            Giao hàng
                          </li>
                          &nbsp; /
                          <li
                            className="breadcrumb-item total-price active"
                            aria-current="page"
                          >
                            Thanh toán
                          </li>
                        </ol>
                      </nav>

                      <form
                        action=""
                        onSubmit={formik.handleSubmit}
                        className="d-flex gap-15 flex-wrap justify-content-between"
                      >
                        <div className="flex-grow-1">
                          <input
                            name="firstName"
                            type="text"
                            placeholder="Họ"
                            className="form-control"
                            onChange={formik.handleChange("firstName")}
                            onBlur={formik.handleBlur("firstName")}
                            value={formik.values.firstName}
                          />
                          <div className="error ms-2 my-1">
                            {formik.touched.firstName &&
                              formik.errors.firstName}
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <input
                            name="lastName"
                            type="text"
                            placeholder="Tên"
                            className="form-control"
                            onChange={formik.handleChange("lastName")}
                            onBlur={formik.handleBlur("lastName")}
                            value={formik.values.lastName}
                          />
                          <div className="error ms-2 my-1">
                            {formik.touched.lastName && formik.errors.lastName}
                          </div>
                        </div>
                        <div className="w-100">
                          <input
                            name="mobile"
                            type="number"
                            placeholder="Số điện thoại"
                            className="form-control"
                            onChange={formik.handleChange("mobile")}
                            onBlur={formik.handleBlur("mobile")}
                            value={formik.values.mobile}
                          />
                          <div className="error ms-2 my-1">
                            {formik.touched.mobile && formik.errors.mobile}
                          </div>
                        </div>
                        <div className="w-100">
                          <input
                            name="email"
                            type="text"
                            placeholder="Email"
                            className="form-control"
                            onChange={formik.handleChange("email")}
                            onBlur={formik.handleBlur("email")}
                            value={formik.values.email}
                          />
                          <div className="error ms-2 my-1">
                            {formik.touched.email && formik.errors.email}
                          </div>
                        </div>
                        <div className="w-100">
                          <input
                            name="address"
                            type="text"
                            placeholder="Địa chỉ"
                            className="form-control"
                            onChange={formik.handleChange("address")}
                            onBlur={formik.handleBlur("address")}
                            value={formik.values.address}
                          />
                          <div className="error ms-2 my-1">
                            {formik.touched.address && formik.errors.address}
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <input
                            name="state"
                            type="text"
                            placeholder="Quận/Huyện"
                            className="form-control"
                            onChange={formik.handleChange("state")}
                            onBlur={formik.handleBlur("state")}
                            value={formik.values.state}
                          />
                          <div className="error ms-2 my-1">
                            {formik.touched.state && formik.errors.state}
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <select
                            name="city"
                            onChange={formik.handleChange("city")}
                            onBlur={formik.handleBlur("city")}
                            value={formik.values.city}
                            className="form-control form-select"
                            id=""
                          >
                            <option value="">Chọn thành phố</option>
                            {cities?.map((i, j) => {
                              return (
                                <option key={j} value={i.name}>
                                  {i.name}
                                </option>
                              );
                            })}
                          </select>
                          <div className="error ms-2 my-1">
                            {formik.touched.city && formik.errors.city}
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <input
                            name="zipcode"
                            type="text"
                            placeholder="Mã bưu điện"
                            className="form-control"
                            onChange={formik.handleChange("zipcode")}
                            onBlur={formik.handleBlur("zipcode")}
                            value={formik.values.zipcode}
                          />
                          <div className="error ms-2 my-1">
                            {formik.touched.zipcode && formik.errors.zipcode}
                          </div>
                        </div>
                        <div className="w-100">
                          <input
                            name="other"
                            type="text"
                            placeholder="Ghi chú"
                            className="form-control"
                            onChange={formik.handleChange("other")}
                            onBlur={formik.handleBlur("other")}
                            value={formik.values.other}
                          />
                        </div>
                        <div className="w-100">
                          <h4 className="mb-0">Phương thức thanh toán</h4>
                        </div>
                        <div className="w-100">
                          <div className="row">
                            <div>
                              <input
                                className="form-check-input mb-3"
                                type="radio"
                                name="paymentMethod"
                                id="paymentCOD"
                                value="COD"
                                checked={selectedPaymentMethod === "COD"}
                                onChange={(e) =>
                                  setSelectedPaymentMethod(e.target.value)
                                }
                              />
                              Thanh toán khi nhận hàng (COD)
                            </div>
                            <div>
                              <input
                                className="form-check-input mb-3"
                                type="radio"
                                name="paymentMethod"
                                id="paymentMomo"
                                value="Momo"
                                checked={selectedPaymentMethod === "Momo"}
                                onChange={(e) =>
                                  setSelectedPaymentMethod(e.target.value)
                                }
                                disabled
                              />
                              Thanh toán qua Momo
                            </div>
                          </div>
                        </div>
                        <div className="w-100">
                          <div className="d-flex justify-content-between align-items-center">
                            <Link to="/cart" className="text-dark">
                              <BiArrowBack className="me-2" />
                              Trở về giỏ hàng
                            </Link>
                            <Link to="/product" className="button">
                              Tiếp tục mua sắm
                            </Link>
                            {totalAmountCartTemp > 0 ? (
                              <>
                                <button className="button" type="submit">
                                  Thanh toán
                                </button>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="border-bottom py-4">
                      {temporaryCart &&
                        temporaryCart?.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="d-flex gap-10 mb-2 align-items-center"
                            >
                              <div className="w-75 d-flex gap-10">
                                <div className="w-25 position-relative">
                                  <span
                                    style={{ top: "-10px", right: "2px" }}
                                    className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                                  >
                                    {item?.quantity}
                                  </span>
                                  <img
                                    width={100}
                                    height={100}
                                    src={item?.productImg}
                                    alt="product"
                                  />
                                </div>
                                <div>
                                  <h5 className="total-price">
                                    {item?.productTitle}
                                  </h5>
                                  <p className="total-price">
                                    {item?.colorName}
                                  </p>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="total">
                                  {Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(item?.quantity * item?.price)}
                                </h5>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <div className="border-bottom py-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="total">Tổng thành tiền</p>
                        <p className="total-price">
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(
                            totalAmountCartTemp ? totalAmountCartTemp : "0"
                          )}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0 total">Phí giao hàng</p>
                        <p className="mb-0 total-price">
                          {totalAmount > 1000000 ||
                          totalAmountCartTemp > 1000000
                            ? "Miễn phí giao hàng"
                            : Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(50000)}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                      <h4 className="total">Mã giảm giá</h4>
                      <form
                        className="card p-2"
                        onSubmit={(e) => {
                          e.preventDefault();
                          const couponCode = e.target.elements.couponCode.value;
                          applyCoupon(couponCode);
                        }}
                      >
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Mã giảm giá"
                            name="couponCode"
                          />
                          <div className="input-group-append">
                            <button type="submit" className="btn btn-secondary">
                              Áp dụng
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    {appliedCoupon ? (
                      <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                        <h4 className="total">Giảm giá</h4>
                        <h5 className="mb-0 total-price">
                          {appliedCoupon.name} (-{appliedCoupon.discount}%) : -
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(amountDiscount)}
                        </h5>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                      <h4 className="total">Tổng tiền</h4>
                      <h5 className="total-price">
                        {appliedCoupon ? (
                          <>
                            {totalAmountCartTemp > 1000000
                              ? Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(totalAmountCartTemp - amountDiscount)
                              : Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(
                                  totalAmountCartTemp - amountDiscount + 50000
                                )}
                          </>
                        ) : (
                          <>
                            {totalAmountCartTemp > 1000000
                              ? Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(totalAmountCartTemp)
                              : Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(totalAmountCartTemp + 50000)}
                          </>
                        )}
                      </h5>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="row">
                <div className="col-7">
                  <div className="checkout-left-data">
                    <h3 className="website-name">Tech Shop</h3>
                    <nav
                      style={{ "--bs-breadcrumb-divider": ">" }}
                      aria-label="breadcrumb"
                    >
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link className="text-dark total-price" to="/cart">
                            Giỏ hàng
                          </Link>
                        </li>
                        &nbsp; /
                        <li
                          className="breadcrumb-item total-price active"
                          aria-current="page"
                        >
                          Thông tin
                        </li>
                        &nbsp; /
                        <li className="breadcrumb-item total-price active">
                          Giao hàng
                        </li>
                        &nbsp; /
                        <li
                          className="breadcrumb-item total-price active"
                          aria-current="page"
                        >
                          Thanh toán
                        </li>
                      </ol>
                    </nav>
                    <h4 className="title total total-price">
                      Thông tin liên hệ
                    </h4>
                    <p className="user-details">
                      {userState?.firstname + " " + userState?.lastname + " "}(
                      {userState?.email})
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="mb-3">Thông tin nhận hàng</h4>
                      <Link to="#" className="fs-4" onClick={handleLinkClick}>
                        <FiEdit />
                      </Link>
                    </div>

                    <form
                      action=""
                      onSubmit={formik.handleSubmit}
                      className="d-flex gap-15 flex-wrap justify-content-between"
                    >
                      <div className="flex-grow-1">
                        <input
                          name="firstName"
                          type="text"
                          placeholder="Họ"
                          className="form-control"
                          onChange={formik.handleChange("firstName")}
                          onBlur={formik.handleBlur("firstName")}
                          value={formik.values.firstName}
                        />
                        <div className="error ms-2 my-1">
                          {formik.touched.firstName && formik.errors.firstName}
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <input
                          name="lastName"
                          type="text"
                          placeholder="Tên"
                          className="form-control"
                          onChange={formik.handleChange("lastName")}
                          onBlur={formik.handleBlur("lastName")}
                          value={formik.values.lastName}
                        />
                        <div className="error ms-2 my-1">
                          {formik.touched.lastName && formik.errors.lastName}
                        </div>
                      </div>
                      <div className="w-100">
                        <input
                          name="mobile"
                          type="number"
                          placeholder="Số điện thoại"
                          className="form-control"
                          onChange={formik.handleChange("mobile")}
                          onBlur={formik.handleBlur("mobile")}
                          value={formik.values.mobile}
                        />
                        <div className="error ms-2 my-1">
                          {formik.touched.mobile && formik.errors.mobile}
                        </div>
                      </div>
                      <div className="w-100">
                        <input
                          name="email"
                          type="text"
                          placeholder="Email"
                          className="form-control"
                          onChange={formik.handleChange("email")}
                          onBlur={formik.handleBlur("email")}
                          value={formik.values.email}
                        />
                        <div className="error ms-2 my-1">
                          {formik.touched.email && formik.errors.email}
                        </div>
                      </div>
                      <div className="w-100">
                        <input
                          name="address"
                          type="text"
                          placeholder="Địa chỉ"
                          className="form-control"
                          onChange={formik.handleChange("address")}
                          onBlur={formik.handleBlur("address")}
                          value={formik.values.address}
                        />
                        <div className="error ms-2 my-1">
                          {formik.touched.address && formik.errors.address}
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <input
                          name="state"
                          type="text"
                          placeholder="Quận/Huyện"
                          className="form-control"
                          onChange={formik.handleChange("state")}
                          onBlur={formik.handleBlur("state")}
                          value={formik.values.state}
                        />
                        <div className="error ms-2 my-1">
                          {formik.touched.state && formik.errors.state}
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <select
                          name="city"
                          onChange={formik.handleChange("city")}
                          onBlur={formik.handleBlur("city")}
                          value={formik.values.city}
                          className="form-control form-select"
                          id=""
                        >
                          <option value="">Chọn thành phố</option>
                          {cities?.map((i, j) => {
                            return (
                              <option key={j} value={i.name}>
                                {i.name}
                              </option>
                            );
                          })}
                        </select>
                        <div className="error ms-2 my-1">
                          {formik.touched.city && formik.errors.city}
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <input
                          name="zipcode"
                          type="text"
                          placeholder="Mã bưu điện"
                          className="form-control"
                          onChange={formik.handleChange("zipcode")}
                          onBlur={formik.handleBlur("zipcode")}
                          value={formik.values.zipcode}
                        />
                        <div className="error ms-2 my-1">
                          {formik.touched.zipcode && formik.errors.zipcode}
                        </div>
                      </div>
                      <div className="w-100">
                        <input
                          name="other"
                          type="text"
                          placeholder="Ghi chú"
                          className="form-control"
                          onChange={formik.handleChange("other")}
                          onBlur={formik.handleBlur("other")}
                          value={formik.values.other}
                        />
                      </div>
                      <div className="w-100">
                        <h4 className="mb-0">Phương thức thanh toán</h4>
                      </div>
                      <div className="w-100">
                        <div className="row">
                          <div>
                            <input
                              className="form-check-input mb-3"
                              type="radio"
                              name="paymentMethod"
                              id="paymentCOD"
                              value="COD"
                              checked={selectedPaymentMethod === "COD"}
                              onChange={(e) =>
                                setSelectedPaymentMethod(e.target.value)
                              }
                            />
                            Thanh toán khi nhận hàng (COD)
                          </div>
                          <div>
                            <input
                              className="form-check-input mb-3"
                              type="radio"
                              name="paymentMethod"
                              id="paymentMomo"
                              value="Momo"
                              checked={selectedPaymentMethod === "Momo"}
                              onChange={(e) =>
                                setSelectedPaymentMethod(e.target.value)
                              }
                              // disabled
                            />
                            Thanh toán qua Momo
                          </div>
                        </div>
                      </div>
                      <div className="w-100">
                        <div className="d-flex justify-content-between align-items-center">
                          <Link to="/cart" className="text-dark">
                            <BiArrowBack className="me-2" />
                            Trở về giỏ hàng
                          </Link>
                          <Link to="/product" className="button">
                            Tiếp tục mua sắm
                          </Link>
                          {totalAmount > 0 ? (
                            <>
                              <button className="button" type="submit">
                                Thanh toán
                              </button>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-5">
                  <div className="border-bottom py-4">
                    {cartState &&
                      cartState?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="d-flex gap-10 mb-2 align-items-center"
                          >
                            <div className="w-75 d-flex gap-10">
                              <div className="w-25 position-relative">
                                <span
                                  style={{ top: "-10px", right: "2px" }}
                                  className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                                >
                                  {item?.quantity}
                                </span>
                                <img
                                  width={100}
                                  height={100}
                                  src={item?.productId?.images[0]?.url}
                                  alt="product"
                                />
                              </div>
                              <div>
                                <h5 className="total-price">
                                  {item?.productId?.title}
                                </h5>
                                <p className="total-price">
                                  {item?.color?.title}
                                </p>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h5 className="total">
                                {Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(item?.quantity * item?.price)}
                              </h5>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div className="border-bottom py-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="total">Tổng thành tiền</p>
                      <p className="total-price">
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(totalAmount ? totalAmount : "0")}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-0 total">Phí giao hàng</p>
                      <p className="mb-0 total-price">
                        {totalAmount > 1000000
                          ? "Miễn phí giao hàng"
                          : Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(50000)}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                    <h4 className="total">Mã giảm giá</h4>
                    <form
                      className="card p-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const couponCode = e.target.elements.couponCode.value;
                        applyCoupon(couponCode);
                      }}
                    >
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Mã giảm giá"
                          name="couponCode"
                        />
                        <div className="input-group-append">
                          <button type="submit" className="btn btn-secondary">
                            Áp dụng
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  {appliedCoupon ? (
                    <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                      <h4 className="total">Giảm giá</h4>
                      <h5 className="mb-0 total-price">
                        {appliedCoupon.name} (-{appliedCoupon.discount}%) : -
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(amountDiscount)}
                      </h5>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                    <h4 className="total">Tổng tiền</h4>
                    <h5 className="total-price">
                      {appliedCoupon ? (
                        <>
                          {totalAmount > 1000000
                            ? Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(totalAmount - amountDiscount)
                            : Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(totalAmount - amountDiscount + 50000)}
                        </>
                      ) : (
                        <>
                          {totalAmount > 1000000
                            ? Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(totalAmount)
                            : Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(totalAmount + 50000)}
                        </>
                      )}
                    </h5>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {/* {userState === null ? (
          <>
            <div className="row">
              <div className="col-7">
                <div className="checkout-left-data">
                  <h3 className="website-name">Tech Shop</h3>
                  <nav
                    style={{ "--bs-breadcrumb-divider": ">" }}
                    aria-label="breadcrumb"
                  >
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link className="text-dark total-price" to="/cart">
                          Giỏ hàng
                        </Link>
                      </li>
                      &nbsp; /
                      <li
                        className="breadcrumb-item total-price active"
                        aria-current="page"
                      >
                        Thông tin
                      </li>
                      &nbsp; /
                      <li className="breadcrumb-item total-price active">
                        Giao hàng
                      </li>
                      &nbsp; /
                      <li
                        className="breadcrumb-item total-price active"
                        aria-current="page"
                      >
                        Thanh toán
                      </li>
                    </ol>
                  </nav>

                  <form
                    action=""
                    onSubmit={formik.handleSubmit}
                    className="d-flex gap-15 flex-wrap justify-content-between"
                  >
                    <div className="flex-grow-1">
                      <input
                        name="firstName"
                        type="text"
                        placeholder="Họ"
                        className="form-control"
                        onChange={formik.handleChange("firstName")}
                        onBlur={formik.handleBlur("firstName")}
                        value={formik.values.firstName}
                      />
                      <div className="error ms-2 my-1">
                        {formik.touched.firstName && formik.errors.firstName}
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <input
                        name="lastName"
                        type="text"
                        placeholder="Tên"
                        className="form-control"
                        onChange={formik.handleChange("lastName")}
                        onBlur={formik.handleBlur("lastName")}
                        value={formik.values.lastName}
                      />
                      <div className="error ms-2 my-1">
                        {formik.touched.lastName && formik.errors.lastName}
                      </div>
                    </div>
                    <div className="w-100">
                      <input
                        name="mobile"
                        type="number"
                        placeholder="Số điện thoại"
                        className="form-control"
                        onChange={formik.handleChange("mobile")}
                        onBlur={formik.handleBlur("mobile")}
                        value={formik.values.mobile}
                      />
                      <div className="error ms-2 my-1">
                        {formik.touched.mobile && formik.errors.mobile}
                      </div>
                    </div>
                    <div className="w-100">
                      <input
                        name="email"
                        type="text"
                        placeholder="Email"
                        className="form-control"
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                        value={formik.values.email}
                      />
                      <div className="error ms-2 my-1">
                        {formik.touched.email && formik.errors.email}
                      </div>
                    </div>
                    <div className="w-100">
                      <input
                        name="address"
                        type="text"
                        placeholder="Địa chỉ"
                        className="form-control"
                        onChange={formik.handleChange("address")}
                        onBlur={formik.handleBlur("address")}
                        value={formik.values.address}
                      />
                      <div className="error ms-2 my-1">
                        {formik.touched.address && formik.errors.address}
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <input
                        name="state"
                        type="text"
                        placeholder="Quận/Huyện"
                        className="form-control"
                        onChange={formik.handleChange("state")}
                        onBlur={formik.handleBlur("state")}
                        value={formik.values.state}
                      />
                      <div className="error ms-2 my-1">
                        {formik.touched.state && formik.errors.state}
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <select
                        name="city"
                        onChange={formik.handleChange("city")}
                        onBlur={formik.handleBlur("city")}
                        value={formik.values.city}
                        className="form-control form-select"
                        id=""
                      >
                        <option value="">Chọn thành phố</option>
                        {cities?.map((i, j) => {
                          return (
                            <option key={j} value={i.name}>
                              {i.name}
                            </option>
                          );
                        })}
                      </select>
                      <div className="error ms-2 my-1">
                        {formik.touched.city && formik.errors.city}
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <input
                        name="zipcode"
                        type="text"
                        placeholder="Mã bưu điện"
                        className="form-control"
                        onChange={formik.handleChange("zipcode")}
                        onBlur={formik.handleBlur("zipcode")}
                        value={formik.values.zipcode}
                      />
                      <div className="error ms-2 my-1">
                        {formik.touched.zipcode && formik.errors.zipcode}
                      </div>
                    </div>
                    <div className="w-100">
                      <input
                        name="other"
                        type="text"
                        placeholder="Ghi chú"
                        className="form-control"
                        onChange={formik.handleChange("other")}
                        onBlur={formik.handleBlur("other")}
                        value={formik.values.other}
                      />
                    </div>
                    <div className="w-100">
                      <h4 className="mb-0">Phương thức thanh toán</h4>
                    </div>
                    <div className="w-100">
                      <div className="row">
                        <div>
                          <input
                            className="form-check-input mb-3"
                            type="radio"
                            name="paymentMethod"
                            id="paymentCOD"
                            value="COD"
                            checked={selectedPaymentMethod === "COD"}
                            onChange={(e) =>
                              setSelectedPaymentMethod(e.target.value)
                            }
                          />
                          Thanh toán khi nhận hàng (COD)
                        </div>
                        <div>
                          <input
                            className="form-check-input mb-3"
                            type="radio"
                            name="paymentMethod"
                            id="paymentMomo"
                            value="Momo"
                            checked={selectedPaymentMethod === "Momo"}
                            onChange={(e) =>
                              setSelectedPaymentMethod(e.target.value)
                            }
                            disabled
                          />
                          Thanh toán qua Momo
                        </div>
                      </div>
                    </div>
                    <div className="w-100">
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/cart" className="text-dark">
                          <BiArrowBack className="me-2" />
                          Trở về giỏ hàng
                        </Link>
                        <Link to="/product" className="button">
                          Tiếp tục mua sắm
                        </Link>
                        {totalAmountCartTemp > 0 ? (
                          <>
                            <button className="button" type="submit">
                              Thanh toán
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-5">
                <div className="border-bottom py-4">
                  {temporaryCart &&
                    temporaryCart?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="d-flex gap-10 mb-2 align-items-center"
                        >
                          <div className="w-75 d-flex gap-10">
                            <div className="w-25 position-relative">
                              <span
                                style={{ top: "-10px", right: "2px" }}
                                className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                              >
                                {item?.quantity}
                              </span>
                              <img
                                width={100}
                                height={100}
                                src={item?.productImg}
                                alt="product"
                              />
                            </div>
                            <div>
                              <h5 className="total-price">
                                {item?.productTitle}
                              </h5>
                              <p className="total-price">{item?.colorName}</p>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="total">
                              {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item?.quantity * item?.price)}
                            </h5>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="border-bottom py-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="total">Tổng thành tiền</p>
                    <p className="total-price">
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(
                        totalAmountCartTemp ? totalAmountCartTemp : "0"
                      )}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 total">Phí giao hàng</p>
                    <p className="mb-0 total-price">
                      {totalAmount > 1000000 || totalAmountCartTemp > 1000000
                        ? "Miễn phí giao hàng"
                        : Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(50000)}
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                  <h4 className="total">Mã giảm giá</h4>
                  <form
                    className="card p-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const couponCode = e.target.elements.couponCode.value;
                      applyCoupon(couponCode);
                    }}
                  >
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Mã giảm giá"
                        name="couponCode"
                      />
                      <div className="input-group-append">
                        <button type="submit" className="btn btn-secondary">
                          Áp dụng
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                {appliedCoupon ? (
                  <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                    <h4 className="total">Giảm giá</h4>
                    <h5 className="mb-0 total-price">
                      {appliedCoupon.name} (-{appliedCoupon.discount}%) : -
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(amountDiscount)}
                    </h5>
                  </div>
                ) : (
                  ""
                )}
                <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                  <h4 className="total">Tổng tiền</h4>
                  <h5 className="total-price">
                    {appliedCoupon ? (
                      <>
                        {totalAmountCartTemp > 1000000
                          ? Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(totalAmountCartTemp - amountDiscount)
                          : Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(
                              totalAmountCartTemp - amountDiscount + 50000
                            )}
                      </>
                    ) : (
                      <>
                        {totalAmountCartTemp > 1000000
                          ? Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(totalAmountCartTemp)
                          : Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(totalAmountCartTemp + 50000)}
                      </>
                    )}
                  </h5>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <h3 className="website-name">Tech Shop</h3>
                <nav
                  style={{ "--bs-breadcrumb-divider": ">" }}
                  aria-label="breadcrumb"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link className="text-dark total-price" to="/cart">
                        Giỏ hàng
                      </Link>
                    </li>
                    &nbsp; /
                    <li
                      className="breadcrumb-item total-price active"
                      aria-current="page"
                    >
                      Thông tin
                    </li>
                    &nbsp; /
                    <li className="breadcrumb-item total-price active">
                      Giao hàng
                    </li>
                    &nbsp; /
                    <li
                      className="breadcrumb-item total-price active"
                      aria-current="page"
                    >
                      Thanh toán
                    </li>
                  </ol>
                </nav>
                <h4 className="title total total-price">Thông tin liên hệ</h4>
                <p className="user-details">
                  {userState?.firstname + " " + userState?.lastname + " "}(
                  {userState?.email})
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-3">Thông tin nhận hàng</h4>
                  <Link to="#" className="fs-4" onClick={handleLinkClick}>
                    <FiEdit />
                  </Link>
                </div>

                <form
                  action=""
                  onSubmit={formik.handleSubmit}
                  className="d-flex gap-15 flex-wrap justify-content-between"
                >
                  <div className="flex-grow-1">
                    <input
                      name="firstName"
                      type="text"
                      placeholder="Họ"
                      className="form-control"
                      onChange={formik.handleChange("firstName")}
                      onBlur={formik.handleBlur("firstName")}
                      value={formik.values.firstName}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.firstName && formik.errors.firstName}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Tên"
                      className="form-control"
                      onChange={formik.handleChange("lastName")}
                      onBlur={formik.handleBlur("lastName")}
                      value={formik.values.lastName}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.lastName && formik.errors.lastName}
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      name="mobile"
                      type="number"
                      placeholder="Số điện thoại"
                      className="form-control"
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")}
                      value={formik.values.mobile}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      name="email"
                      type="text"
                      placeholder="Email"
                      className="form-control"
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      value={formik.values.email}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      name="address"
                      type="text"
                      placeholder="Địa chỉ"
                      className="form-control"
                      onChange={formik.handleChange("address")}
                      onBlur={formik.handleBlur("address")}
                      value={formik.values.address}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.address && formik.errors.address}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      name="state"
                      type="text"
                      placeholder="Quận/Huyện"
                      className="form-control"
                      onChange={formik.handleChange("state")}
                      onBlur={formik.handleBlur("state")}
                      value={formik.values.state}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.state && formik.errors.state}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <select
                      name="city"
                      onChange={formik.handleChange("city")}
                      onBlur={formik.handleBlur("city")}
                      value={formik.values.city}
                      className="form-control form-select"
                      id=""
                    >
                      <option value="">Chọn thành phố</option>
                      {cities?.map((i, j) => {
                        return (
                          <option key={j} value={i.name}>
                            {i.name}
                          </option>
                        );
                      })}
                    </select>
                    <div className="error ms-2 my-1">
                      {formik.touched.city && formik.errors.city}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      name="zipcode"
                      type="text"
                      placeholder="Mã bưu điện"
                      className="form-control"
                      onChange={formik.handleChange("zipcode")}
                      onBlur={formik.handleBlur("zipcode")}
                      value={formik.values.zipcode}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.zipcode && formik.errors.zipcode}
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      name="other"
                      type="text"
                      placeholder="Ghi chú"
                      className="form-control"
                      onChange={formik.handleChange("other")}
                      onBlur={formik.handleBlur("other")}
                      value={formik.values.other}
                    />
                  </div>
                  <div className="w-100">
                    <h4 className="mb-0">Phương thức thanh toán</h4>
                  </div>
                  <div className="w-100">
                    <div className="row">
                      <div>
                        <input
                          className="form-check-input mb-3"
                          type="radio"
                          name="paymentMethod"
                          id="paymentCOD"
                          value="COD"
                          checked={selectedPaymentMethod === "COD"}
                          onChange={(e) =>
                            setSelectedPaymentMethod(e.target.value)
                          }
                        />
                        Thanh toán khi nhận hàng (COD)
                      </div>
                      <div>
                        <input
                          className="form-check-input mb-3"
                          type="radio"
                          name="paymentMethod"
                          id="paymentMomo"
                          value="Momo"
                          checked={selectedPaymentMethod === "Momo"}
                          onChange={(e) =>
                            setSelectedPaymentMethod(e.target.value)
                          }
                          // disabled
                        />
                        Thanh toán qua Momo
                      </div>
                    </div>
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/cart" className="text-dark">
                        <BiArrowBack className="me-2" />
                        Trở về giỏ hàng
                      </Link>
                      <Link to="/product" className="button">
                        Tiếp tục mua sắm
                      </Link>
                      {totalAmount > 0 ? (
                        <>
                          <button className="button" type="submit">
                            Thanh toán
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-5">
              <div className="border-bottom py-4">
                {cartState &&
                  cartState?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex gap-10 mb-2 align-items-center"
                      >
                        <div className="w-75 d-flex gap-10">
                          <div className="w-25 position-relative">
                            <span
                              style={{ top: "-10px", right: "2px" }}
                              className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                            >
                              {item?.quantity}
                            </span>
                            <img
                              width={100}
                              height={100}
                              src={item?.productId?.images[0]?.url}
                              alt="product"
                            />
                          </div>
                          <div>
                            <h5 className="total-price">
                              {item?.productId?.title}
                            </h5>
                            <p className="total-price">{item?.color?.title}</p>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="total">
                            {Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item?.quantity * item?.price)}
                          </h5>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total">Tổng thành tiền</p>
                  <p className="total-price">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalAmount ? totalAmount : "0")}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Phí giao hàng</p>
                  <p className="mb-0 total-price">
                    {totalAmount > 1000000
                      ? "Miễn phí giao hàng"
                      : Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(50000)}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                <h4 className="total">Mã giảm giá</h4>
                <form
                  className="card p-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const couponCode = e.target.elements.couponCode.value;
                    applyCoupon(couponCode);
                  }}
                >
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mã giảm giá"
                      name="couponCode"
                    />
                    <div className="input-group-append">
                      <button type="submit" className="btn btn-secondary">
                        Áp dụng
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              {appliedCoupon ? (
                <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                  <h4 className="total">Giảm giá</h4>
                  <h5 className="mb-0 total-price">
                    {appliedCoupon.name} (-{appliedCoupon.discount}%) : -
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(amountDiscount)}
                  </h5>
                </div>
              ) : (
                ""
              )}
              <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                <h4 className="total">Tổng tiền</h4>
                <h5 className="total-price">
                  {appliedCoupon ? (
                    <>
                      {totalAmount > 1000000
                        ? Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(totalAmount - amountDiscount)
                        : Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(totalAmount - amountDiscount + 50000)}
                    </>
                  ) : (
                    <>
                      {totalAmount > 1000000
                        ? Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(totalAmount)
                        : Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(totalAmount + 50000)}
                    </>
                  )}
                </h5>
              </div>
            </div>
          </div>
        )} */}
      </Container>
    </>
  );
};

export default Checkout;
