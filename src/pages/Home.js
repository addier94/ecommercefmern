import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={[t("13Latest Products"), t("14New Arrivals"), t("15Best Sellers")]} />
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
       {t("9New Arrivals")}
      </h4>
      <NewArrivals />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        {t("10Best Sellers")}
      </h4>
      <BestSellers />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        {t("11Categories")}
      </h4>
      <CategoryList />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        {t("12Sub Categories")}
      </h4>
      <SubList />

      <br />
      <br />
    </>
  );
};

export default Home;
