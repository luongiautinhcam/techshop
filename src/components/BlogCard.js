import React from "react";
import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src="images/blog-1.jpg" className="img-fluid w-100" alt="blog" />
      </div>
      <div className="blog-content">
        <p className="date">1 Tháng 12, 2022</p>
        <h5 className="title">Nội dung chủ đề</h5>
        <p className="desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
          sapien quis velit feugiat venenatis.
        </p>
        <Link to="/blog/:id" className="button">
          Đọc tiếp
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
