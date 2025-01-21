import Header from "../header/Header";
import Footer from "../footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../apis/Api";
import "./Homeremedy.css"; // Ensure this is the updated CSS file

function Homeremedy() {
  const [homeremedyList, setHomeremedyList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadHomeremedy();
  }, []);

  const loadHomeremedy = async () => {
    try {
      let response = await axios.get(Api.LOAD_HOMEREMEDY);
      console.log(response);
      console.log(response.data);
      setHomeremedyList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const navigateToViewMoreHR = (id) => {
    navigate(`view-morehr/${id}`);
  };

  return (
    <>
      <Header />
      <div className="container mt-2">
        <h1 className="heading text-center mb-2">Home Remedy</h1>
        <div className="row">
          {homeremedyList.map((homeremedy, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={homeremedy.imageUrl}
                  alt={homeremedy.remedyName}
                  className="img-fluid"
                />
                <div className="text-center card-title">
                  <p>{homeremedy.remedyName}</p>
                </div>
                <div className="card-description">{homeremedy.description}</div>
                <div className="btn-container text-center">
                  <button
                    onClick={() => navigateToViewMoreHR(homeremedy._id)}
                    className="btn btn-secondary text-white bg-success"
                  >
                    View more
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

export default Homeremedy;
