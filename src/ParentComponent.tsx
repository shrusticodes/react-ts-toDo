import "./styles.css";
import React, { useState, useCallback, useReducer, useContext } from "react";
import AddTask from "./AddTask";
import TaskComponent from "./TaskComponent";
import FilterComponent from "./FilterComponent";
import { ThemeContext } from "./ThemeContext";

type ToDoProps = {
  id: number;
  taskName: string;
  isTaskDone: boolean;
};

type ToDoState = {
  todos: ToDoProps[];
};

type ToDoAction = {
  type?: string;
  id?: number;
  value?: string;
};

const initialState: ToDoState = {
  todos: [
    { id: 43, taskName: "Wash clothes", isTaskDone: false },
    { id: 765, taskName: "Dress up", isTaskDone: true }
  ]
};

function reducer(state: ToDoState, action: ToDoAction): ToDoState {
  switch (action.type) {
    case "ADD_TASK":
      if (action.value === "") {
        alert("Fill the input box to add a task");
        return state;
      } else {
        const newObj = {
          id: Math.floor(Math.random() * 1000 + 1),
          taskName: action.value || "",
          isTaskDone: false
        };
        return { ...state, todos: [...state.todos, newObj] };
      }
    case "DELETE_TASK":
      return {
        ...state,
        todos: state.todos.filter((task) => task.id !== action.id)
      };

    case "UPDATE_TASK":
      return {
        ...state,
        todos: state.todos.map((task) => {
          if (task.id === action.id) {
            return { ...task, taskName: action.value || "" };
          }
          return task;
        })
      };
    case "TASK_DONE":
      return {
        ...state,
        todos: state.todos.map((task) => {
          if (task.id === action.id) {
            return { ...task, isTaskDone: !task.isTaskDone };
          }
          return task;
        })
      };
    default:
      return state;
  }
}

function ParentComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [filter, setFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  const addTaskHandler = useCallback((value: string) => {
    dispatch({ type: "ADD_TASK", value: value });
  }, []);

  const onDeleteHandler = useCallback((id: number) => {
    dispatch({ type: "DELETE_TASK", id: id });
  }, []);

  const isTaskDoneHandler = useCallback((id: number) => {
    dispatch({ type: "TASK_DONE", id: id });
  }, []);

  const onTaskUpdate = useCallback((id: number, value: string) => {
    dispatch({ type: "UPDATE_TASK", id: id, value: value });
  }, []);

  const handleFilterChange = useCallback((filterValue: string) => {
    setFilter(filterValue);
  }, []);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    []
  );

  const filterTasks = useCallback(() => {
    let filteredTasks = state;

    if (filter === "active") {
      filteredTasks.todos = filteredTasks.todos.filter(
        (task: ToDoProps) => !task.isTaskDone
      );
    } else if (filter === "completed") {
      filteredTasks.todos = filteredTasks.todos.filter(
        (task: ToDoProps) => task.isTaskDone
      );
    }

    if (searchText !== "") {
      const searchQuery = searchText.toLowerCase();
      filteredTasks.todos = filteredTasks.todos.filter((task: ToDoProps) =>
        task.taskName!.toLowerCase().includes(searchQuery)
      );
    }

    return filteredTasks;
  }, [filter, state, searchText]);

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    return null;
  }
  const { theme, toggleTheme } = themeContext;

  const listItems = filterTasks().todos.map((task: ToDoProps) => (
    <TaskComponent
      key={task.id}
      task={task}
      onDelete={onDeleteHandler}
      onTaskDone={isTaskDoneHandler}
      onUpdate={onTaskUpdate}
    />
  ));

  console.log(state);

  return (
    <div className={`mainDiv ${theme}`}>
      <h2>To Do List</h2>
      <button onClick={toggleTheme} className={`btn-style ${theme} filter`}>
        Theme
      </button>
      <AddTask addTask={addTaskHandler} />
      <FilterComponent
        filteredValue={handleFilterChange}
        onSearchChange={handleSearchChange}
      />
      <ul>{listItems}</ul>
    </div>
  );
}

export default ParentComponent;
