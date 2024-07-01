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
    <div className="flex justify-center mt-2">
      <ul className="mx-auto">
        {todos.map((todo, index) => (
          <div
            key={todo.id}
            className={`text-xl font-medium flex justify-between my-3 p-2 space-x-2 px-2 ${
              index % 2 === 0 ? "bg-orange-100" : "bg-blue-100"
            }`}
          >
            <div className="">✅️{todo.title}</div>
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
