import axios from "axios";
const ROOT_URL =
  "https://vue-todo-list-8875a-default-rtdb.europe-west1.firebasedatabase.app";

// get all tasks
export const MyApi = {
  getTasks: () => {
    console.log("fetching data");
    const url = `${ROOT_URL}/tasks.json`;
    return axios.get(url);
  },
  // create a new task
  createTask: (value) => {
    const url = `${ROOT_URL}/tasks/.json`;
    return axios.post(url, {
      task: value,
      complete: false,
      created: new Date(),
      priority: "medium",
    });
  },
  // toggle task complete
  toggleTask: (id, status) => {
    const url = `${ROOT_URL}/tasks/${id}.json`;
    return axios.patch(url, { complete: status });
  },
  //delete one task
  deleteTask: (id) => {
    const url = `${ROOT_URL}/tasks/${id}.json`;
    return axios.delete(url);
  },
  //update task
  updateTask: (id, task, description, priority) => {
    console.log("task updated in database!");
    const url = `${ROOT_URL}/tasks/${id}.json`;
    return axios.patch(url, {
      task: task,
      description: description,
      priority: priority,
    });
  },
  //delete all tasks
  deleteAllTasks: () => {
    const url = `${ROOT_URL}/tasks.json`;
    return axios.delete(url);
  },
};
