
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

// const todosSchema = new Schema({
//   displayName: String,
//   username: String,
//   todos: [
//     {
//       title: String,
//       items: [
//         {
//           header: String,
//           isCompleted: Boolean
//         }
//
//       ]
//     }
//   ]
// });

export default mongoose.model('Todo', todosSchema);

   