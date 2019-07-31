
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const todosSchema = new Schema({ 
  displayName: String,
  username: String,
  todos: [
    {
      title: String,
      items: [
        {
          header: String,
          isCompleted: Boolean
        }        

      ]
    }
  ]
});

export default mongoose.model('Todo', todosSchema);

   