import { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTodo, toggleTodo, updateTodo } from "../services/todo.ts";

import IconButton from "./IconButton.tsx";

import deleteImg from "../img/delete.png";
import editImg from "../img/edit.png";
import cancelImg from "../img/cancel.png";
import okImg from "../img/ok.png";

import { ITodo } from "../types/data.ts";

interface ITodoProps extends ITodo {
  activeTodo: string | null;
  setActiveTodo: React.Dispatch<React.SetStateAction<string | null>>;
}

const Todo: React.FC<ITodoProps> = ({
  id,
  title,
  completed,
  activeTodo,
  setActiveTodo,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id === activeTodo && inputRef.current) {
      const input = inputRef.current;

      input.selectionStart = input.selectionEnd = input.value.length;

      input.focus();
    }
  }, [activeTodo]);
  ///////////////////////////////////////////////////////////////////

  const [inputValue, setInputValue] = useState(title);

  const changeInputValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };
  /////////////////////////////////////////////////////////////////////////////

  const client = useQueryClient();
  const { mutate: deleteTodoMutate } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["todos"] });
      setInputValue("");
    },
  });
  const { mutate: updateTodoMutate } = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["todos"] });
      setInputValue("");
    },
  });
  const { mutate: toggleTodoMutate } = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["todos"] });
      setInputValue("");
    },
  });
  ///////////////////////////////////////////////////////

  const clickSave = () => {
    if (inputValue === "") return;
    if (inputValue === title) {
      setActiveTodo(null);
      return;
    }

    updateTodoMutate({ id, title: inputValue });
    setActiveTodo(null);
  };
  const clickEdit = () => {
    setInputValue(title);
    setActiveTodo(id);
  };
  const clickCancel = () => {
    setActiveTodo(null);
  };
  const clickDelete = () => {
    setActiveTodo(null);
    deleteTodoMutate(id);
  };
  const clickCheckbox = () => {
    setActiveTodo(null);
    toggleTodoMutate({ id, completed: !completed });
  };

  return (
    <div className="px-2 py-3 flex justify-start items-center gap-x-2 odd:bg-gray-200 border border-t-gray-500 last:border-b-gray-500">
      {id === activeTodo ? (
        <>
          <input
            type="text"
            className="w-full h-7 px-2 text-sm border border-gray-400 focus:border-gray-700"
            value={inputValue}
            onChange={changeInputValue}
            ref={inputRef}
          />

          <IconButton
            onClick={clickCancel}
            icon={cancelImg}
            tailStyles="bg-gray-400"
          />
          <IconButton
            onClick={clickSave}
            icon={okImg}
            tailStyles="bg-green-400"
          />
        </>
      ) : (
        <>
          <input
            className="w-4 h-4  mr-1 cursor-pointer"
            type="checkbox"
            checked={completed}
            onChange={clickCheckbox}
          />
          <h2 className="mr-auto">{title}</h2>

          <IconButton
            onClick={clickDelete}
            icon={deleteImg}
            tailStyles="bg-red-400"
          />
          <IconButton
            onClick={clickEdit}
            icon={editImg}
            tailStyles="bg-green-400"
          />
        </>
      )}
    </div>
  );
};

export default Todo;
