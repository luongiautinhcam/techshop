import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import Container from "../components/Container";

const SingleBlog = () => {
  return (
    <>
      <Meta title={"Tên Blog"} />
      <BreadCrumb title="Tên Blog" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to="/blog" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" />
                Trở về Blog
              </Link>
              <h3 className="title">
                Cách tạo bảng kế hoạch trên Canva để quản lí công việc một cách
                dễ dàng hơn
              </h3>
              <img src="images/blog-1.jpg" alt="blog" />
              <p>
                Nếu bạn là một người bận rộn với hàng tá việc phải làm nhưng lại
                không biết cách để quản lí một cách hợp lí và bạn đang tìm kiếm
                một ứng dụng để quản lí các công việc đó của bạn thì với canva
                bạn không cần phải tải bất kì một ứng dụng nặng nề nào về máy mà
                vẫn có thể quản lí trực tuyến các công việc của mình một cách
                hợp lí.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
