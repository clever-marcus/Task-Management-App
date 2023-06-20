import React, { useState, useEffect } from "react";
import CustomModal from "./components/Modal";
import axios from 'axios';

const App = () => {
  // State variables
  const [viewCompleted, setViewCompleted] = useState(false); // Controls the view mode (completed/incompleted)
  const [activeItem, setActiveItem] = useState({ // Holds the currently active item being edited/added
    title: "",
    description: "",
    completed: false
  });
  const [taskList, setTaskList] = useState([]); // Holds the list of tasks
  const [modal, setModal] = useState(false); // Controls the visibility of the modal

  // Fetch data from the API when the component mounts
  useEffect(() => {
    refreshList();
  }, []);

  // Fetch the list of tasks from the API
  const refreshList = () => {
    axios
      .get("http://localhost:8000/api/tasks/")
      .then(res => setTaskList(res.data))
      .catch(err => console.log(err));
  };

  // Change the view mode (completed/incompleted)
  const displayCompleted = (status) => {
    setViewCompleted(status);
  };

  // Render the tab list for view mode selection
  const renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => displayCompleted(true)}
          className={viewCompleted ? "active" : ""}
        >
          Completed
        </span>
        <span
          onClick={() => displayCompleted(false)}
          className={viewCompleted ? "" : "active"}
        >
          Incompleted
        </span>
      </div>
    );
  };

  //Render the task items based on the view mode
  const renderItems = () => {
    const newItems = taskList.filter(item => item.completed === viewCompleted);
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => editItem(item)}
            className="btn btn-secondary mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(item)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  // Toggle the modal visibility is False by default
  const toggle = () => {
    setModal(!modal);
  };

  // Handle form submission (add/edit task)
  const handleSubmit = (item) => {
    toggle();
    if (item.id) {
      // Update an exisiting task
      axios
        .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
        .then(res => refreshList());
      return;
    }
    // Add a new task
    axios
      .post("http://localhost:8000/api/tasks/", item)
      .then(res => refreshList());
  };

  // Delete a task
  const handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/tasks/${item.id}/`)
      .then(res => refreshList());
  };

  // Create a new task (open modal for adding)
  const createItem = () => {
    const item = { title: "", description: "", completed: false };
    setActiveItem(item);
    setModal(!modal);
  };

  // Edit a task (open modal for editing)
  const editItem = (item) => {
    setActiveItem(item);
    setModal(!modal);
  };

  return (
    <main className="content p-3 mb-2 bg-info">
      <h1 className="text-black text-uppercase text-center my-4">Task Management Application</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="">
              <button onClick={createItem} className="btn btn-warning">
                Add task
              </button>
            </div>
            {renderTabList()}
            <ul className="list-group list-group-flush">
              {renderItems()}
            </ul>
          </div>
        </div>
      </div>
      {modal && (
        <CustomModal
          activeItem={activeItem}
          toggle={toggle}
          onSave={handleSubmit}
        />
      )}
      <footer className="my-3 mb-2 bg-info text-white text-center" style={{fontFamily: 'cursive'}}>
        Task Management Web Application | Copyright &copy; 2023</footer>
    </main>
  );
};

export default App;
