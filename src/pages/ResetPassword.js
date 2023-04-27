import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import Meta from "../components/Meta";
import CustomInput from "../components/CustomInput";

const ResetPassword = () => {
  return (
    <>
      <Meta title={"Đặt lại mật khẩu"} />
      <BreadCrumb title="Đặt lại mật khẩu" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Đặt lại mật khẩu</h3>
              <form action="" className="d-flex flex-column gap-15">
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                />
                <CustomInput
                  type="password"
                  name="confirmpassword"
                  placeholder="Nhập lại mật khẩu"
                />
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Xác nhận
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ResetPassword;
