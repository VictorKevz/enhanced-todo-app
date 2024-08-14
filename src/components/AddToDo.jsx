import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../css/addToDo.css";
import error from "../assets/images/error.svg";

function AddToDo({ newItem, setNewItem, onAdd, isDark }) {
  
  const [isValid, setValid] = useState(true);

  const handleChange = (e) => {
    setNewItem(e.target.value);
    setValid(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) {
      setValid(false);
    } else if (newItem) {
      onAdd();
      setValid(true);
    }
  };
  return (
    <form
      autoComplete="off"
      className={`addTodo-container ${!isDark && "bg-light-card"} ${
        !isValid && "error"
      }`}
      onSubmit={handleSubmit}
    >
      <div className={`circle ${!isDark && "border-light"}`}></div>
      <label htmlFor="userInput">
        <input
          type="text"
          value={newItem}
          onChange={handleChange}
          className={`form-input ${!isDark && "text-light"}`}
          id="userInput"
          placeholder="Create a new todo..."
        />
      </label>
      {!isValid && (
        <span className="error-message">
          <img src={error} alt="Error Icon" className="error-icon" />
          Enter the task
        </span>
      )}
    </form>
  );
}

export default AddToDo;
