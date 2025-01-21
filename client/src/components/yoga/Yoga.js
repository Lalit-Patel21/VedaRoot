import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../apis/Api";
import "./Yoga.css"; // Assuming you saved the CSS as Yoga.css
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
      <div className="container mt-2">
        <h1 className="heading">Yoga</h1> {/* Updated heading */}
        <div className="card-container">
          {yogaList.map((yoga, index) => (
            <div key={index} className="card">
              <img
                src={yoga.imageUrl}
                alt={yoga.yogaName.slice(0, 30)}
                className="img-fluid"
              />
              <div className="card-title">
                <p>{yoga.yogaName}</p>
              </div>
              <div className="card-description">
                {yoga.benefits.slice(0, 100)}
              </div>
              <div className="btn-container">
                <button
                  onClick={() => navigateToGetStart(yoga._id)}
                  className="btn btn-primary text-white "
                >
                  Get Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Yoga;
