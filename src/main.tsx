import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CountTodoProvider from "./context/CountTodoContext.js";

import App from "./components/App.jsx";
import "./index.css";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <CountTodoProvider>
      <App />
    </CountTodoProvider>
  </QueryClientProvider>
);
