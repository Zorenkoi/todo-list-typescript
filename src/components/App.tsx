import Form from "./Form.tsx";
import TodoList from "./TodoList.tsx";
import Header from "./Header.tsx";

const App: React.FC = () => {
  return (
    <div className="sm:px-4 px-0 max-w-2xl sm:mt-10 mt-0  mx-auto ">
      <div className="rounded-lg sm:border border-gray-300 overflow-hidden">
        <Header />

        <div className="p-3">
          <Form />

          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default App;
