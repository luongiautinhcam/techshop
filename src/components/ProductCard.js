import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/tab.jpg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

const ProductCard = (props) => {
  const { grid, data } = props;

  const brandState = useSelector((state) => state.brand.brands);

  const dispatch = useDispatch();
  let location = useLocation();
  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };
  return (
    <>
      {data &&
        data?.map((item, index) => {
          return (
            <div
              key={index}
              className={` ${
                location.pathname == "/product" ? `gr-${grid}` : "col-3"
              }`}
            >
              <div className="product-card position-relative">
                <div className="wishlist-icon position-absolute">
                  <button className="border-0 bg-transparent">
                    <img
                      onClick={() => addToWish(item?._id)}
                      src={wish}
                      alt="wishlist"
                    />
                  </button>
                </div>
                <div className="product-image">
                  <img
                    src={item?.images[0]?.url}
                    className="img-fluid mx-auto"
                    alt="product"
                  />
                  <img
                    src={item?.images[1]?.url}
                    className="img-fluid mx-auto"
                    alt="product"
                  />
                </div>
                <div className="product-details">
                  <h6 className="brand">
                    {brandState?.map((items, index) => {
                      if (items._id == item?.brand) {
                        return items.title;
                      }
                    })}
                  </h6>
                  <h5 className="product-title">{item?.title}</h5>
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={parseInt(item?.totalrating, 10)}
                      readOnly
                    />
                  </Box>
                  {/* <ReactStars
                    count={5}
                    size={24}
                    value={item?.totalrating.toString()}
                    edit={false}
                    activeColor="#ffd700"
                  /> */}
                  <p
                    className={`description ${
                      grid === 12 ? "d-block" : "d-none"
                    }`}
                    dangerouslySetInnerHTML={{ __html: item?.decscription }}
                  ></p>
                  <p className="price">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item?.price)}
                  </p>
                </div>
                <div className="action-bar position-absolute">
                  <div className="d-flex flex-column gap-15">
                    <button className="border-0 bg-transparent">
                      <img src={prodcompare} alt="compare" />
                    </button>
                    <Link
                      to={"/product/" + item?._id}
                      className="border-0 bg-transparent"
                    >
                      <img src={view} alt="view" />
                    </Link>
                    <button className="border-0 bg-transparent">
                      <img src={addcart} alt="addcart" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ProductCard;
