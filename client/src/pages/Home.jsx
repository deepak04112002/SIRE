import React, { useEffect, useState } from "react";

import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";

import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../components/UI/FindCarForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import defaultCarData from "../assets/data/carData";
import CarItem from "../components/UI/CarItem";
import RegisterCarSection from "../components/UI/RegisterCarSection";
import Testimonial from "../components/UI/Testimonial";
import BlogList from "../components/UI/BlogList";
import axios from "axios";

const Home = () => {
  const [carData, setCarData] = useState([]);
  const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
  console.log(accessToken);

  const fetchCarData = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://car-booking-five.vercel.app/api/car/allcars",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.request(config);
      console.log(response.data);

      //TODO: Get the actual car data by fetching from the DB
      setCarData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCarData();
  }, []);
  console.log(carData);

  return (
    <Helmet title="Home">
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />

        <div className="hero__form">
          <Container>
            <Row className="form__row">
              <Col lg="4" md="4">
                <div className="find__cars-left">
                  <h2>Find your best car here</h2>
                </div>
              </Col>

              <Col lg="8" md="8" sm="12">
                <FindCarForm />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/* =========== about section ================ */}
      <AboutSection />
      {/* ========== services section ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">See our</h6>
              <h2 className="section__title">Popular Services</h2>
            </Col>

            <ServicesList />
          </Row>
        </Container>
      </section>
      {/* =========== car offer section ============= */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Come with</h6>
              <h2 className="section__title">Hot Offers</h2>
            </Col>

            {carData.slice(0, 6).map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
      {/* =========== become a driver section ============ */}
      <RegisterCarSection />

      {/* =========== testimonial section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Our clients says</h6>
              <h2 className="section__title">Testimonials</h2>
            </Col>

            <Testimonial />
          </Row>
        </Container>
      </section>

      {/* =============== blog section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Explore our blogs</h6>
              <h2 className="section__title">Latest Blogs</h2>
            </Col>

            <BlogList />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
