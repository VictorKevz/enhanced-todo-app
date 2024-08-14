import React, { useState } from "react";
import { motion } from "framer-motion";
import uuid from "react-uuid";
import "./App.css";
import { entry } from "./variants";
import Header from "./components/Header";
import AddToDo from "./components/AddToDo";
import ToDoList from "./components/ToDoList";
import FilterBar from "./components/FilterBar";
function App() {
  const [items, setItems] = useState([
    { id: uuid(), text: "Complete online JavaScript course" },
    { id: uuid(), text: "Jog around the park 3x" },
    { id: uuid(), text: "10 minutes meditation" },
    { id: uuid(), text: "Read for 1 hour" },
    { id: uuid(), text: "Pick up groceries" },
    { id: uuid(), text: "Complete Todo App on Frontend Mentor" },
  ]);

  // If items exist, mark the first one as complete; otherwise, initialize with an empty object.
  const [completedItems, setCompletedItems] = useState(
    items.length > 0 ? { [items[0].id]: true } : {}
  );

  const [newItem, setNewItem] = useState("");
  const [filter, setFilter] = useState("All");

  const addItems = () => {
    const newTodo = { id: uuid(), text: newItem }; // Assign a unique ID to the new item
    setItems((prevItems) => [newTodo, ...prevItems]); // Add new item to the list
    setNewItem("");
  };

  const deleteItems = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id)); // Filter out the item by its ID

    // Also remove the item from the completedItems object
    setCompletedItems((prevCompleted) => {
      const { [id]: _, ...rest } = prevCompleted; // Use destructuring to remove the item by ID from completedItems
      return rest;
    });
  };

  const clearCompletedItems = () => {
    setItems((prevItems) =>
      prevItems.filter((item) => !completedItems[item.id])
    );
    setCompletedItems({});
  };

  const [isDark, setDark] = useState(true);

  return (
    <main className={`outer-container ${!isDark && "bg-light"}`}>
      <div className="inner-container">
        <motion.div
          className="bg-header"
          variants={entry}
          initial="hidden"
          animate="visible"
        >
          <Header isDark={isDark} setDark={setDark} />
          <AddToDo
            newItem={newItem}
            setNewItem={setNewItem}
            onAdd={addItems}
            isDark={isDark}
          />
          <ToDoList
            items={items}
            setItems={setItems}
            onDelete={deleteItems}
            completedItems={completedItems}
            setCompletedItems={setCompletedItems}
            filter={filter}
            setFilter={setFilter}
            isDark={isDark}

          />
          <FilterBar
            filter={filter}
            setFilter={setFilter}
            onClear={clearCompletedItems}
            items={items}
            completedItems={completedItems}
            isDark={isDark}

          />
        </motion.div>
        <p className="drag">Drag and drop to reorder list</p>
      </div>
    </main>
  );
}

export default App;
