import React from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";

const Home = () => {
  return (
    <>
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
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
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service.png" alt="services" />
                  <div>
                    <h6>Miễn phí vận chuyển</h6>
                    <p className="mb-0">Cho đơn hàng từ 1 triệu VNĐ</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-02.png" alt="services" />
                  <div>
                    <h6>Ưu đãi hàng ngày</h6>
                    <p className="mb-0">Giảm giá tới 25%</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-03.png" alt="services" />
                  <div>
                    <h6>Hỗ trợ 24/7</h6>
                    <p className="mb-0">Đội ngũ chuyên gia</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-04.png" alt="services" />
                  <div>
                    <h6>Giá cả phải chăng</h6>
                    <p className="mb-0">Giá trực tiếp tại nhà máy</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-05.png" alt="services" />
                  <div>
                    <h6>Bảo mật thanh toán</h6>
                    <p className="mb-0">Thanh toán được bảo vệ 100%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
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
        </div>
      </section>
      <section className="featured-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Sản phẩm nổi bật</h3>
            </div>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>
      <section className="famous-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="famous-card bg-dark">
                
              <h5>Màn hình lớn</h5>
              <h6>Smart Watch Series 7</h6>
              <p>Từ 5tr VNĐ hoặc 376k/tháng trong 24 tháng.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="special-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Sản phẩm đặc biệt</h3>
            </div>
          </div>
          <div className="row">
            <SpecialProduct />
            <SpecialProduct />
            <SpecialProduct />
          </div>
        </div>
      </section>
      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Sản phẩm phổ biến</h3>
            </div>
          </div>
          <div className="row">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>
      <section className="marque-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
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
        </div>
      </section>
      <section className="blog-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Blog mới nhất</h3>
            </div>
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
