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
  //automatic focus on input

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id === activeTodo && inputRef.current) {
      const input = inputRef.current;

      input.selectionStart = input.selectionEnd = input.value.length;

      input.focus();
    }
  }, [activeTodo]);
  ///////////////////////////////////////////////////////////////////

  //change input value

  const [inputValue, setInputValue] = useState(title);

  const changeInputValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };
  /////////////////////////////////////////////////////////////////////////////

  // declaration mutate function

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

  const handleSave = () => {
    if (inputValue === "") return;
    if (inputValue === title) {
      setActiveTodo(null);
      return;
    }

    updateTodoMutate({ id, title: inputValue });
    setActiveTodo(null);
  };
  const handleEdit = () => {
    setInputValue(title);
    setActiveTodo(id);
  };
  const handleCancel = () => {
    setActiveTodo(null);
  };
  const handleDelete = () => {
    setActiveTodo(null);
    deleteTodoMutate(id);
  };
  const handleCheck = () => {
    setActiveTodo(null);
    toggleTodoMutate({ id, completed: !completed });
  };

  return (
    <div className="px-2 py-3 flex justify-start items-start gap-x-2 odd:bg-gray-200 border border-t-gray-300 last:border-b-gray-300">
      {id === activeTodo ? (
        <>
          <input
            type="text"
            className="w-full h-7 px-2 text-sm border border-gray-400 focus:border-gray-500 focus:outline-none focus:border-2"
            value={inputValue}
            onChange={changeInputValue}
            ref={inputRef}
          />

          <IconButton
            onClick={handleCancel}
            icon={cancelImg}
            tailStyles="bg-gray-400"
          />
          <IconButton
            onClick={handleSave}
            icon={okImg}
            tailStyles="bg-green-400"
          />
        </>
      ) : (
        <>
          <input
            className="w-4 h-4 mt-1 mr-1 flex-shrink-0 cursor-pointer"
            type="checkbox"
            checked={completed}
            onChange={handleCheck}
          />
          <h2 className="mr-auto">{title}</h2>

          <IconButton
            onClick={handleDelete}
            icon={deleteImg}
            tailStyles="bg-red-400 ml-3"
          />
          <IconButton
            onClick={handleEdit}
            icon={editImg}
            tailStyles="bg-green-400"
          />
        </>
      )}
    </div>
  );
};

export default Todo;
