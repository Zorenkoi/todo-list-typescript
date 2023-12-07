import { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "../services/todo";

const Form: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  ////////////////////////////////////////////////

  const [inputValue, setInputValue] = useState("");

  const changeInputValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };
  /////////////////////////////////////////////////////////////////////////////

  const client = useQueryClient();

  const { mutate: addTodoMutate } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["todos"] });
      setInputValue("");
    },
  });
  ////////////////////////////////////////////////////////

  const handleSubmit = () => {
    if (inputValue) {
      addTodoMutate(inputValue);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="mb-3 w-full flex justify-between">
      <input
        value={inputValue}
        onChange={changeInputValue}
        onKeyDown={handleKeyDown}
        type="text"
        className="px-2 w-full rounded-l-md border border-gray-400 focus:outline-none focus:border-gray-700 focus:border-2"
        placeholder="Enter todo here"
        ref={inputRef}
      />
      <button
        onClick={handleSubmit}
        className="form-button h-9 px-3 flex justify-center items-center bg-blue-500 text-white  rounded-r-md"
      >
        Submit
      </button>
    </div>
  );
};

export default Form;
