import { useParams } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Api from "../../apis/Api";

export default function DiseaseDetails() {
  const params = useParams();
  const [disease, setDisease] = useState({});
  const [yoga, setYoga] = useState({});
  const [remedy, setRemedy] = useState({});
  const [product, setProduct] = useState({});

  useEffect(() => {
    getDiseaseById();
    getYogaById();
    getRemedyById();
    getProductById();
  }, []);

  const getDiseaseById = async () => {
    try {
      let response = await axios.get(Api.DISEASE_BY_ID + `/${params.id}`);
      //   console.log(Api.DISEASE_BY_ID + `/${params.id}`);
      console.log(response.data);
      setDisease(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getYogaById = async () => {
    try {
      let response = await axios.get(Api.Yoga_BY_CATEGORY_ID + `/${params.id}`);
      console.log(response.data);
      setYoga(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getRemedyById = async () => {
    try {
      let response = await axios.get(
        Api.Remedy_BY_CATEGORY_ID + `/${params.id}`
      );
      console.log(response.data);
      setRemedy(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getProductById = async () => {
    try {
      let response = await axios.get(
        Api.Product_BY_CATEGORY_ID + `/${params.id}`
      );
      console.log(response.data);
      setProduct(response.data);
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
            style={{ height: "600px", boxShadow: "10px 10px 10px grey" }}
          >
            <img
              src={disease.imageUrl}
              style={{ width: "100%", height: "500px" }}
              alt={"disease.yogaName"}
            />
          </div>
          <div
            className="col-md-6"
            style={{ height: "600px", boxShadow: "10px 10px 10px grey" }}
          >
            <div className="p-3 d-flex flex-column">
              <h3>{disease.categoryName}</h3>
              <p>
                <b>disease Name :</b> {disease.categoryName}
              </p>
              <div>
                <p>
                  <b>Causes:</b>
                  {disease.Causes}
                </p>
              </div>
              <div>
                <b>Precaution:</b>
                {disease.Precaution}
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
