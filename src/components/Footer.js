import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src="images/newsletter.png" alt="newsletter" />
                <h2 className="mb-0 text-white">Đăng ký tin mới</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Địa chỉ mail của bạn"
                  aria-label="Địa chỉ mail của bạn"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Đăng ký
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Liên hệ chúng tôi</h4>
              <div>
                <address className="text-white fs-6">
                  Địa chỉ: 180 Cao Lỗ, Phường 4, <br /> Quận 8, Hồ Chí Minh{" "}
                  <br />
                  Mã bưu điện: 700000
                </address>
                <a
                  href="tel:+84 869632021"
                  className="mt-3 d-block mb-1 text-white"
                >
                  +84 869632021
                </a>
                <a
                  href="mailto:tranthanhvinh.info@gmail.com"
                  className="mt-2 d-block mb-0 text-white"
                >
                  tranthanhvinh.info@gmail.com
                </a>
                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                  <a className="text-white" href="">
                    <BsLinkedin className="fs-4" />
                  </a>
                  <a className="text-white" href="">
                    <BsGithub className="fs-4" />
                  </a>
                  <a className="text-white" href="">
                    <BsYoutube className="fs-4" />
                  </a>
                  <a className="text-white" href="">
                    <BsInstagram className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Thông tin</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">Chính sách bảo mật</Link>
                <Link className="text-white py-2 mb-1">
                  Chính sách hoàn tiền
                </Link>
                <Link className="text-white py-2 mb-1">
                  Chính sách vận cuyển
                </Link>
                <Link className="text-white py-2 mb-1">
                  Điều khoản và điều kiện
                </Link>
                <Link className="text-white py-2 mb-1">Blog</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Tài khoản</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">Về chúng tôi</Link>
                <Link className="text-white py-2 mb-1">Faq</Link>
                <Link className="text-white py-2 mb-1">Liên hệ</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Liên kết nhanh</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">Laptop</Link>
                <Link className="text-white py-2 mb-1">Tai nghe</Link>
                <Link className="text-white py-2 mb-1">Đồng hồ</Link>
                <Link className="text-white py-2 mb-1">Máy tính bảng</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}; Powered by Tech Shop
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
