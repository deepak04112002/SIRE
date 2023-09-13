import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import axios from "axios";

const CarItem = (props) => {
  const { imgUrl, model, carName, automatic, speed, price, _id } = props.item;

  const handleRentClick = async () => {
    try {
      const response = await axios.post("/reservecar", { carName });
      if (response.status === 200) {
        // Car reserved successfully
        alert("Car reserved successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={imgUrl} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{carName}</h4>
          <h6 className="rent__price text-center mt-">
            ₹{price}.00 <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-car-line"></i> {model}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-settings-2-line"></i> {automatic}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-timer-flash-line"></i> {speed}
            </span>
          </div>

          <button
            className=" w-50 car__item-btn car__btn-rent"
            onClick={handleRentClick}
          >
            <Link to={`/cars/${_id}`}>Rent</Link>
          </button>

          <button className=" w-50 car__item-btn car__btn-details">
            <Link to={`/cars/${_id}`}>Details</Link>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
