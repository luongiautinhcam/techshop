import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { getOrders } from "../features/user/userSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state?.auth?.getOrdered?.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <>
      <BreadCrumb title="Đơn hàng của tôi" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        {/* <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-3">
                <h5>Mã đơn hàng</h5>
              </div>
              <div className="col-3">
                <h5>Tổng tiền</h5>
              </div>
              <div className="col-3">
                <h5>Tổng tiền sau khi giảm giá</h5>
              </div>
              <div className="col-3">
                <h5>Trạng thái</h5>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3">
            {orderState &&
              orderState?.map((item, index) => {
                return (
                  <div key={index} className="row">
                    <div className="col-3">
                      <p>Mã đơn hàng</p>
                    </div>
                    <div className="col-3">
                      <p>Tổng tiền</p>
                    </div>
                    <div className="col-3">
                      <p>Tổng tiền sau khi giảm giá</p>
                    </div>
                    <div className="col-3">
                      <p>Trạng thái</p>
                    </div>
                    <div className="col-12">
                      <div className="row bg-secondary p-3">
                        <div className="col-3">
                          <p>Mã đơn hàng</p>
                        </div>
                        <div className="col-3">
                          <p>Tổng tiền</p>
                        </div>
                        <div className="col-3">
                          <p>Tổng tiền sau khi giảm giá</p>
                        </div>
                        <div className="col-3">
                          <p>Trạng thái</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div> */}
        <div className="row">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="my-3">Danh sách đơn hàng</h3>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Mã đơn hàng</th>
                <th scope="col">Tổng tiền</th>
                <th scope="col">Tổng tiền sau giảm giá</th>
                <th scope="col">Trang thái</th>
              </tr>
            </thead>
            <tbody>
              {orderState &&
                orderState?.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className="" style={{ backgroundColor: "#febd69" }}>
                        <th scope="row">{item?._id}</th>
                        <td>
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item?.totalPrice)}
                        </td>
                        <td>
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item?.totalPriceAfterDiscount)}
                        </td>
                        <td>{item?.orderStatus}</td>
                      </tr>
                      <tr>
                        <td colSpan={4}>
                          <div
                            className="accordion accordion-flush"
                            id="accordionFlushExample"
                          >
                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#flush-collapse${index}`}
                                  aria-expanded="false"
                                  aria-controls={`flush-collapse${index}`}
                                >
                                  Sản phẩm
                                </button>
                              </h2>
                              <div
                                id={`flush-collapse${index}`}
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample"
                              >
                                <div className="accordion-body">
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th scope="col">Tên sản phẩm</th>
                                        <th scope="col">Màu sắc</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Đơn giá</th>
                                        <th scope="col">Số tiền</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {item?.orderItems?.map((i, id) => {
                                        return (
                                          <tr key={id}>
                                            <td>{i?.product.title}</td>
                                            <td>{i?.color.title}</td>
                                            <td>{i?.quantity}</td>
                                            <td>
                                              {Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                              }).format(i?.price)}
                                            </td>
                                            <td>
                                              {Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                              }).format(i?.price * i?.quantity)}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                    //    <tr>

                    //   </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
};

export default Orders;
