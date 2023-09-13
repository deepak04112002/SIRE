import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
// import carData from "../assets/data/carData";
import axios from "axios";

const CarListing = () => {
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
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i class="ri-sort-asc"></i> Sort By
                </span>

                <select>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>

            {carData.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
