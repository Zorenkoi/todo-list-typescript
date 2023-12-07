import Form from "./Form.tsx";
import TodoList from "./TodoList.tsx";
import Header from "./Header.tsx";

const App: React.FC = () => {
  return (
    <div className="max-w-2xl mt-10 px-4 mx-auto">
      <div className="rounded-lg border border-gray-500 overflow-hidden">
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
