import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Register from "../pages/Register";
import Login from "../pages/Login";
import CarRegistration from "../pages/CarRegistration";
import Profile from "../pages/Profile";
const Routers = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          sessionStorage.getItem("userData") ? (
            <Navigate to="/home" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:carId" element={<CarDetails />} />
      <Route path="/registercar" element={<CarRegistration />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
