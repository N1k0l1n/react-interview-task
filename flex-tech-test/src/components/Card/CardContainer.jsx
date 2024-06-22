import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import "./card.css";

const CardContainer = () => {
  const statusCounts = useSelector((state) => state.statusCounts);

  const statuses = [
    { title: "On Road", color: "yellow", count: statusCounts.onRoad },
    { title: "Completed", color: "green", count: statusCounts.completed },
    { title: "On Hold", color: "red", count: statusCounts.onHold },
  ];

  return (
    <div className="card-container">
      {statuses.map((status) => (
        <Card
          key={status.title}
          title={status.title}
          color={status.color}
          count={status.count}
        />
      ))}
    </div>
  );
};

export default CardContainer;
