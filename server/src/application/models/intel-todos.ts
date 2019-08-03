
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const itemsSchema = new Schema({
    header: String,
    isCompleted: Boolean
  }
);

const todosSchema = new Schema({
  displayName: String,
  username: String,
  todos: [
    {
      title: String,
      items: [itemsSchema]
    }
  ]
});

export default mongoose.model('Todo', todosSchema);

   