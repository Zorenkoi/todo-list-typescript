import { useState, useContext, useEffect } from "react";

import Todo from "./Todo";

interface ITodoItem {
  id: string;
  title: string;
  completed: boolean;
}

const data: ITodoItem[] = [
  {
    id: "lput3rm4",
    title: "new todo",
    completed: true,
  },
  {
    id: "lputg2k2",
    title: "hui",
    completed: false,
  },
  {
    id: "lputg6e2",
    title: "zalupa",
    completed: false,
  },
  {
    id: "lputg6e1",
    title: "zalupa",
    completed: false,
  },
];

const TodoList: React.FC = () => {
  const [activeTodo, setActiveTodo] = useState<string | null>(null);

  if (false) {
    return (
      <h2 className="py-5 block text-center font-bold text-lg">Loading...</h2>
    );
  }

  if (false) {
    return (
      <h2 className="py-5 block text-center font-bold text-lg text-red-500">
        Error
      </h2>
    );
  }

  if (data.length === 0) {
    return (
      <h2 className="py-5 block text-center font-bold text-lg">
        There is no todos
      </h2>
    );
  }

  return (
    <div className="flex flex-col border border-x-gray-500">
      {data &&
        data.map((todo) => {
          return (
            <Todo
              key={todo.id}
              {...todo}
              activeTodo={activeTodo}
              setActiveTodo={setActiveTodo}
            />
          );
        })}
    </div>
  );
};

export default TodoList;
