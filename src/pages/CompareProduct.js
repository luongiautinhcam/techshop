import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Color from "../components/Color";
import Meta from "../components/Meta";

const CompareProduct = () => {
  return (
    <>
      <Meta title={"So sánh sản phẩm"} />
      <BreadCrumb title="So sánh sản phẩm" />
      <div className="compare-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="product-card-image">
                  <img src="images/watch.jpg" alt="watch" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">OPPO Reno8 T 5G 256GB</h5>
                  <h6 className="price mb-3 mt-3">10990000</h6>
                  <div>
                    <div className="product-detail">
                      <h5>Hãng:</h5>
                      <p>Oppo</p>
                    </div>
                    <div className="product-detail">
                      <h5>Loại:</h5>
                      <p>Điện thoại</p>
                    </div>
                    <div className="product-detail">
                      <h5>Tình trạng:</h5>
                      <p>Còn hàng</p>
                    </div>
                    <div className="product-detail">
                      <h5>Màu:</h5>
                      <Color />
                    </div>
                    <div className="product-detail">
                      <h5>Kích thước:</h5>
                      <div className="d-flex gap-10">
                        <p>S</p>
                        <p>M</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="product-card-image">
                  <img src="images/watch.jpg" alt="watch" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">OPPO Reno8 T 5G 256GB</h5>
                  <h6 className="price mb-3 mt-3">10990000</h6>
                  <div>
                    <div className="product-detail">
                      <h5>Hãng:</h5>
                      <p>Oppo</p>
                    </div>
                    <div className="product-detail">
                      <h5>Loại:</h5>
                      <p>Điện thoại</p>
                    </div>
                    <div className="product-detail">
                      <h5>Tình trạng:</h5>
                      <p>Còn hàng</p>
                    </div>
                    <div className="product-detail">
                      <h5>Màu:</h5>
                      <Color />
                    </div>
                    <div className="product-detail">
                      <h5>Kích thước:</h5>
                      <div className="d-flex gap-10">
                        <p>S</p>
                        <p>M</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompareProduct;
