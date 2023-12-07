import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCountTodoContext } from "../context/CountTodoContext";

import Todo from "./Todo";
import { getTodos } from "../services/todo";

const TodoList: React.FC = () => {
  const [activeTodo, setActiveTodo] = useState<string | null>(null);

  //////////////////////////////////////////////////////////////////

  const { data, isError, isLoading } = useQuery({
    queryFn: getTodos,
    queryKey: ["todos"],
  });

  const { setCountTodo } = useCountTodoContext();

  useEffect(() => {
    if (data) setCountTodo(data.length);
  }, [data]);

  ///////////////////////////////////////////////

  if (isLoading) {
    return (
      <h2 className="py-5 block text-center font-bold text-lg">Loading...</h2>
    );
  }

  if (isError) {
    return (
      <h2 className="py-5 block text-center font-bold text-lg text-red-500">
        Error
      </h2>
    );
  }

  if (data && data.length === 0) {
    return (
      <h2 className="py-5 block text-center font-bold text-lg">
        There is no todos
      </h2>
    );
  }

  return (
    <div className="flex flex-col border border-x-gray-300">
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
