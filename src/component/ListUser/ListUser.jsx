import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Pagination } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import "./ListUser.css";

function ListUser() {
  const [params, setParams] = useSearchParams();
  const [list, setList] = useState([]);
  const appendParams = (item, name) => {
    let obj = {};
    params.forEach((value, key) => {
      obj[key] = value;
    });

    obj[item] = name;
    return obj;
  };
  const getData = () => {
    axios
      .get(
        `https://class.nodemy.vn/api/mock/users?page=${params.get(
          "currentPage"
        )}&size=${params.get("currentSize")}`,
        {
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setList(res.data.data);
        setParams(appendParams("total", res.data.total));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, [
    params.get("currentPage"),
    params.get("currentSize"),
    params.get("total"),
  ]);
  return (
    <div className="username-box">
      {list.map((item, index) => {
        return (
          <Link to={`/detail/${item._id}`} key={index}>
            {item.name}
          </Link>
        );
      })}
      <Pagination
        defaultCurrent={1}
        current={Number(params.get("currentPage"))}
        total={params.get("total")}
        onChange={(page, size) => {
          setParams({ currentPage: page, currentSize: size });
        }}
      />
    </div>
  );
}

export default ListUser;
