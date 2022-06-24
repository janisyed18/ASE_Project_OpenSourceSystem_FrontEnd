import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { setAccessToken, setUserDetails } from "../../utils/authentication";
import { useHistory } from "react-router-dom";

function LoginForm(props) {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const changeValue = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/open-source-project/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    })
      .then((res) => {
        console.log(1, res);
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        if (res !== null) {
          setAccessToken(res.jwtToken);
          setUserDetails(res);
          history.push('/projects');
        } else {
          // alert("fails");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      <Form onSubmit={submitLogin}>
        <Form.Group controlId="formBasicEmail">
          {/* <Form.Label>User Email</Form.Label> */}
          <Form.Control
            type="text"
            placeholder="Enter Email"
            onChange={changeValue}
            name="email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          {/* <Form.Label>Password</Form.Label> */}
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={changeValue}
            name="password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {/* <Signup /> */}
    </div>
  );
}

export default LoginForm;
