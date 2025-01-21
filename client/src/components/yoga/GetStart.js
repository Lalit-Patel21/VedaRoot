import { useParams } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Api from "../../apis/Api";

export default function GetStart() {
  const params = useParams();
  const [yoga, setYoga] = useState({});
  useEffect(() => {
    getYogaById();
  }, []);

  const getYogaById = async () => {
    try {
      let response = await axios.get(Api.YOGA_BY_ID + `/${params.id}`);
      // console.log("we are in get start");
      // console.log(Api.YOGA_BY_ID + `/${params.id}`);
      console.log(response.data);
      setYoga(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Header />

      <div className="container mt-5 mb-5">
        <div className="row d-flex justify-content-between">
          <div
            className="col-md-6 d-flex flex-column"
            style={{ height: "400px", boxShadow: "10px 10px 10px grey" }}
          >
            <img
              src={yoga.imageUrl}
              style={{ width: "100%", height: "400px" }}
              alt={"yoga.yogaName"}
            />
          </div>
          <div
            className="col-md-6"
            style={{ height: "400px", boxShadow: "10px 10px 10px grey" }}
          >
            <div className="p-3 d-flex flex-column">
              <h3>{yoga.yogaName}</h3>
              <p>
                <b>yoga Name :</b> {yoga.yogaName}
              </p>
              <div>
                <p>
                  <b>benefits:</b>
                  {yoga.benefits}
                </p>
              </div>
              <div>
                <b>instructions:</b>
                {yoga.instructions}
              </div>
              <br />
              {/* <div>
                <b>videoUrl:</b>
                <a href="{yoga.videoUrl}">{yoga.videoUrl}</a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
