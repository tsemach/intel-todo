import ToDosModel from '../models/intel-todos';

class ToDos {
  constructor() {
  }

  getToDos(username: string) {
    console.log("DDDDDDDDD: username", username);
    return ToDosModel.find({});
  }
}

export default ToDos;