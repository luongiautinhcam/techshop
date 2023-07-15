import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import * as yup from "yup";
import { updateProfile } from "../features/user/userSlice";
import { FiEdit } from "react-icons/fi";

let schema = yup.object().shape({
  firstname: yup.string().required("Họ không được để trống"),
  lastname: yup.string().required("Tên không được để trống"),
  email: yup.string().required("Địa chỉ email không được để trống"),
  mobile: yup.string().required("Số điện thoại không được để trống"),
  address: yup.string().required("Địa chỉ không được để trống"),
  state: yup.string().required("Quận/ Huyện không được để trống"),
  city: yup.string().required("Thành phố không được để trống"),
  zipcode: yup.string().required("Mã bưu điện không được để trống"),
});
const Profile = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth.user);
  const { firstname, lastname, email, mobile, address, state, city, zipcode } =
    authState;
  const [edit, setEdit] = useState(true);

  //lay danh sach 63 tinh
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/luongiautinhcam/techshop/main/src/data/city.json"
        );
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchData();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: firstname || "",
      lastname: lastname || "",
      email: email || "",
      mobile: mobile || "",
      address: address || "",
      state: state || "",
      city: city || "",
      zipcode: zipcode || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      dispatch(updateProfile(values));
      setEdit(true);
    },
  });
  return (
    <>
      <BreadCrumb title="Trang cá nhân" />
      <Container className1="cart-wrapper home-wrapper-2 py-5">
        <div className="row mb-3">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="my-3">Thông tin tài khoản</h3>
              <FiEdit className="fs-3" onClick={() => setEdit(false)} />
            </div>
          </div>
          <div className="col-12">
            <form action="" className="row g-3" onSubmit={formik.handleSubmit}>
              <div className="col-md-6">
                <label className="form-label">Họ</label>
                <input
                  name="firstname"
                  disabled={edit}
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                  value={formik.values.firstname}
                />
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Tên</label>
                <input
                  name="lastname"
                  disabled={edit}
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                  value={formik.values.lastname}
                />
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
              </div>
              <div className="col-12">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  disabled={edit}
                  type="email"
                  className="form-control"
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>
              <div className="col-12">
                <label className="form-label">Số điện thoại</label>
                <input
                  name="mobile"
                  disabled={edit}
                  type="number"
                  className="form-control"
                  placeholder="0987654321"
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                  value={formik.values.mobile}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
              </div>
              <div className="col-12">
                <label className="form-label">Địa chỉ</label>
                <input
                  name="address"
                  disabled={edit}
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange("address")}
                  onBlur={formik.handleBlur("address")}
                  value={formik.values.address}
                />
                <div className="error">
                  {formik.touched.address && formik.errors.address}
                </div>
              </div>
              <div className="col-md-4">
                <label className="form-label">Quận/ Huyện</label>
                <input
                  name="state"
                  disabled={edit}
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange("state")}
                  onBlur={formik.handleBlur("state")}
                  value={formik.values.state}
                />
                <div className="error">
                  {formik.touched.state && formik.errors.state}
                </div>
              </div>
              <div className="col-md-4">
                <label className="form-label">Thành phố/ Tỉnh</label>
                <select
                  name="city"
                  disabled={edit}
                  onChange={formik.handleChange("city")}
                  onBlur={formik.handleBlur("city")}
                  value={formik.values.city}
                  className="form-control form-select"
                  id=""
                >
                  <option value="">Chọn thành phố</option>
                  {cities?.map((i, j) => {
                    return (
                      <option key={j} value={i.name}>
                        {i.name}
                      </option>
                    );
                  })}
                </select>
                {/* <input
                  name="city"
                  disabled={edit}
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange("city")}
                  onBlur={formik.handleBlur("city")}
                  value={formik.values.city}
                /> */}
                <div className="error">
                  {formik.touched.city && formik.errors.city}
                </div>
              </div>
              <div className="col-md-4">
                <label className="form-label">Mã bưu điện</label>
                <input
                  name="zipcode"
                  disabled={edit}
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange("zipcode")}
                  onBlur={formik.handleBlur("zipcode")}
                  value={formik.values.zipcode}
                />
                <div className="error">
                  {formik.touched.zipcode && formik.errors.zipcode}
                </div>
              </div>
              <div className="col-12">
                {edit === false && (
                  <button type="submit" className="btn btn-primary">
                    Lưu
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
