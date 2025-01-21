import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../apis/Api";
import "./Yoga.css"; // Ensure this is the updated CSS file
import Header from "../header/Header";
import Footer from "../footer/Footer";

function Yoga() {
  const [yogaList, setYogaList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadYogas();
  }, []);

  const loadYogas = async () => {
    try {
      let response = await axios.get(Api.LOAD_YOGA);
      console.log(response);
      console.log(response.data);
      setYogaList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const navigateToGetStart = (id) => {
    navigate(`get-start/${id}`);
  };

  return (
    <>
      <Header />
      <div className="container mt-2">
        <h1 className="heading text-center mt-2 mb-2">Yoga</h1>
        <div className="row">
          {yogaList.map((yoga, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={yoga.imageUrl}
                  alt={yoga.yogaName.slice(0, 30)}
                  className="img-fluid"
                />
                <div className="card-title text-center">
                  <p>{yoga.yogaName}</p>
                </div>
                <div className="card-description text-center">
                  {yoga.benefits.slice(0, 100)}
                </div>
                <div className="btn-container">
                  <button
                    onClick={() => navigateToGetStart(yoga._id)}
                    className="btn btn-primary text-white"
                  >
                    Get Start
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Yoga;
