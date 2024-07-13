"use client";
import Link from "next/link";
import Header from "./Header";
import React, { useState } from "react";
import {
  deleteTodo,
  getAllTodos,
  getMatchedTodo,
} from "../../utils/supabaseFunctions";
import { Todo } from "@/utils/interface";
import { supabase } from "@/utils/supabase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [matchedTodos, setMatchedTodos] = useState<Todo[] | null>(null);
  const [searchWord, setSearchWord] = useState<string>("");

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const searchTodo = async () => {
    if (!searchWord) {
      const todos = await getAllTodos();
      setMatchedTodos(todos.data);
      console.log(todos.data);
      toast.success("すべてのTodoを検索しました");
    } else {
      const todos = await getMatchedTodo(searchWord);
      console.log(todos.data);
      setMatchedTodos(todos.data ?? []);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    const todos = await getMatchedTodo(searchWord);
    setMatchedTodos(todos.data);
    console.log(todos.data ?? []);
    toast.success("正常に削除が完了しました");
  };

  return (
    <main>
      <Header />
      <div className="flex justify-center space-x-4 mt-8">
        <input
          type="text"
          placeholder="検索したいTodoを入力"
          onChange={(e) => handleChangeInput(e)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={() => searchTodo()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Todoを検索
        </button>
      </div>
      <div className="flex justify-center mt-2">
        <ul className="mx-auto">
          {matchedTodos &&
            matchedTodos.map((todo: Todo, index) => (
              <div
                key={todo.id}
                className={`text-xl font-medium flex justify-between my-3 p-2 space-x-2 px-2 ${index % 2 === 0 ? "bg-orange-100" : "bg-blue-100"
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
};

export default Page;
