import { useParams } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Api from "../../apis/Api";
import { FaYoutube } from "react-icons/fa";

export default function GetStart() {
  const params = useParams();
  const [yoga, setYoga] = useState({});
  useEffect(() => {
    getYogaById();
  }, []);

  const getYogaById = async () => {
    try {
      let response = await axios.get(Api.YOGA_BY_ID + `/${params.id}`);
      console.log(response.data);
      setYoga(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageClick = () => {
    window.open(yoga.videoUrl, "_blank");
  };

  return (
    <>
      <Header />

      <div className="container mt-5 mb-5">
        <div className="row d-flex justify-content-between">
          <div
            className="col-md-6 d-flex flex-column position-relative"
            style={{ boxShadow: "10px 10px 10px grey", cursor: "pointer" }}
            onClick={handleImageClick}
          >
            <img
              src={yoga.imageUrl}
              style={{ width: "100%", objectFit: "cover" }}
              alt={yoga.yogaName}
            />
            <FaYoutube
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "3rem",
                color: "red",
                cursor: "pointer",
              }}
              onClick={handleImageClick}
            />
          </div>
          <div
            className="col-md-6"
            style={{ boxShadow: "10px 10px 10px grey" }}
          >
            <div className="p-3 d-flex flex-column">
              <h3>{yoga.yogaName}</h3>
              <p>
                <b>Yoga Name:</b> {yoga.yogaName}
              </p>
              <div>
                <p>
                  <b>Benefits:</b> {yoga.benefits}
                </p>
              </div>
              <div>
                <b>Instructions:</b> {yoga.instructions}
              </div>
              <br />
              <div>
                <b>Video URL:</b>
                <a
                  href={yoga.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {yoga.videoUrl}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
