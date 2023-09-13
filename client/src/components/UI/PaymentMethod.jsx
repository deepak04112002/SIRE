import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import masterCard from "../../assets/all-images/master-card.jpg";
import paypal from "../../assets/all-images/paypal.jpg";
import "../../styles/payment-method.css";

const PaymentMethod = ({ carId }) => {
  const [reservationStatus, setReservationStatus] = useState("");

  const history = useNavigate();

  const [user, setUser] = useState({});
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleReserveClick = async () => {
    try {
      setLoading(true);
      // const response = await axios.post("/reservecar", { carName });

      console.log("1");

      const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
      const userData = JSON.parse(sessionStorage.getItem("userData"));

      let data = JSON.stringify({
        carId: carId,
        email: userData.email,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://car-booking-five.vercel.app/api/car/reservecar",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: data,
      };

      const res = await axios.request(config);
      if (res.status === 200) {
        // Car reserved successfully
        setReservationStatus("success");
        history("/profile");
      }
    } catch (error) {
      console.error(error);
      setReservationStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    setLoading(true);

    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));

    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url:
          "https://car-booking-five.vercel.app/api/car/user/" + userData?.email,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      axios.request(config);

      const response = await axios.request(config);
      setUser(response.data.user);
      setCars(response.data.cars);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <>
      <div className="payment">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input type="radio" /> Direct Bank Transfer
        </label>
      </div>

      <div className="payment mt-3">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input type="radio" /> Cheque Payment
        </label>
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input type="radio" /> Master Card
        </label>

        <img src={masterCard} alt="" />
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input type="radio" /> Paypal
        </label>

        <img src={paypal} alt="" />
      </div>
      <div className="payment text-end mt-5">
        <button onClick={handleReserveClick}>
          {user?.reservedCars?.includes(carId)
            ? "Already Reserved"
            : "Reserve Now"}
        </button>
      </div>
    </>
  );
};

export default PaymentMethod;
