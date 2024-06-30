"use client";
import { useEffect, useState } from "react";
import { addTodo, getAllTodos } from "../utils/supabaseFunctions";
import TodoList from "./todoList";

export default function Home() {
  const [todos, setTodos] = useState<any>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const getTodos = async () => {
      const todos = await getAllTodos();
      setTodos(todos.data);
      console.log(todos.data);
    };
    getTodos();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (title) {
      await addTodo(title);
      setTitle("");
      let todos = await getAllTodos();
      setTodos(todos.data);
    }
  };

  return (
    <main className="">
      <h1 className="flex justify-center text-2xl">Supabase Todo App</h1>
      <form
        className="flex justify-center space-x-8 mt-8"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          className="border border-gray-300 px-4 py-2 rounded-md"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">
          add
        </button>
      </form>
      <TodoList todos={todos} setTodos={setTodos}/>
    </main>
  );
}
