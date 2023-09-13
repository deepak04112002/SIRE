import React from "react";

const CarItem = ({ make, model, bookingTime }) => {
  // Assuming you have access to the bookingTime from the API response

  const allottedTime = 3 * 24 * 60 * 60 * 1000; // Allotted time for rent in milliseconds (3 days)
  bookingTime = new Date("July 25, 2023 03:24:00").getTime();
  // Calculate remaining time
  const currentTime = new Date().getTime(); // Current time in milliseconds
  const remainingTime = bookingTime + allottedTime - currentTime;

  // Calculate remaining days
  const remainingDays = Math.ceil(remainingTime / (24 * 60 * 60 * 1000));

  return (
    <li className="list-group-item car-item">
      <div>
        <span className="car-label">Make:</span> {make}
      </div>
      <div>
        <span className="car-label">Model:</span> {model}
      </div>
      <div>
        <span className="car-label">Time Remaining:</span> {remainingDays} days
      </div>
    </li>
  );
};

export default CarItem;
