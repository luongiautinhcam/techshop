import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  addOrder,
  deleteCartProduct,
  resetState,
} from "../features/user/userSlice";
import { toast } from "react-toastify";
import { getAllProducts } from "../features/products/productSlice";

const shippingSchema = yup.object({
  firstName: yup.string().required("Họ không được để trống"),
  lastName: yup.string().required("Tên không được để trống"),
  mobile: yup.number().required("Số điện thoại không được để trống"),
  address: yup.string().required("Địa chỉ không được để trống"),
  state: yup.string().required("Quận không được để trống"),
  city: yup.string().required("Thành phố không được để trống"),
  zipcode: yup.string().required("Mã bưu điện không được để trống"),
});

const Checkout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.auth.cartProducts);
  const userState = useSelector((state) => state.auth.user);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfoUser, setShippingInfoUser] = useState(null);
  const [cartProductState, setCartProductState] = useState([]);

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

  //tinh tong
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotalAmount(sum);
    }
  }, [cartState]);

  //lay danh sach san pham trong gio hang
  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState[index].productId._id,
        color: cartState[index].color._id,
        quantity: cartState[index].quantity,
        price: cartState[index].price,
      });
    }
    setCartProductState(items);
  }, []);

  const hanldeSaveInfoUser = () => {
    const totalAmountAfterShipping = totalAmount + 50000;
    setTimeout(() => {
      dispatch(
        addOrder({
          totalPrice: totalAmount,
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
  };
  console.log(userState);

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
      firstName: userState.firstname || "",
      lastName: userState.lastname || "",
      mobile: userState.mobile || "",
      address: userState.address || "",
      other: "",
      state: userState.state || "",
      city: userState.city || "",
      zipcode: userState.zipcode || "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      const totalAmountAfterShipping = totalAmount + 50000;
      setTimeout(() => {
        dispatch(
          addOrder({
            totalPrice: totalAmount,
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
    },
  });

  useEffect(() => {
    if (formik.values.firstName || formik.values.lastName) {
      setShippingInfoUser({
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        mobile: formik.values.mobile,
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
    formik.values.address,
    formik.values.other,
    formik.values.state,
    formik.values.city,
    formik.values.zipcode,
  ]);
  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
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
                <h4 className="mb-3">Địa chỉ giao hàng</h4>
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
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Trở về giỏ hàng
                    </Link>
                    <Link to="/product" className="button">
                      Tiếp tục mua sắm
                    </Link>
                    <button className="button" type="submit">
                      Thanh toán
                    </button>
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
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(50000)}
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-4">
              <h4 className="total">Mã giảm giá</h4>
              {/* <h5 className="total-price">
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalAmount ? totalAmount + 50000 : "0")}
              </h5> */}
              <input
                name="discount"
                type="text"
                placeholder="Nhập mã giảm giá"
                className="form-control w-50"
                onChange={formik.handleChange("discount")}
                onBlur={formik.handleBlur("discount")}
                values={formik.values.discount}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-4">
              <h4 className="total">Tổng tiền</h4>
              <h5 className="total-price">
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalAmount ? totalAmount + 50000 : "0")}
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
