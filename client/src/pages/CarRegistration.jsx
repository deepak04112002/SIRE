import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "../styles/CarRegistration.css";
import axios from "axios";

const CarRegistration = () => {
  const navigate = useNavigate();
  // const URL = "http://localhost:5005";
  const [carInfo, setCarInfo] = useState({
    fullName: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: "",
    email: "",
    carName: "",
    model: "",
    description: "",
    automatic: "",
    year: "",
    color: "",
    licensePlate: "",
    imageUrl: "",
    price: "",
  });

  let name, value;
  // COde to store data into the carinfo
  const handleChange = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setCarInfo({ ...carInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // if (carInfo.imageFile) {
      //   const imageBase64 = await convertImageToBase64(carInfo.imageFile);
      //   carInfo.imageBase64 = imageBase64.split(",")[1];
      // }

      // const response = await axios.post(`${URL}/registercar`, carInfo);
      const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));

      // let data = JSON.stringify({
      //   fullName: "priyanshu",
      //   city: "New York",
      //   state: "NY",
      //   postalCode: "10001",
      //   phoneNumber: "1234567890",
      //   email: "priyanshupanda.ctp@gmail.com",
      //   model: "Sedan",
      //   year: 2022,
      //   color: "Silver",
      //   licensePlate: "ABCD123",
      //   imageBase64: "base64encodedimagestring",
      // });

      let data = JSON.stringify(carInfo);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://car-booking-five.vercel.app/api/car/registercar",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: data,
      };

      const res = await axios.request(config);

      if (res.status === 200) {
        window.alert("Registration successful");
        console.log("Registration successful");
        navigate("/home");
      } else {
        window.alert("Registration failed");
        console.log("Registration failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleImageChange = (e) => {
  //   setCarInfo({ ...carInfo, imageFile: e.target.files[0] });
  // };
  // const convertImageToBase64 = (imageFile) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       resolve(reader.result);
  //     };
  //     reader.onerror = (error) => {
  //       reject(error);
  //     };
  //     reader.readAsDataURL(imageFile);
  //   });
  // };

  return (
    <>
      <div className="pt-10">
        <div className="row mt-10">
          <div className="col bg-white wrapper">
            <h2 className="text-center pt-3 ">Vehicle Registration</h2>
            <p className="text-center text-muted lead mb-3">
              It's Free and Takes a Minute
            </p>
            <form method="POST">
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-user"></i>
                </span>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  placeholder="Full Name"
                  value={carInfo.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-user"></i>
                </span>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  placeholder="Date Of Birth"
                  value={carInfo.dob}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-envelope"></i>
                </span>
                <input
                  type="Address"
                  name="address"
                  className="form-control"
                  placeholder="Address"
                  value={carInfo.address}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder="City"
                  value={carInfo.city}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="text"
                  name="state"
                  className="form-control"
                  placeholder="State"
                  value={carInfo.state}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="number"
                  name="postalCode"
                  className="form-control"
                  placeholder="Postal Code"
                  value={carInfo.postalCode}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="number"
                  name="phoneNumber"
                  className="form-control"
                  placeholder="Phone Number"
                  value={carInfo.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={carInfo.email}
                  onChange={handleChange}
                />
              </div>
              <h2 className="text-center pt-3 ">Vehicle Information</h2>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="text"
                  name="carName"
                  className="form-control"
                  placeholder="Car Name"
                  value={carInfo.carName}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="text"
                  name="model"
                  className="form-control"
                  placeholder="Model"
                  value={carInfo.model}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Description"
                  value={carInfo.description}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="text"
                  name="automatic"
                  className="form-control"
                  placeholder="Automatic / Non- Automatic"
                  value={carInfo.automatic}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="number"
                  name="year"
                  className="form-control"
                  placeholder="Year"
                  value={carInfo.year}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="text"
                  name="color"
                  className="form-control"
                  placeholder="Color"
                  value={carInfo.color}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="text"
                  name="licensePlate"
                  className="form-control"
                  placeholder="License Plate Number"
                  value={carInfo.licensePlate}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="number"
                  name="mileage"
                  className="form-control"
                  placeholder="Mileage"
                  value={carInfo.mileage}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="text"
                  name="imageUrl"
                  className="form-control"
                  placeholder="Image link"
                  value={carInfo.imageUrl}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="text"
                  name="price"
                  className="form-control"
                  placeholder="Price per Hour"
                  value={carInfo.price}
                  onChange={handleChange}
                />
              </div>

              {/* <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  className="form-control"
                  placeholder="Photo"
                  onChange={handleImageChange}
                />
              </div> */}
              <h3 className="text-center pt-3">Declaration</h3>
              <p className="text-center text-muted mt-2">
                I hereby certify that the above information is true and accurate
                to the best of my knowledge.
                <br />I understand that providing false information may result
                in penalties or legal action.
              </p>
              <div className="d-grid">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSubmit}
                >
                  Registercar Now
                </button>
                <p className="text-center text-muted mt-2">
                  When You Register By Clicking SignUp Button, You Agree to Our
                  <a href="#"> Term and Conditions</a>and{" "}
                  <a href="#">Privacy Policy</a>
                </p>
                <p className="text-center">
                  Already Have An Account ? <a href="/login">Login here</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarRegistration;
