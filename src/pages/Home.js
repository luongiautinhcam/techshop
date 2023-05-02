import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { services } from "../utils/Data";
import { getAllBlogs } from "../features/blogs/blogSlice";
import moment from "moment";

const Home = () => {
  const blogState = useSelector((state) => state?.blog?.blog);
  const dispatch = useDispatch();
  useEffect(() => {
    getblogs();
  }, []);
  const getblogs = () => {
    dispatch(getAllBlogs());
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
      <Container class1="home-wrapper-2 py-5">
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
      </Container>
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Sản phẩm nổi bật</h3>
          </div>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
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
            <h3 className="section-heading">Sản phẩm đặc biệt</h3>
          </div>
        </div>
        <div className="row">
          <SpecialProduct />
          <SpecialProduct />
          <SpecialProduct />
          <SpecialProduct />
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
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
