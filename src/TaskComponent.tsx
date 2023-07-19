import React, { useState, useContext, useRef } from "react";
// import Popup from 'reactjs-popup';
import { ThemeContext } from "./ThemeContext";
type TaskComponentProps = {
  task: { id: number; taskName: string; isTaskDone: boolean };
  onDelete: (id: number) => void;
  onTaskDone: (id: number) => void;
  onUpdate: (id: number, value: string) => void;
};

type PopupProps = {
  theme: string;
  handleOnUpdate: () => void;
  handleEditValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  togglePopup: () => void;
};
function PopupBox(props: PopupProps) {
  const { theme, handleOnUpdate, handleEditValueChange, togglePopup } = props;
  return (
    <div
      style={{
        backgroundColor: "white",
        border: "2px solid black",
        padding: "5px",
        borderRadius: "5px",
        width: "320px",
        height: "130px",
        marginLeft: "10px"
      }}
    >
      <button
        className={`btn-style ${theme}`}
        style={{ float: "right", width: "25px", height: "30px" }}
        onClick={togglePopup}
      >
        <i className="fa fa-times fa-lg"></i>
      </button>
      <input
        type="text"
        placeholder="Enter the task"
        onChange={handleEditValueChange}
      />
      <button
        className={`btn-style ${theme}`}
        style={{ float: "right" }}
        onClick={handleOnUpdate}
      >
        Update
      </button>
    </div>
  );
}
function TaskComponent({
  task,
  onDelete,
  onTaskDone,
  onUpdate
}: TaskComponentProps) {
  const { id, taskName, isTaskDone } = task;
  const [value, setValue] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const div = useRef<HTMLDivElement>(null!);
  const context = useContext(ThemeContext);
  if (!context) {
    return null;
  }
  const { theme } = context;
  const handleOnDelete = () => {
    onDelete(id);
  };
  const handleChange = () => {
    onTaskDone(id);
  };

  const handleEditValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(event.target.value);
  };

  const handleOnUpdate = () => {
    if (value) {
      onUpdate(id, value);
      div.current.focus();
    } else alert("Fill in the input");
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <>
      <li>
        <input type="checkbox" checked={isTaskDone} onChange={handleChange} />
        <div ref={div} tabIndex={0} style={{ width: "220px", color: "black" }}>
          {taskName}
        </div>
        <button className={`btn-style ${theme}`} onClick={handleOnDelete}>
          <i className="fa fa-trash" />
        </button>
        <button className={`btn-style ${theme}`} onClick={togglePopup}>
          <i className="fas fa-edit" />
        </button>
        {/* <Popup contentStyle={{ backgroundColor: "white", border: "2px solid black", padding: '20px', borderRadius: '5px' }} trigger=
                {<button className={`btn-style ${theme}`}><i className="fas fa-edit" /></button>}
                position="right center">
                <input type="text" placeholder='Enter the task' onChange={handleEditValueChange} />
                <button className={`btn-style ${theme}`} onClick={handleOnUpdate}>Update</button>
            </Popup> */}

        {showPopup && (
          <PopupBox
            theme={theme}
            handleOnUpdate={handleOnUpdate}
            handleEditValueChange={handleEditValueChange}
            togglePopup={togglePopup}
          />
        )}
      </li>
    </>
  );
}
export default TaskComponent;
