import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { bounceIn,entry } from "../variants";
import "../css/todoList.css";
import deleteIcon from "../assets/images/icon-cross.svg";
import checkIcon from "../assets/images/icon-check.svg";

function ToDoList({ items, onDelete,completedItems,setCompletedItems,filter, isDark }) {

  const toggleCompleteState = (id) => {
    setCompletedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const filteredItems = items.filter((item) => {
    if (filter === "Active") {
      return !completedItems[item.id]; // Show only incomplete items
    } else if (filter === "Completed") {
      return completedItems[item.id]; // Show only completed items
    } else {
      return true; // Show all items
    }
  });

  return (
    <div className={`todoList-wrapper ${!isDark && "bg-light-card"}`}>
      {filteredItems.map((item) => {
        const isComplete = completedItems[item.id];

        return (
          <ul 
          key={item.id} className={`items-container`}
          
          
          >
            <li className={`circle ${isComplete && "complete"} ${!isDark && "border-light"}`}>
              {isComplete && <img src={checkIcon} alt="Check Icon" />}
            </li>
            <li
              className={`item ${isComplete && "complete"} ${!isDark && "text-light"}`}
              onClick={() => toggleCompleteState(item.id)}
            >
              {item.text}
            </li>
            <li className="delete-item" onClick={() => onDelete(item.id)}>
              <img src={deleteIcon} alt="Cross Icon" className="delete-icon" />
            </li>
          </ul>
        );
      })}
    </div>
  );
}

export default ToDoList;