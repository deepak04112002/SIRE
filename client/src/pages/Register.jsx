import React from "react";
import "../styles/Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const history = useNavigate();

  // const URL = "https://car-booking-five.vercel.app/";
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();

    // const { fname, lname, email, password, cpassword } = user;

    try {
      // const response = await axios.post(`${URL}/register`, {
      //   fname,
      //   lname,
      //   email,
      //   password,
      //   cpassword
      // });

      // let data = JSON.stringify({
      //   email: "priyanshupanda.ctp@gmail.com",
      //   fname: "priyanshu",
      //   lname: "priyanshu",
      //   password: "priyanshu",
      //   cpassword: "priyanshu",
      // });

      let data = JSON.stringify(user);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://car-booking-five.vercel.app/api/auth/signup",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      console.log(config);

      console.log("Registration Sucess");

      const response = await axios.request(config);
      console.log(response);
      // console.log(JSON.parse(response.data));

      sessionStorage.setItem("userData", JSON.stringify(response.data.user));
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(response.data.accessToken)
      );

      if (response.status === 200) {
        window.alert("Registration successful");
        console.log("Registration successful");
        history("/login");
      } else {
        window.alert("Registration failed");
        console.log("Registration failed");
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      // window.alert("Registration failed")
    }
  };

  return (
    <>
      <div className="container pt-4">
        <div className="row mt-5">
          <div className="col-lg-4 bg-white m-auto rounded-top wrapper">
            <h2 className="text-center pt-3 ">SignUp Now</h2>
            <p className="text-center text-muted lead mb-3">
              It's Free and Takes a Minute
            </p>
            <div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-user"></i>
                </span>
                <input
                  type="text"
                  name="fname"
                  value={user.fname}
                  onChange={handleInputs}
                  className="form-control"
                  placeholder="First Name"
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-user"></i>
                </span>
                <input
                  type="text"
                  name="lname"
                  value={user.lname}
                  onChange={handleInputs}
                  className="form-control"
                  placeholder="Last Name"
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-envelope"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputs}
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputs}
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="text"
                  name="cpassword"
                  value={user.cpassword}
                  onChange={handleInputs}
                  className="form-control"
                  placeholder="Confirm Password"
                ></input>
              </div>
              <div className="d-grid">
                <button onClick={submit} className="btn btn-success">
                  Sign Up Now
                </button>
                <p className="text-center text-muted mt-2">
                  When You Register By Clicking SignUp Button, You Agree to Our
                  `<a href="#">`Term and Conditions</a>and{" "}
                  <a href="#">Privacy Policy</a>
                </p>
                <p className="text-center">
                  Already Have An Account ? <a href="/login">Login here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
