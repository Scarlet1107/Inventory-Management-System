import { supabase } from "../utils/supabase";

export const getAllTodos = async () => {
  const todos = await supabase.from("todos").select("*");
  return todos;
};

export const addTodo = async (title: string) => {
  console.log(title);
  await supabase.from("todos").insert([{ title: title }]);
};

export const deleteTodo = async (id: number) => {
  await supabase.from("todos").delete().eq("id", id);
};

export const getMatchedTodo = async (title: string) => {
  const todos = await supabase
    .from("todos")
    .select("*")
    .ilike("title", `%${title}%`);
  return todos;
};


export const getAllInventory = async () => {
  const inventory = await supabase.from("inventory").select("*");
  return inventory;
};

export const addInventory = async (name: string, price: number, quantity: number, description: string) => {
  await supabase.from("inventory").insert([{ name: name, price: price, quantity: quantity, description: description }]);
}

export const deleteInventory = async (id: number) => {
  await supabase.from("inventory").delete().eq("id", id);
}