import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";

import { increment } from "../../counter/counterSlice";

function Header() {
  const token = JSON.parse(localStorage.getItem("token"));
  const nav = useNavigate();

  const count = useSelector((state) => state.counter.value);

  const logoutDispatch = useDispatch();

  const logout = () => {
    logoutDispatch(increment());

    localStorage.removeItem("token");

    nav("/home");
  };

  return (
    <div className="header">
      <div className="nav">
        <Link to="/home">Home</Link>

        <Link to="/todo">TodoList</Link>
        <Link to="/user">UserList</Link>
      </div>

      <div className="login-box">
        {token ? <span>{count.name}</span> : <FaUserAlt></FaUserAlt>}

        {token ? (
          <button onClick={logout}>logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}

/* <div>
  <p>{count}</p>;
  {count === "khach" ? (
    <Link to="/login">Login</Link>
  ) : (
    <button onClick={logout}>logout</button>
  )}
</div>; */

export default Header;
