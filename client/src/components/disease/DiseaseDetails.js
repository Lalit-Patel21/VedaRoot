import { useParams } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Api from "../../apis/Api";
import { Tabs, Tab } from "react-bootstrap"; // Add react-bootstrap for tabs

export default function DiseaseDetails() {
  const params = useParams();
  const [disease, setDisease] = useState({});
  const [yoga, setYoga] = useState([]);
  const [remedy, setRemedy] = useState([]);
  const [product, setProduct] = useState([]);
  const [key, setKey] = useState("yoga"); // State for active tab

  useEffect(() => {
    getDiseaseById();
    getYogaById();
    getRemedyById();
    getProductById();
  }, []);

  const getDiseaseById = async () => {
    try {
      let response = await axios.get(Api.DISEASE_BY_ID + `/${params.id}`);
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
            style={{ boxShadow: "10px 10px 10px grey", cursor: "pointer" }}
          >
            <img
              src={disease.imageUrl}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
              alt={disease.yogaName}
            />
          </div>
          <div
            className="col-md-6"
            style={{ boxShadow: "10px 10px 10px grey" }}
          >
            <div className="p-3 d-flex flex-column">
              <h3>{disease.categoryName}</h3>
              <p>
                <b>Disease Name:</b> {disease.categoryName}
              </p>
              <div>
                <p>
                  <b>Causes:</b> {disease.Causes}
                </p>
              </div>
              <div>
                <b>Precaution:</b> {disease.Precaution}
              </div>
            </div>
          </div>
        </div>

        <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mt-5">
          <Tab eventKey="yoga" title="Yoga">
            <div className="p-3">
              <h3>Yoga Practices</h3>
              <div className="row d-flex justify-content-between">
                {yoga.map((item, index) => (
                  <div
                    key={index}
                    className="col-md-6 d-flex flex-column mb-4"
                    style={{
                      boxShadow: "10px 10px 10px grey",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                      }}
                      alt={item.yogaName}
                    />
                    <div className="p-3 d-flex flex-column">
                      <h5>{item.yogaName}</h5>
                      <p>
                        <b>Benefits:</b> {item.benefits}
                      </p>
                      <p>
                        <b>Instructions:</b> {item.instructions}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Tab>
          <Tab eventKey="remedy" title="Remedy">
            <div className="p-3">
              <h3>Home Remedies</h3>
              <div className="row d-flex justify-content-between">
                {remedy.map((item, index) => (
                  <div
                    key={index}
                    className="col-md-6 d-flex flex-column mb-4"
                    style={{
                      boxShadow: "10px 10px 10px grey",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                      }}
                      alt={item.remedyName}
                    />
                    <div className="p-3 d-flex flex-column">
                      <h5>{item.remedyName}</h5>
                      <p>
                        <b>Ingredients:</b> {item.ingredients}
                      </p>
                      <p>
                        <b>Caution:</b> {item.caution}
                      </p>
                      <p>
                        <b>Description:</b> {item.description}
                      </p>
                      <p>
                        <b>Instructions:</b> {item.instructions}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Tab>
          <Tab eventKey="product" title="Product">
            <div className="p-3">
              <h3>Recommended Products</h3>
              <div className="row d-flex justify-content-between">
                {product.map((item, index) => (
                  <div
                    key={index}
                    className="col-md-6 d-flex flex-column mb-4"
                    style={{
                      boxShadow: "10px 10px 10px grey",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                      }}
                      alt={item.title}
                    />
                    <div className="p-3 d-flex flex-column">
                      <h5>{item.title}</h5>
                      <p>
                        <b>Brand:</b> {item.brand}
                      </p>
                      <p>
                        <b>Description:</b> {item.description}
                      </p>
                      <p>
                        <b>Price:</b> {item.price} Rs.
                      </p>
                      <p>
                        <b>Rating:</b> {item.rating}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
      <Footer />
    </>
  );
}
