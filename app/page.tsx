"use client";
import { useEffect, useState } from "react";
import { getAllTodos } from "../utils/supabaseFunctions";
import TodoList from "./todoList";

export default function Home() {
  const [todos, setTodos] = useState<any>([]);
  useEffect(() => {
    const getTodos = async () => {
      const todos = await getAllTodos();
      setTodos(todos);
      console.log(todos.data);
    };
    getTodos();
  }, []);

  return (
    <main className="">
      <h1 className="flex justify-center text-2xl">Supabase Todo App</h1>
      <div className="flex justify-center space-x-8 mt-8">
        <input
          type="text"
          className="border border-gray-300 px-4 py-2 rounded-md"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">
          add
        </button>
      </div>
      <TodoList todos = {todos}/>
    </main>
  );
}
