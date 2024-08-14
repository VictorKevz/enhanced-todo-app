import React, { useState } from "react";
import "../css/todoList.css";
import deleteIcon from "../assets/images/icon-cross.svg";
import checkIcon from "../assets/images/icon-check.svg";
import editIcon from "../assets/images/edit.svg";

function ToDoList({
  items,
  onDelete,
  completedItems,
  setCompletedItems,
  filter,
  isDark,
  setItems,
}) {
  const [editingID, setEditingID] = useState(null);
  const [editedText, setEditedText] = useState("");

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

  const handleEditingText = (id, text) => {
    setEditingID(id);
    setEditedText(text);
  };

  const saveEdit = (id) => {
    if (editedText.trim() === "") {
      setEditingID(null);
      setEditedText("");
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, text: editedText } : item
      )
    );
    setEditingID(null);
    setEditedText("");
  };
  return (
    <div className={`todoList-wrapper ${!isDark && "bg-light-card"}`}>
      {filteredItems.map((item) => {
        const isComplete = completedItems[item.id];
        const isEditing = item.id === editingID;

        return (
          <ul key={item.id} className={`items-container`}>
            <li
              className="edit-item"
              onClick={() => handleEditingText(item.id, item.text)}
            >
              <img src={editIcon} alt="Edit Icon" className="edit-icon" />
            </li>
            <li
              className={`circle ${isComplete && "complete"} ${
                !isDark && "border-light"
              }`}
            >
              {isComplete && <img src={checkIcon} alt="Check Icon" />}
            </li>
            {isEditing ? (
              <input
                type="text"
                value={editedText}
                className={`editing-input ${isEditing && "editing"}`}
                onChange={(e) => setEditedText(e.target.value)}
                onBlur={() => saveEdit(item.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(item.id);
                }}
              />
            ) : (
              <li
                className={`item ${isComplete && "complete"} ${
                  !isDark && "light-text"
                } ${isEditing && "editing"}`}
                onClick={() => toggleCompleteState(item.id)}
              >
                {item.text}
              </li>
            )}
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
