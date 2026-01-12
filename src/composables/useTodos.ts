import { useEffect, useState } from "react";
import { fetchAllTodos, updateTodo, addTodo, deleteTodo } from "../mock";
import { Todo } from "../types/todo.type";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const refreshTodos = async () => {
    const data = await fetchAllTodos();
    setTodos(data);
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const updated = { ...todo, done: !todo.done };
    await updateTodo(updated);
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const editTodo = async (todo: Todo) => {
    const updated = await updateTodo({
      id: todo.id,
      title: todo.title,
      description: todo.description,
    });
    if (!updated) return;

    setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
  };

  const addNewTodo = async (title: string, description?: string) => {
    const newTodo = await addTodo({
      title,
      done: false,
      created_at: new Date(),
      description,
    });
    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteTodoById = async (id: number) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        await refreshTodos();
      } catch (error) {
        console.error("Loading faild > ", error);
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
  }, []);

  return {
    todos,
    loading,
    refreshTodos,
    toggleTodo,
    addNewTodo,
    deleteTodoById,
    editTodo,
  };
}
