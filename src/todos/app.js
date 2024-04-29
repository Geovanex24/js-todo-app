import todoStore, { Filters } from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos, renderPending } from "./use-cases";

// Vite nos permite únicamente utilizando "?raw", obtener el html sin ningún inconveniente. De lo contrario nos marcaría error.

const ElementIDs = {
  ClearCompleted: ".clear-completed",
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  TodoFilters: ".filtro",
  PendingCountLabel: "#pending-count",
};
/**
 * Está función va a crear la aplicación, básciamente crea lo que queremos renderizar en pantalla
 * @param {String} elementId - Elemento en el cual se renderiza la aplicación
 */
export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIDs.TodoList, todos);
    updatePendingCount();
  };

  const updatePendingCount = () => {
    renderPending(ElementIDs.PendingCountLabel);
  };

  /**
   * Función anónnima autoinvocada:
   * Se ejecuta cuando la función App() se llama.
   * Se hace de está forma porque cuando se agreguen funciones, se necesita que la app este creada y así poder hacer referencia a elementos HTML de la ahí (app)
   */
  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  // Referencias HTML
  const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
  const todoListUL = document.querySelector(ElementIDs.TodoList);
  const clearCompletedBtn = document.querySelector(ElementIDs.ClearCompleted);
  const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);

  //Listeners
  /** Add todo */
  newDescriptionInput.addEventListener("keyup", (event) => {
    //key = 'Enter' => keyCode = 13
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;

    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = "";
  });

  // Toggle & Delete todo
  todoListUL.addEventListener("click", (event) => {
    const todoId = event.target.closest("[data-id]").getAttribute("data-id");
    const isToggle = event.target.className === "toggle";
    const isDelete = event.target.className === "destroy";

    if (!todoId || (!isToggle && !isDelete)) return;

    // isToggle ? todoStore.toggleTodo(todoId) : todoStore.deleteTodo(todoId);
    isToggle && todoStore.toggleTodo(todoId);
    isDelete && todoStore.deleteTodo(todoId);

    displayTodos();
  });

  // Delete all completed
  clearCompletedBtn.addEventListener("click", () => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  filtersLIs.forEach((element) => {
    element.addEventListener("click", (event) => {
      filtersLIs.forEach((filterLi) => filterLi.classList.remove("selected"));
      event.target.classList.add("selected");

      switch (event.target.text) {
        case "Todos":
          todoStore.setFilter(Filters.All);
          break;
        case "Pendientes":
          todoStore.setFilter(Filters.Pending);
          break;
        case "Completados":
          todoStore.setFilter(Filters.Completed);
          break;
        default:
          throw new Error(`Invalid filter "${event.target.text}"`);
      }

      displayTodos();
    });
  });
};
