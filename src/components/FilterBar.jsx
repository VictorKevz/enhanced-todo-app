import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../css/filters.css";

function FilterBar({ filter, setFilter, onClear, items, completedItems,isDark }) {
  const incompleteCount = items.filter(item => !completedItems[item.id]).length;
 
  return (
    <div className={`filterBar-wrapper ${!isDark && "bg-light-card"}`}>
      <p className="items-num">{`${incompleteCount} items left`}</p>
      <div className={`middle-filters-wrapper ${!isDark && "bg-light-filter"}`}>
        <button
          onClick={() => setFilter("All")}
          className={`filter-btn ${filter === "All" ? "active" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("Active")}
          className={`filter-btn ${filter === "Active" ? "active" : ""}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("Completed")}
          className={`filter-btn ${filter === "Completed" ? "active" : ""}`}
        >
          Completed
        </button>
      </div>
      <button className={`filter-btn`} onClick={onClear}>
        Clear Completed
      </button>
    </div>
  );
}

export default FilterBar;
