import "./App.css";
import Header from "./component/Header/Header";

import TodoInput from "./component/todolist/TodoInput";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet></Outlet>
    </div>
  );
}

export default App;
