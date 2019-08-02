export interface ToDoAddType {
  _id: string;
  title: string;
}

export interface ToDoAddItemType {
  _id: string;
  _object_id: string;
  header: string;
  isCompleted: false;
}

export interface ToDoEditedType {
  _id: string;
  _object_id: string;
  _item_id: string;
  header: string;
  isCompleted: boolean;
  index: number;
}

export interface ToDoDeleteType {
  _id: string;
  _object_id: string;
  _item_id: string;
  // header: string;
  // isCompleted: boolean;
  index: number;
}
