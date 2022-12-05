import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function UserDetail() {
  const { idUser } = useParams();
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  useEffect(() => {
    axios
      .get(`https://class.nodemy.vn/api/mock/users/${idUser}`, {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUser(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);
  return (
    <>
      {error ? (
        <h1>chua co thong tin</h1>
      ) : (
        <div>
          <p>Họ và tên :{user.name}</p>
          <p>Email :{user.email}</p>
          <p>Ngày sinh :{user.dateOfBirth}</p>
          <div>
            <p>Avatar</p>
            <img src={user.avatar} alt="" />
          </div>
        </div>
      )}
    </>
  );
}

export default UserDetail;
