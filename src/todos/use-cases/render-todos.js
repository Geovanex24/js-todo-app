// Todo: Manejar excepción para cuando los todos no sean proporcionados al método

import { createTodoHTML } from "./create-todo-html";
import { Todo } from "../models/todo.model";

let element;

/**
 *
 * @param {String} elementId
 * @param {Array[Todo]} todos
 */
export const renderTodos = (elementId, todos = []) => {
  if (!element) element = document.querySelector(elementId);
  if (!element) throw new Error(`Element ${elementId} not found`);

  /*TODO: referencia => Solución de arriba**/
  // const element = document.querySelector(elementId); // Esto va a saltar al DOM cada vez que hagamos referencia a este querySelector. Existe una manera de mantener la referencia a la funcionalidad, pero si ya lo tenemos no volverlo a buscar

  element.innerHTML = ""; // Purga el contenido que tenga el elemento (Evita que acumule los creados anteriormente o duplicidad)

  for (const todo of todos) {
    element.append(createTodoHTML(todo));
  }
};
