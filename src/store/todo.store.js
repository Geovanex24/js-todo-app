import { Todo } from "../todos/models/todo.model";

/** Como va a lucir el estado global de la app
 *
 * Este "state" indica cual es la información que se quiere proporcionar de manera global en la apliación
 */

export const Filters = {
  All: "all",
  Completed: "completed",
  Pending: "pending",
};

const state = {
  todos: [
    // new Todo("Piedra del alma"),
    // new Todo("Piedra del espacio"),
    // new Todo("Piedra del tiempo"),
    // new Todo("Piedra del poder"),
    // new Todo("Piedra del realidad"),
  ],
  filter: Filters.All,
};

// Va a inicializar en un storage. Se puede llamar este initStore para cargar los datos y hacerlos persistentes
const initStore = () => {
  loadStore();
  console.log("InitStore 🥑");
  // console.log(state);
};

const loadStore = () => {
  if (!localStorage.getItem("state")) return;

  const { todos = [], filter = Filters.All } = JSON.parse(
    localStorage.getItem("state")
  );
  state.todos = todos;
  state.filter = filter;
};

const saveStateToLocalStorage = () => {
  localStorage.setItem("state", JSON.stringify(state));
};

const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];
    case Filters.Completed:
      return state.todos.filter((todo) => todo.done);
    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done);
    default:
      throw new Error(`Option ${filter} is not valid.`);
  }
};

/**
 * @param {String} description
 */
const addTodo = (description) => {
  if (!description) throw new Error("Description is required");

  state.todos.push(new Todo(description));
  saveStateToLocalStorage();
};

/**
 *
 * @param {String} todoId
 */
const toggleTodo = (todoId) => {
  // Todo: es más optimo buscar el todo independientemente mediante el find(), modificarlo e insertarlo en la posición que lo encontramos
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      todo.done = !todo.done; // true => false / false => true
    }
    return todo;
  });
  saveStateToLocalStorage();
};

const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId);
  saveStateToLocalStorage();
};

const deleteCompleted = () => {
  state.todos = state.todos.filter((todo) => !todo.done);
  saveStateToLocalStorage();
};

/**
 *
 * @param {Filters} newFilter
 */
const setFilter = (newFilter = Filters.All) => {
  // Tarea. Crear validación que revise que el filtro es válido o sea parte de los estabelecidos en Filters
  state.filter = newFilter;
  saveStateToLocalStorage();
};

const getCurrentFilter = () => {
  return state.filter;
};

export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
};
