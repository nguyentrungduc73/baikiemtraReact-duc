import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./login.css";
import {
  decrement,
  increment,
  incrementByAmount,
} from "../../counter/counterSlice";

function Login() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [checkFail, setCheckFail] = useState(undefined);
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://class.nodemy.vn/api/login", {
        email: email,
        password: pass,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", JSON.stringify(res.data.data.token));
        dispatch(incrementByAmount(res.data.data.user));

        nav("/home");
      })
      .catch((error) => {
        console.log(error);
        setCheckFail(true);
      });
  };
  return (
    <>
      <Form className="form-box" onSubmit={handleSubmit}>
        {checkFail && (
          <Form.Group className="mb-3">
            <p>Tài khoản hoặc mật khẩu ko đúng!!</p>
          </Form.Group>
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPass(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default Login;
