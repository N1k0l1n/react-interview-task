import React from "react";

const Card = ({ title, color, count }) => {
  return (
    <div className={`card bg-${color}`}>
      <div className="card-body">
        <h5 className="card-title">
          {count} {title}
        </h5>
      </div>
    </div>
  );
};

export default Card;
