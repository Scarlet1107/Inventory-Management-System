"use client";
import Link from "next/link";
import React, { useState } from "react";
import { getAllTodos, getMatchedTodo } from "../../utils/supabaseFunctions";
import { supabase } from "@/utils/supabase";
import { Todo } from "@/utils/interface";

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
    } else {
      const todos = await getMatchedTodo(searchWord);
      console.log(todos.data);
      setMatchedTodos(todos.data ?? []);
    }
  };

  return (
    <main>
      <header className="flex justify-around p-3 bg-blue-100">
        <Link href={"/home"} className="text-4xl">
          Supabase Todo App
        </Link>
        <Link href={"/home"} className="text-xl">
          メインページに戻る
        </Link>
      </header>
      <div className="flex justify-center space-x-4 mt-8">
        <input
          type="text"
          placeholder="検索したいTodoを入力"
          value={searchWord}
          onChange={(e) => handleChangeInput(e)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => searchTodo()}
        >
          Todoを検索
        </button>
      </div>
      <div className="flex justify-center mt-2">
        <ul className="mx-auto">
          {matchedTodos &&
            matchedTodos.map((todo: Todo) => (
              <div
                key={todo.id}
                className="text-xl font-medium bg-orange-200 flex justify-between mt-4 space-x-2 px-2"
              >
                <div className="">✅️{todo.title}</div>
                <span className="cursor-pointer">X</span>
              </div>
            ))}
        </ul>
      </div>
    </main>
  );
};

export default Page;
