import React from "react";
import "./Slider.css"; // Import your CSS file
export default function Sliderr() {
  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="1000"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="./images/home12.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img
            src="./images/ayurveda-img.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
