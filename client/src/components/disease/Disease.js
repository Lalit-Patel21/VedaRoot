import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../apis/Api";
import "./Disease.css"; // Ensure this is the updated CSS file
import Header from "../header/Header";
import Footer from "../footer/Footer";

function Disease() {
  const [diseaseList, setDiseaseList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadDiseases();
  }, []);

  const loadDiseases = async () => {
    try {
      let response = await axios.get(Api.LOAD_DISEASE);
      console.log(response);
      console.log(response.data);
      setDiseaseList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const navigateToDiseaseDetails = (id) => {
    navigate(`/diseasedetails/${id}`);
  };

  return (
    <>
      <Header />

      {/* for Disease information */}
      <div className="container mt-2">
        <h1 className="heading text-center mt-2 mb-2">Diseases</h1>
        <div className="row">
          {diseaseList.map((disease, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div
                className="card h-100 clickable-card"
                onClick={() => navigateToDiseaseDetails(disease._id)}
                style={{
                  backgroundImage: `url(${disease.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "white",
                }}
              >
                <div className="card-body d-flex align-items-center justify-content-center">
                  <h5 className="card-title text-center bg-dark opacity-75 p-2 rounded">
                    {disease.categoryName}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* homeremedy for the  Disease information */}
      {/* yoga for the  Disease information */}
      {/* Product for the  Disease information */}
      <Footer />
    </>
  );
}

export default Disease;
