"use client";
import { useEffect, useState } from "react";
import { addInventory, getAllInventory } from "../../utils/supabaseFunctions";
import Header from "./Header";
import Inventory from "./inventory";
import DataTableDemo from "./table";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const [inventories, setInventories] = useState<any>([]);

  // useEffect(() => {
  //   const getTodos = async () => {
  //     const todos = await getAllTodos();
  //     setTodos(todos.data);
  //     console.log(todos.data);
  //   };
  //   getTodos();
  // }, []);

  useEffect(() => {
    const getInventory = async () => {
      const inventories = await getAllInventory();
      setInventories(inventories.data);
      console.log(inventories.data);
    };
    getInventory();
  }, []);

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   if (title) {
  //     await addTodo(title);
  //     setTitle("");
  //     let todos = await getAllTodos();
  //     setTodos(todos.data);
  //   }
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name && price && quantity) {
      await addInventory(name, price, quantity, description);
      setName("");
      setPrice(0);
      setDescription("");
      setQuantity(1);
    }
  };

  return (
    <main>
      <Header />
      <form
        className="mt-8 flex justify-center space-x-8"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="name">名前</label>
        <input
          type="text"
          id="name"
          className="rounded-md border border-gray-300 px-4 py-2"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label htmlFor="price">金額</label>
        <input
          type="number"
          id="price"
          className="rounded-md border border-gray-300 px-4 py-2"
          onChange={(e) => setPrice(Number(e.target.value))}
          value={price}
        />
        <label htmlFor="quantity">数量</label>
        <input
          type="number"
          id="quantity"
          className="rounded-md border border-gray-300 px-4 py-2"
          onChange={(e) => setQuantity(Number(e.target.value))}
          value={quantity}
        />
        <label htmlFor="description">詳細</label>
        <input
          type="text"
          id="description"
          className="rounded-md border border-gray-300 px-4 py-2"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <Button className="bg-green-500 font-bold hover:bg-green-600">
          Add Inventory
        </Button>
      </form>
      <Inventory inventories={inventories} setInventories={setInventories} />
      <DataTableDemo />
    </main>
  );
}
