import { supabase } from "../utils/supabase";

export const getAllTodos = async () => {
    const todos = await supabase.from("todos").select("*");
    return todos;
};
