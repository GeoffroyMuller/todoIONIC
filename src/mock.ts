import { Todo } from "./types/todo.type";

let dataTodosMock: Todo[] = [
  { id: 1, title: "Apprendre Ionic", done: false, created_at: new Date() },
  { id: 2, title: "Créer une todolist", done: true, created_at: new Date() },
  { id: 3, title: "Apprendre Ionic", done: false, created_at: new Date() },
  {
    id: 4,
    title: "Créer une todolist",
    done: true,
    created_at: new Date(),
    description:
      "Fusce nec condimentum turpis. Donec a augue id augue ultrices tempor. Cras sed viverra mi. Nunc tempus rhoncus mi id feugiat.",
  },
];

const simulateDelay = <T>(data: T, delay = 400): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

export const fetchAllTodos = (): Promise<Todo[]> => {
  return simulateDelay(dataTodosMock);
};

export const fetchTodoById = (id: number): Promise<Todo | undefined> => {
  const todo = dataTodosMock.find((t) => t.id === id);
  return simulateDelay(todo);
};

export const updateTodo = (data: Todo): Promise<Todo | undefined> => {
  dataTodosMock = dataTodosMock.map((t) =>
    t.id === data.id ? { ...t, ...data } : t
  );
  const res = dataTodosMock.find((d) => d.id === data.id)
  return simulateDelay(res);
};

export const addTodo = (data: Omit<Todo, "id">): Promise<Todo> => {
  const todo: Todo = { ...data, id: Date.now() };
  dataTodosMock.push(todo);
  return simulateDelay(todo);
};

export const deleteTodo = (id: number): Promise<number> => {
  dataTodosMock = dataTodosMock.filter((t) => t.id !== id);
  return simulateDelay(id);
};
