import React from "react";
import { productStatuses } from "../data/portfolio";

const StatusBadge = ({ status }) => (
  <span className={`status-badge status-${status}`}>
    <span className="status-dot" aria-hidden="true" />
    {productStatuses[status]}
  </span>
);

export default StatusBadge;
