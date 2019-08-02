
// export default interface ToDosModel {
//   _object_id: string;
//   displayName: string;
//   username: string;
//   todos: Array<{
//       title: string;
//       items: Array<{
//         header: string;
//         isCompleted: boolean;
//       }>
//     }
//   >
// }
export interface ToDoItemModel {
  header: string;
  isCompleted: boolean;
}

export interface ToDoModel {
  _id: string;
  title: string;
  items: Array<ToDoItemModel>
}

export interface ToDosModel {
  _id: string;
  displayName: string;
  username: string;
  todos: Array<ToDoModel>;
}


