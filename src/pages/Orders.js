import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { getUserOrder } from "../features/user/userSlice";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Mã đơn hàng",
    dataIndex: "id",
  },
  {
    title: "Ngày tạo đơn",
    dataIndex: "date",
  },
  {
    title: "Thành tiền",
    dataIndex: "amount",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrder());
  }, []);

  const orderState = useSelector((state) => state.auth.getOrdered);
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      id: orderState[i]._id,
      date: new Date(orderState[i].createdAt).toLocaleString(),

      amount: Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(orderState[i].totalPriceAfterDiscount),
      // name: orderState[i].user.firstname + " " + orderState[i].user.lastname,
      // product: <Link to={`/admin/`}>Xem đơn hàng</Link>,
      status: orderState[i].orderStatus,
      // <>
      //   <select
      //     name=""
      //     defaultValue={
      //       orderState[i].orderStatus
      //         ? orderState[i].orderStatus
      //         : "Da dat hang"
      //     }
      //     className="form-control form-select"
      //     id=""
      //     onChange={(e) => setOrderStatus(e.target.value, orderState[i]._id)}
      //   >
      //     <option value="Da dat hang">Đã đặt hàng</option>
      //     <option value="Da thanh toan">Đã thanh toán</option>
      //     <option value="Chua xac nhan">Chưa xác nhận</option>
      //     <option value="Da xa nhan">Đã xác nhận</option>
      //     <option value="Cho giao hang">Chờ giao hàng</option>
      //     <option value="Dang giao hang">Đang giao hàng</option>
      //     <option value="Da giao hang">Đã giao hàng</option>
      //     <option value="Da huy">Đã huỷ</option>
      //   </select>
      // </>
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/my-order/${orderState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="fs-3 text-danger ms-3 bg-transparent border-0"
            // onClick={() => showModal(orderState[i]._id)}
          >
            {orderState[i].orderStatus === "Da xac nhan" ? null : <GiCancel />}
          </button>
        </>
      ),
    });
  }
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
        {/* <div className="row">
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
                                            <td>{i?.product?.title}</td>
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
        </div> */}
        <div>
          <h3 className="mb-4 title">Đơn hàng</h3>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
          {/* <CustomModal
            hideModal={hideModal}
            open={open}
            performAction={() => {
              deleteOrder(orderId);
            }}
            title="Bạn có muốn xoá đơn hàng"
          /> */}
        </div>
      </Container>
    </>
  );
};

export default Orders;
