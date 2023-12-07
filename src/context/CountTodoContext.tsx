import React, { createContext, useContext, useState, ReactNode } from "react";

interface CountTodoContextType {
  countTodo: number;
  setCountTodo: React.Dispatch<React.SetStateAction<number>>;
}

const CountTodoContext = createContext<CountTodoContextType | undefined>(
  undefined
);

interface CountTodoProviderProps {
  children: ReactNode;
}

const CountTodoProvider: React.FC<CountTodoProviderProps> = ({ children }) => {
  const [countTodo, setCountTodo] = useState<number>(0);

  const value: CountTodoContextType = {
    countTodo,
    setCountTodo,
  };

  return (
    <CountTodoContext.Provider value={value}>
      {children}
    </CountTodoContext.Provider>
  );
};

export const useCountTodoContext = (): CountTodoContextType => {
  const context = useContext(CountTodoContext);
  if (!context) {
    throw new Error(
      "useCountTodoContext must be used within a CountTodoProvider"
    );
  }
  return context;
};

export default CountTodoProvider;
