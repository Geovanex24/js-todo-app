import { Todo } from "../models/todo.model";

/**
 *
 * @param {Todo} todo
 */
export const createTodoHTML = (todo) => {
  if (!todo) throw new Error("A todo object is required");

  const { id, description, done } = todo;

  const html = `
    <div class="view">
        <input class="toggle" type="checkbox" ${done && "checked"}>
        <label>${description}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
`;

  const liElement = document.createElement("li");
  liElement.setAttribute("data-id", id);
  done && liElement.classList.add("completed");
  liElement.innerHTML = html;

  return liElement;
};
