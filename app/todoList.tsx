import { Todo } from "@/utils/interface";
import React from "react";

type Props = {
  todos: Todo[];
};

const todoList = (props: Props) => {
  const { todos } = props;

  return (
    <div>
      <ul className="mx-auto">
        {todos.map((todo) => (
          <div key={todo.id} className="font-medium bg-orange-200 flex justify-center mt-2">
            {todo.title}
          </div>
        ))}
      </ul>
      <span className="cursor-pointer">X</span>
    </div>
  );
};

export default todoList;
