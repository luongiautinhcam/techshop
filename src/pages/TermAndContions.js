import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import Meta from "../components/Meta";

const TermAndContions = () => {
  return (
    <>
      <Meta title={"Điều khoản và điều kiện"} />
      <BreadCrumb title="Điều khoản và điều kiện" />
      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy"></div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TermAndContions;
