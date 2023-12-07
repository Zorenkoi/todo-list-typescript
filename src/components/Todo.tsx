import { useState, useEffect } from "react";

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
  const [inputValue, setInputValue] = useState(title);

  const changeInputValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  const clickSave = () => {
    if (inputValue !== "") {
      const updatedTodo = {
        id,
        title: inputValue,
        completed,
      };

      setActiveTodo(null);
    }
  };
  const clickEdit = () => {
    setActiveTodo(id);
  };
  const clickCancel = () => {
    setActiveTodo(null);
  };
  const clickDelete = () => {
    setActiveTodo(null);
  };
  const clickCheckbox = () => {
    setActiveTodo(null);
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
            className="w-4 h-4  mr-1 "
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
