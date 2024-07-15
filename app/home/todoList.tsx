import React from "react";
import { Todo } from "@/utils/interface";
import { deleteTodo, getAllTodos } from "@/utils/supabaseFunctions";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<any>;
};

const todoList = (props: Props) => {
  const { todos, setTodos } = props;

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    const todos = await getAllTodos();
    setTodos(todos.data);
    console.log(todos.data);
  };

  return (
    <div className="mt-2 flex justify-center">
      <ul className="mx-auto">
        {todos.map((todo, index) => (
          <div
            key={todo.id}
            className={`my-3 flex justify-between space-x-2 p-2 px-2 text-xl font-medium ${
              index % 2 === 0 ? "bg-orange-100" : "bg-blue-100"
            }`}
          >
            <div>✅️{todo.title}</div>
            <span
              className="cursor-pointer"
              onClick={() => handleDelete(todo.id)}
            >
              X
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default todoList;
