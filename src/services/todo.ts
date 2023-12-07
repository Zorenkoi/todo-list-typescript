import axios, { AxiosResponse } from "axios";
import uniqid from "uniqid";

import { ITodo } from "../types/data";

const apiUrl = "http://localhost:4444/todos";

// Получение всех todos
export const getTodos = async (): Promise<ITodo[]> => {
  try {
    const response: AxiosResponse<ITodo[]> = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// Добавление новой todo
export const addTodo = async (title: string): Promise<ITodo> => {
  try {
    const newTodo: ITodo = {
      id: uniqid(),
      title,
      completed: false,
    };
    const response: AxiosResponse<ITodo> = await axios.post(apiUrl, newTodo);
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

// Изменение todo
export const updateTodo = async ({
  id,
  title,
}: {
  id: string;
  title: string;
}): Promise<ITodo> => {
  try {
    const response: AxiosResponse<ITodo> = await axios.patch(
      `${apiUrl}/${id}`,
      {
        title,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

// Удаление todo
export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

// Переключение статуса выполнения todo
export const toggleTodo = async ({
  id,
  completed,
}: {
  id: string;
  completed: boolean;
}): Promise<ITodo> => {
  try {
    const response: AxiosResponse<ITodo> = await axios.patch(
      `${apiUrl}/${id}`,
      {
        completed,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error toggling todo:", error);
    throw error;
  }
};

export const createTodo = (title: string): ITodo => {
  return {
    title,
    id: uniqid(),
    completed: false,
  };
};
