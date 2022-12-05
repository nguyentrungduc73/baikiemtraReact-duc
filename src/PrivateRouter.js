import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function PrivateRouter(props) {
  const nav = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        nav("/login");
      }, 2000);
    }
  }, []);

  if (token) {
    return props.children;
  } else {
    return (
      <div>
        <h1>Vui lòng đăng nhập để xem thông tin chi tiết</h1>
      </div>
    );
  }
}

export default PrivateRouter;
