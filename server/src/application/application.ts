
import ToDos from './todos/todos';

class Application {
  private _todos = new ToDos();

  get todos() {
    return this._todos
  }
}

export default new Application();