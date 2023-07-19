import React, { useState, useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function AddTask({ addTask }: { addTask: (text: string) => void }) {
  const [value, setValue] = useState<string>("");
  const context = useContext(ThemeContext);
  if (!context) {
    return null;
  }
  const { theme } = context;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleAddTask = () => {
    addTask(value);
    setValue("");
  };
  return (
    <div className={`addTaskDiv ${theme}`}>
      <input
        type="text"
        placeholder="Add a Task"
        value={value}
        onChange={handleChange}
      />
      <button className={`btn-style ${theme}`} onClick={handleAddTask}>
        Add
      </button>
    </div>
  );
}
export default AddTask;
