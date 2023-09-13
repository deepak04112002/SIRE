import React, { useState, useEffect } from "react";
import CarItem from "../UI/CarItem";
import userImage from "../../assets/all-images/cars-img/bmw-offer.png";
import InternalHeader from "./InternalHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const history = useNavigate();
  // const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));

  const [user, setUser] = useState({});
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log({ cars });

  const handleLogOut = async () => {};

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

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      history.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5 mb-5 ">
      <div className="logout-container">
        <button className="btn btn-primary logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <InternalHeader />
      <div className="card shadow rounded">
        <div className="card-body">
          <img
            src={userImage}
            alt="User"
            className="img-fluid rounded-circle mb-3"
          />
          <div className="user-details">
            <h4>{user.name}</h4>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="card-footer container">
          <h3>Cars Rented:</h3>
          <ul className="row">
            {loading ? (
              <p>Loading...</p>
            ) : (
              cars?.map((car, index) => (
                <CarItem item={car} key={car.id} className="col-md-6" />
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
