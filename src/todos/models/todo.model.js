import { v4 as uuid } from "uuid";
// Lo creamos como una clase para así poder crear instancias de nuestro ToDo

export class Todo {
  /**
   * Crea una nuevo ToDo o Instancia. Para crear una nueva tarea solo necesitamos la descripción
   * @param {String} description
   */
  constructor(description) {
    this.id = uuid();
    this.description = description;
    this.done = false;
    this.createdAt = new Date();
  }
}
