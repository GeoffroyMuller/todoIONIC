import { Todo } from "./types/todo.type";
import { generateIncremId } from "./utils";

let dataTodosMock: Todo[] = [
  { id: 1, title: "Apprendre Ionic", done: false, created_at: new Date() },
  { id: 2, title: "Créer une todolist", done: true, created_at: new Date() },
  { id: 3, title: "Montrer la todo à Franck", done: false, created_at: new Date() },
  {
    id: 4,
    title: "Faire les courses",
    done: true,
    created_at: new Date(),
    description:
      "Fusce nec condimentum turpis. Donec a augue id augue ultrices tempor. Cras sed viverra mi. Nunc tempus rhoncus mi id feugiat.",
  },
];

const simulateDelay = <T>(data: T, delay = 400): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

export const fetchAllTodos = (): Promise<Todo[]> => {
  return simulateDelay([...dataTodosMock]);
};

export const fetchTodoById = (id: number): Promise<Todo | undefined> => {
  const todo = dataTodosMock.find((t) => t.id === id);
  return simulateDelay(todo ? { ...todo } : undefined);
};

export const updateTodo = (data: Pick<Todo, "id" | "title" | "description">): Promise<Todo | undefined> => {
  dataTodosMock = dataTodosMock.map((t) =>
    t.id === data.id ? { ...t, ...data } : t
  );
  const todo = dataTodosMock.find((d) => d.id === data.id);
  return simulateDelay(todo ? { ...todo } : undefined);
};

export const addTodo = (data: Omit<Todo, "id">): Promise<Todo> => {
  const id = generateIncremId(dataTodosMock.map((e) => e.id));

  const todo: Todo = { ...data, id };
  dataTodosMock.push(todo);
  return simulateDelay({ ...todo });
};

export const deleteTodo = (id: number): Promise<number> => {
  dataTodosMock = dataTodosMock.filter((t) => t.id !== id);
  return simulateDelay(id);
};
