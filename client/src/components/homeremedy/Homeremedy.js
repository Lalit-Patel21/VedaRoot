import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../apis/Api";
import "./Homeremedy.css"; // Assuming you saved the CSS as Homeremedy.css
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
      <div className="container mt-2">
        <h1 className="heading text-center mb-2">Home Remedy</h1>
        <div className="card-container">
          {homeremedyList.map((homeremedy, index) => (
            <div key={index} className="card">
              <img
                src={homeremedy.imageUrl}
                alt={homeremedy.remedyName}
                className="img-fluid"
              />
              <div className="text-center card-title">
                <p>{homeremedy.remedyName.slice(0, 30)}</p>
              </div>
              <div className="card-description">
                {homeremedy.description.slice(0, 100)}
              </div>
              <div className="btn-container text-center ">
                <button
                  onClick={() => navigateToViewMoreHR(homeremedy._id)}
                  className="btn btn-secondary text-white bg-success"
                >
                  View more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Homeremedy;
