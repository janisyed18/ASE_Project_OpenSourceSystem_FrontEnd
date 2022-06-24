import React, { useState } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";

function Signup(props) {
  const [login, setLogin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "admin",
  });

  const changeValue = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/open-source-project/user/signup", {
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
        console.log(res, props);
        if (res !== null) {
          props.onSuccessFulLogin();
          // props.history.push('/');
        } else {
          // alert("fails");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="signup">
        <h1>Signup</h1>
      <Form onSubmit={submitLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="First Name"
            onChange={changeValue}
            name="firstName"
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Last Name"
            onChange={changeValue}
            name="lastName"
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Email"
            onChange={changeValue}
            name="email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={changeValue}
            name="password"
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Select
            name="role"
            aria-label="Default select example"
            onChange={changeValue}
          >
            <Form.Label>Select Role</Form.Label>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Signup;
