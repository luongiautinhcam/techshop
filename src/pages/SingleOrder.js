import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { BiArrowBack } from "react-icons/bi";
import { getAllProducts } from "../features/products/productSlice";
import { getUserAOrder } from "../features/user/userSlice";

const SingleOrder = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getOrderId = location.pathname.split("/")[2];

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getUserAOrder(getOrderId));
  }, [getOrderId]);

  const orderState = useSelector((state) => state.auth);
  const {
    orderFirstName,
    orderLastName,
    orderMobile,
    orderAddress,
    orderAddressState,
    orderCity,
    orderZipcode,
    orderOther,
    orderStatus,
    orderTotalPriceAfterDiscount,
    orderCreatedAt,
    orderProdDetail,
  } = orderState;

  //doi ngay
  const dateString = orderCreatedAt;
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  const formattedDate = `${day}/${month}/${year}`;

  const goBack = () => {
    navigate(-1);
  };

  const [totalAmount, setTotalAmount] = useState(null);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < orderProdDetail?.length; index++) {
      sum =
        sum +
        Number(orderProdDetail[index].quantity) * orderProdDetail[index].price;
      setTotalAmount(sum);
    }
  }, [orderProdDetail]);
  return (
    <>
      <BreadCrumb title="Chi tiết đơn hàng" />
      <Container className1="cart-wrapper home-wrapper-2 py-5">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mb-4 title">Xem chi tiết đơn hàng</h3>
          <button
            className="bg-white border-0 fs-6 mb-0 d-flex align-items-center gap-1"
            onClick={goBack}
          >
            <BiArrowBack className="fs-5" /> Trở về
          </button>
        </div>
        <div className="container-fluid">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center py-3">
              <h2 className="h5 mb-0">
                <Link to="#" className="text-muted"></Link> Order #{getOrderId}
              </h2>
            </div>

            <div className="row">
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="mb-3 d-flex justify-content-between">
                      <div>
                        <span className="me-3">{formattedDate}</span>
                        <span className="me-3">#16123222</span>
                        <span className="me-3">COD</span>
                        <span className="badge rounded-pill bg-info">
                          {orderStatus}
                        </span>
                      </div>
                      <div className="d-flex">
                        <button className="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text">
                          <i className="bi bi-download"></i>
                          <span className="text">Hoá đơn</span>
                        </button>
                        <div className="dropdown">
                          <button
                            className="btn btn-link p-0 text-muted"
                            type="button"
                            data-bs-toggle="dropdown"
                          >
                            <i className="bi bi-three-dots-vertical"></i>
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                              <Link to="#" className="dropdown-item">
                                <i className="bi bi-pencil"></i> Edit
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item">
                                <i className="bi bi-printer"></i> Print
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <table className="table table-borderless">
                      <tbody>
                        {orderProdDetail?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <div className="d-flex mb-2">
                                  <div className="flex-shrink-0">
                                    <img
                                      src={`${item?.product.images[0].url}`}
                                      alt=""
                                      width="80"
                                      className="img-fluid"
                                    />
                                  </div>
                                  <div className="flex-lg-grow-1 ms-3">
                                    <h6 className="small mb-0">
                                      <Link to="#" className="text-reset">
                                        {item?.product.title}
                                      </Link>
                                    </h6>
                                    <span className="small">
                                      Màu sắc: {item?.color.title}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td>Số lượng: {item?.quantity}</td>
                              <td className="text-end">
                                {Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(item?.product.price)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="2">Tổng tiền</td>
                          <td className="text-end">
                            {Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(totalAmount)}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">Phí vận chuyển</td>
                          <td className="text-end">50.000đ</td>
                        </tr>
                        {/* <tr>
                          <td colSpan="2">Discount (Code: NEWYEAR)</td>
                          <td className="text-danger text-end">-$10.00</td>
                        </tr> */}
                        <tr className="fw-bold">
                          <td colSpan="2">Thành tiền</td>
                          <td className="text-end">
                            {Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(orderTotalPriceAfterDiscount)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-6">
                        <h3 className="h6">Phương thức thanh toán</h3>
                        <p>
                          COD <br />
                          Tổng cộng:
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(orderTotalPriceAfterDiscount)}
                          <span className="badge bg-info rounded-pill d-flex w-50">
                            {orderStatus}
                          </span>
                        </p>
                      </div>
                      <div className="col-lg-6">
                        <h3 className="h6">Địa chỉ thanh toán</h3>
                        <address>
                          <strong>
                            {orderFirstName + " " + orderLastName}
                          </strong>
                          <br />
                          {orderAddress}
                          <br />
                          {orderAddressState}, {orderCity} {orderZipcode}
                          <br />0{orderMobile}
                        </address>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="h6">Lưu ý từ khách hàng</h3>
                    <p>{orderOther}</p>
                  </div>
                </div>
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="h6">Thông tin giao hàng</h3>
                    <strong>GHN </strong>
                    <span>
                      <Link
                        to="#"
                        className="text-decoration-underline"
                        target="_blank"
                      >
                        FF1234567890
                      </Link>
                      <i className="bi bi-box-arrow-up-right"></i>
                    </span>
                    <hr />
                    <h3 className="h6">Địa chỉ giao hàng</h3>
                    <address>
                      <strong>{orderFirstName + " " + orderLastName}</strong>
                      <br />
                      {orderAddress}
                      <br />
                      {orderAddressState}, {orderCity} {orderZipcode}
                      <br />0{orderMobile}
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleOrder;
