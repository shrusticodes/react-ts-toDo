import { Fragment, useContext } from "react";
import { ThemeContext } from "./ThemeContext";
type FilteredValueProp = {
  filteredValue: (text: string) => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function FilterComponent({
  filteredValue,
  onSearchChange
}: FilteredValueProp) {
  const context = useContext(ThemeContext);
  if (!context) {
    return null;
  }
  const { theme } = context;
  const handleFilterChange = (filterValue: string) => {
    filteredValue(filterValue);
  };

  const allTasks = () => handleFilterChange("all");
  const activeTasks = () => handleFilterChange("active");
  const completedTasks = () => handleFilterChange("completed");

  return (
    <Fragment>
      <div className="filter-div">
        <h3>Filters</h3>
        <button className={`btn-style ${theme} filter`} onClick={allTasks}>
          All Tasks
        </button>
        <button className={`btn-style ${theme} filter`} onClick={activeTasks}>
          Active
        </button>
        <button
          className={`btn-style ${theme} filter`}
          onClick={completedTasks}
        >
          Completed
        </button>
      </div>
      <div className={`searchDiv ${theme}`}>
        <input
          type="text"
          placeholder="Input to search a task / tasks"
          className="search"
          onChange={onSearchChange}
        />
      </div>
    </Fragment>
  );
}
