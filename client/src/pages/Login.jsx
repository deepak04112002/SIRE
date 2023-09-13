import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/Context/UserContext";

const Login = () => {
  const history = useNavigate();
  // const URL = "https://car-booking-five.vercel.app/";
  const { user, fetchUserData, deleteUserData, setUserData, accessToken } =
    useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      // const res = await axios.post(`${URL}/login`, {
      //   email,
      //   password,
      // });
      // console.log(res);

      // let data = JSON.stringify({
      //   email: "priyanshupanda.ctp@gmail.com",
      //   password: "priyanshu",
      // });

      let data = JSON.stringify({
        email: email,
        password: password,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://car-booking-five.vercel.app/api/auth/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(response.data);

      if (response.status === 200) {
        window.alert("Login Successful");
        history("/home");
        if (!user && !accessToken) {
          setUserData(response.data.accessToken, response.data.user);
          // sessionStorage.setItem(
          //   "accessToken",
          //   JSON.stringify(response.data.accessToken)
          // );
          // sessionStorage.setItem(
          //   "userData",
          //   JSON.stringify(response.data.user)
          // );
        }
      }
    } catch (error) {
      console.log(error);
      window.alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container pt-4">
        <div className="row mt-5">
          <div className="col-lg-4 bg-white m-auto rounded-top wrapper">
            <h2 className="text-center pt-3 ">
              {user ? "Already Logged In" : "Login Now"}
            </h2>

            {!user && (
              <form onSubmit={submit} className="py-3">
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="form-control"
                    placeholder="E-mail"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Password"
                  />
                </div>

                <div className="d-grid">
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <>
                      <button type="submit" className="btn btn-success">
                        Login
                      </button>
                      <p className="text-center mt-3">
                        Register Now for Free by Clicking{" "}
                        <a href="/register">Register Now</a>
                      </p>
                    </>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
