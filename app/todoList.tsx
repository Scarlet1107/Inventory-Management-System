import React from "react";
import { Todo } from "@/utils/interface";
import { deleteTodo, getAllTodos } from "@/utils/supabaseFunctions";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

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
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="text-xl font-medium bg-orange-200 flex justify-between mt-4 space-x-2 px-2"
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
