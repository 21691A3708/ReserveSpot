import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Display from "./ProjectListDisplay";
import Send from "../home/send";
import Map from "../home/map";
import Footer from "../home/footer";
import Nav from "../home/bottemnav";

export default function Mproject() {
  const [homeData, setHomeData] = useState(null);
  const [des2, setdes2] = useState({});
  const [des3, setdes3] = useState({});
  const [des4, setdes4] = useState({});
  useEffect(() => {
    axios
      .get("/api/home/home") // correct endpoint
      .then((res) => setHomeData(res.data))
      .catch((err) => console.error("Error fetching home data:", err));
  }, []);

  useEffect(() => {
    if (homeData) {
      const newItems2 = {
        mobile: homeData.mobile,
        email: homeData.email,
      };
      setdes2(newItems2);
      const newItems3 = {
        mapLink: homeData.mapLink,
      };
      setdes3(newItems3);
      const newItems4 = {
        mobile: homeData.mobile,
        email: homeData.email,
        address: homeData.address,
        facebook: homeData.facebook,
        instagram: homeData.instagram,
        twitter: homeData.twitter,
      };
      setdes4(newItems4);
    }
  }, [homeData]);

  if (!homeData) return <div></div>;
  console.log(homeData);
  return (
    <>
      <div className="div">
        <Header />
      </div>
      <div className="">
        <Display />
      </div>

      <div>
        <Send data={des2} />
      </div>
      <div>
        <Map data={des3} />
      </div>
      <div>
        <Nav data={des4} />
      </div>
      <div>
        <Footer></Footer>
      </div>
    </>
  );
}
