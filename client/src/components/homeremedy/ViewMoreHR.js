import { useNavigate, useParams } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Api from "../../apis/Api";

export default function ViewMoreHR() {
  const params = useParams();
  const [homeremedy, setHomeremedy] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getHomeremedyById();
  }, []);

  const getHomeremedyById = async () => {
    try {
      let response = await axios.get(Api.Homeremedy_BY_ID + `/${params.id}`);
      console.log("we are in now view morehr");
      console.log(response.data);
      setHomeremedy(response.data);
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
            style={{ boxShadow: "10px 10px 10px grey" }}
          >
            <img
              src={homeremedy.imageUrl}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
              alt={homeremedy.remedyName}
            />
          </div>
          <div
            className="col-md-6"
            style={{ boxShadow: "10px 10px 10px grey" }}
          >
            <div className="p-3 d-flex flex-column">
              <h3>{homeremedy.remedyName}</h3>
              <p>
                <b>HomeRemedy Name:</b> {homeremedy.remedyName}
              </p>
              <p>
                <b>Ingredients:</b> {homeremedy.ingredients}
              </p>
              <p>
                <b>Caution:</b> {homeremedy.caution}
              </p>
              <div>
                <b>Description:</b> {homeremedy.description}
              </div>
              <div className="mt-3">
                <b>Instructions:</b> {homeremedy.instructions}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
