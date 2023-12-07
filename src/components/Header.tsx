import { useCountTodoContext } from "../context/CountTodoContext";

const Header: React.FC = () => {
  const { countTodo } = useCountTodoContext();

  return (
    <div className="p-3 bg-gray-100 font-bold text-lg text-gray-700">
      Todos({countTodo})
    </div>
  );
};

export default Header;
